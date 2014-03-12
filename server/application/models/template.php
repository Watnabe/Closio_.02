<?php


class Template extends Deal{

    public $deal;

    function __construct($parameters = null){
        $this->table = 'deals';

        parent::__construct($parameters);
    }

    function get($criteria = null){
        $sql = "SELECT deals.*, clients.name AS client_name
                FROM deals
                LEFT JOIN clients ON deals.client_id = clients.id";

        if (is_numeric($criteria)) {
            $sql .= ' WHERE deals.id = ' . $criteria;
            $deal = parent::get_one($sql);
            $this->import_parameters($deal);


            return $deal;
        } else {

            $sql = $this->add_criteria($sql, 'is_template = 1');
            //if the user isn't an admin, we'll need to filter for deals that this user has access to.
            $sql = $this->modify_sql_for_user_type($sql);

            $deals = Model::get($sql);

            return $deals;
            //return parent::get($sql);
        }
    }

    function save(){
        $this->unset_param('deal');
        $this->set('is_template', true);
        return parent::save();
    }


    function create_deal(){

        $this->import_parameters();

        $this->generate_deal();

        $this->copy_tasks();

        $this->copy_files();

        $this->copy_notes();

        return $this->deal->id;
    }

    function generate_deal(){
        $deal = new Deal();


        //if we don't manually set this variable, the parameters from the $_POST array will be imported. We don't want
        //those parameters because then we would also be importing the Template id, which would effectively set this
        //new deal model = this template model. We will manually set the parameters from the template that we want to
        //copy
        $deal->params_imported = true;

        $deal->set('client_id', Request::param('client_id'));
        $deal->set('name', Request::param('name'));
        $deal->set('start_date', Request::param('start_date'));
        $deal->set('due_date', Request::param('due_date'));

        $deal->save();

        $this->deal = $deal;
    }

    function copy_tasks(){
        $tasks = $this->get_tasks();

        foreach($tasks as $task_parameters){
            $task = new Task();

            $task->import_parameters_exactly($task_parameters);

            //we want to create a new task so we need to reset the id. If we don't the app will just save our changes on
            //the old task (bad idea)
            $task->set('id', null);

            $task->set('created_date', time());
            $task->set('deal_id', $this->deal->id);

            $task->quick_save();
        }
    }

    function copy_files(){
        $files = $this->get_files();
        $paths = $this->deal->file_paths();

        foreach($files as $file_parameters){
            $file_to_copy = new File($file_parameters);
            $file_to_copy_url = $file_to_copy->path();

            //create the file record
            $file = new File();
            $file->import_parameters_exactly($file_parameters);

            //we want to create a new file  so we need to reset the id. If we don't the app will just save our changes on
            //the old file (bad idea)
            $file->set('id', null);
            $file->set('created_date', time());
            $file->set('deal_id', $this->deal->id);

            $file->save();

            //copy the actual file
            if(file_exists($file_to_copy_url)){
                copy($file_to_copy_url, $paths['upload_path'] . $file->name);
            }
        }
    }

    function copy_notes(){
        $notes_to_copy = new DealNotes($this->id);
        $notes = new DealNotes();

        $notes->params_imported = true;
        $notes->set('notes', $notes_to_copy->notes);
        $notes->set('deal_id', $this->deal->id);
        $notes->save();
    }

}
