<?php

Class File extends Model
{
    public $name;
    public $deal_id;
    public $client_id;
    public $entity_type;
    public $entity_id;
    public $uploader_id;
    public $size;
    public $notes;
    public $created;

    //not saved to db
    public $uploaded_by;


    function validate(){
        $this->validator_tests = array(
            'name' => 'required'
        );

        return parent::validate();
    }

    static function generate_base_sql_for_get(){
        return "SELECT files.*, CONCAT(users.first_name, ' ', users.last_name) AS uploaded_by, deals.name AS deal
                FROM files
                LEFT JOIN users
                ON files.uploader_id = users.id
                LEFT JOIN deals
                ON files.deal_id = deals.id";
    }

    function get($criteria = null){
        if (is_numeric($criteria)) {
            $sql = $this->generate_base_sql_for_get() . " WHERE files.id = $criteria";

            return parent::get_one($sql);
        }
        else {
            //if we're not getting a specific file, the base get function is fine
            return parent::get($this->modify_sql_for_user_type(''));
        }
    }

    static function upload_notification($deal, $files){
        $email = new AppEmail();
        $email->send_file_upload_notification($deal, $files);
    }

    function save(){
        $this->unset_param('uploaded_by');
        return parent::save();
    }

    function allow_client_uploads(){
        return get_config('uploads.allow_client_uploads') == true;
    }

    function upload()
    {
        $this->set_upload_headers();

        if(!isset($_POST['object']) || !isset($_POST['id']) )
            return false;

        //the file might be uploaded to an object that isn't a deal (i.e. a task), so we need to figure out the deal id
        $context = Deal::context($_POST['object'], $_POST['id']);

        if(!isset($context['deal_id']))
            return false;

        $deal_id = $context['deal_id'];


        $deal = new Deal($deal_id);

        if(!current_user()->can_access($deal))
            return false;

        if(!current_user()->is('admin') && !$this->allow_client_uploads())
            return false;


        //we need to set the deal id, before we generate the upload paths
        $this->set('deal_id', $deal_id);
        $this->set('client_id', $deal->client_id);

        //perform the upload
        $upload_options = $deal->file_paths();
        $upload = new Upload(array(
            'upload_dir' => $upload_options['upload_path'],
            'upload_url' => $upload_options['web_path']
        ));
        $status = $upload->post();
        $status = $status[0];

        if ($status->size > 0) {
            $name = $status->name;


            $this->set('entity_type', $context['entity_type']);
            $this->set('entity_id', $context['entity_id']);
            $this->set('uploader_id', current_user()->id);
            $this->set('name', $name);
            $this->set('size', $status->size);
            $this->set('created', time());

            //prevent the save function from calling import_parameters. This would cause the object id that is sent
            //as a post parameter to be imported as the id of this file, and then the model would try to do an update.
            //this is not the desired behavior. This is a new file and does not have an id yet...
            $this->params_imported = true;
            $this->save();

            ActivityManager::file_created($this);


            return true;
        } else {
            if(isset($status->error))
                $this->set_error('file', $status->error);

            return false;
        }
    }

    static function set_upload_headers()
    {
        error_reporting(E_ALL | E_STRICT);
        header('Pragma: no-cache');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Content-Disposition: inline; filename="files.json"');
        header('X-Content-Type-Options: nosniff');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: OPTIONS, HEAD, GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: X-File-Name, X-File-Type, X-File-Size');
    }

    function is_download($do_download = null){
        return isset($do_download) && $do_download == 'do';
    }

    static function do_download($file_path){
        //turn off error reporting to prevent the document from being corrupted
        error_reporting(0);
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . basename($file_path));
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));
        ob_clean();
        flush();
        readfile($file_path);
        exit;
    }

    function download($do_download = null)
    {
        $deal = new Deal($this->deal_id);

        if($deal->is_valid())
        {
            $paths = $deal->file_paths();
        }


        if (isset($paths) && file_exists($paths['upload_path'] . $this->name)) {

            if (!$this->is_download($do_download)) {
                return $paths['web_path'] . $this->name;
            } else {
                $this->do_download($paths['upload_path'] . $this->name);
                return true;
            }
        } else return false; //return false;
    }

    function path($deal = null){
        if(!isset($deal))
            $deal = new Deal($this->deal_id);

        if ($deal->is_valid()) {
            $paths = $deal->file_paths();
        }

        if (isset($paths) && file_exists($paths['upload_path'] . $this->name)) {
            return $paths['upload_path'] . $this->name;
        }
        else return false;
    }

    function delete(){
        $result = parent::delete();

        //delete the file from the server
        $deal = new Deal($this->deal_id);

        if($deal->is_valid()){
            $paths = $deal->file_paths();

            if (isset($paths) && file_exists($paths['upload_path'] . $this->name)) {
                $file = $paths['upload_path'] . $this->name;
                unlink($file);
            }
        }

        ActivityManager::file_deleted($this);

        return $result;
    }

    function current_user_can_access(){
        $user = current_user();

        if($user->role == 'admin' || $user->client_id == $this->client_id)
            return true;
        else return false;
    }
}