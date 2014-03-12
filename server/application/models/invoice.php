<?php

use phpSweetPDO\SQLHelpers\Basic as Helpers;

Class proposal extends Model
{
    public $client_id; //todo: resolve with client object
    public $deal_id;
    public $number;
    public $date;
    public $tax_rate;
    public $subtotal;
    public $tax;
    public $total;
    public $payments;
    public $balance;
    public $due_date;
    public $date_sent;
    public $num_times_sent;
    public $status_text;
    public $is_overdue;
    public $is_paid;

    //params not saved to the db

    //the company object
    public $company;

    //the client object
    public $client;

    //array of proposalItems
    public $proposal_items;

    function validate(){
        $this->validator_tests = array(
            'client_id' => 'required',
            'deal_id' => 'required',
            'number' => 'required',
            'date' => 'required',
            'due_date' => 'required'
        );

        return parent::validate();
    }

    function get($criteria = null){

        $sql = "SELECT proposals.*, clients.name AS client_name, deals.name AS deal_name
                FROM proposals
                LEFT JOIN clients ON proposals.client_id = clients.id
                LEFT JOIN deals ON proposals.deal_id = deals.id";

        if (is_numeric($criteria)) {
            $sql .= ' WHERE proposals.id = ' . $criteria;

            $proposal = parent::get_one($sql);

            global $CONFIG;
            $proposal['company'] = $CONFIG['company'];


            $proposal['client'] = $this->load('Client')->get($proposal['client_id']);
            $proposal['proposal_items'] = $this->load('proposalItem')->get($proposal['id']); //todo: if i were really using oop I would use proposal->id;

            $this->import_parameters($proposal);
            $this->update_status();
            //$proposal['status'] = $this->status;

            return $proposal;
        } else {
            $sql .= isset($criteria) ? " $criteria" : '';
            $sql = $this->modify_sql_for_user_type($sql);

            $proposals = parent::get($sql);

            //we currently have an array of proposals where each proposal is an array itself. We need to update the status
            //of each proposal, which means creating an proposal object for each proposal array item
            foreach($proposals as &$proposal){
                //create the proposal
                $proposal_object = new proposal($proposal);
//todo: i don't think this makes any sense because the proposal status will already be updated when I create the proposal using new proposal

                //update the proposal status
                $proposal_object->update_status();

                //we need to add the status text back the proposal array, since we're sending the array to the client,
                //not the object
                $proposal['status_text'] = $proposal_object->status_text;
            }

            return $proposals;
        }
    }

    function set_client_id(){
        if (!isset($this->client_id)) {
            $deal = new Deal($this->deal_id);
            $this->set('client_id', $deal->client_id);
        }
    }

    function set_proposal_number(){
        if (!isset($this->number)) {
            $number = null;
            $result = $this->select("SELECT MAX(number)FROM proposals");

            if (is_null($result[0]['MAX(number)']))
                $number = $GLOBALS['CONFIG']['proposal']['base_proposal_number']; //todo:this isn't in the config
            else $number = $result[0]['MAX(number)'] + 1;

            $this->set('number', $number);
        }
    }

    function set_proposal_dates(){
        $hour = 12;
        $today = strtotime($hour . ':00:00');

        if(!isset($this->date))
            $this->set('date', $today);

        if(!isset($this->due_date))
            $this->set('due_date', $today);
    }

    function save($record_activity = true){

        if(!current_user()->is('admin'))
            return false;

        //we need to import the parameter that we're trying to save, in some cases this will be all of the proposal parameters,
        //but in others it will just be the deal id. If it's just the deal id, we will need to set the other
        //required parameters to their defaults
        $this->import_parameters();
        $this->set_client_id();
        $this->set_proposal_number();
        $this->set_proposal_dates();

        $this->validate();
        $item_result = true;

        //if there were no errors saving the base proposal, save each of the line items
        if (!$this->has_errors && is_array($this->proposal_items)) {

            foreach ($this->proposal_items as &$item) {
                //make sure the proposal item is tied to this proposal (just in case the proposal id isn't sent by the client)
                $proposal_item = new proposalItem($item);

                //let's just make sure the proposal item is correct, since we can't trust any of this client side data
                $proposal_item->set('proposal_id', $this->id);


                if (isset($proposal_item->task)) {
                    if(!$proposal_item->task instanceof Task){
                        $proposal_item->task = new Task($proposal_item->task);
                    }
                    //todo:does this still work?
                    $proposal_item->task->set('proposal_id', $this->id);
                    $proposal_item->task->save();
                }

                $item_result = $proposal_item->save();

                //calculate total is going to need the object
                $item = $proposal_item;
                //stop saving line items if there was an error saving this one
                if ($proposal_item->has_errors)
                    break;
            }
        }

        //let's store is_new status in a variable because it will change once we call save
        $is_new = $this->is_new();

        //there is no reason to calculate the total if this is a new proposal because there won't be any proposal items
        //yet
        if(!$is_new){
            $this->calculate_total();
        }

        $this->update_status(false);

        $result = parent::save();

        if($record_activity){
            if ($is_new){
                ActivityManager::proposal_created($this);
            }
            else ActivityManager::proposal_updated($this);


        }

        //return the result, true or false
        return $is_new ? $result : ($item_result != false);
    }

    function send(){
        $email = new AppEmail();


        if($email->send_proposal($this->client_id, $this)){
            //update the proposal with the most recent send date
            $this->clear_params(); //todo:I have no idea why the params array is even populated at this point, but
            $this->set('date_sent', time());
            $this->set('num_times_sent', intval($this->num_times_sent) + 1);
            $this->params_imported = true; //todo: i need to do something about this.
            parent::save();
            return true;
        }
        else return false;
    }

    function has_balance(){
        return $this->balance > 0;
    }

    function valid_payment_amount($amount){
        $old_balance = $this->balance;
        //recalculate the proposal total, which will update the balance
        $this->calculate_total();

        //using parent::save, because there is no need for us to save the proposal items in this case
        if($old_balance != $this->balance){
            parent::save();
        }

        if($this->has_balance() && (float)$this->balance >= (float)$amount)
            return true;
        else return false;
    }

    function calculate_total($save_proposal = false){
        $subtotal = 0;
        $tax = 0;
        $total = 0;
        $payments = 0;
        $balance = 0;

        if(is_array($this->proposal_items)){
            //calculate the subtotal
            foreach ($this->proposal_items as $item) {
                $subtotal += $item->quantity * $item->rate;
            }
        }


        //set the tax rate, calculate tax and total
        $tax_rate = isset($this->tax_rate) ? $this->tax_rate : $this->set('tax_rate', get_config('proposal.tax_rate'));
        $tax = $subtotal * $tax_rate;
        $total = round($subtotal + $tax, 2);

        //calculate the total value of all payments made on this proposal
        $payment_transactions = $this->get_payments();
        foreach($payment_transactions as $payment){
            $payments += $payment->amount;
        }

        //calculate balance
        $balance = $total - $payments;

        //set all total related values
        $this->set('subtotal', $subtotal);
        $this->set('tax', $tax);
        $this->set('total', $total);
        $this->set('payments', $payments);
        $this->set('balance', $balance);

        if($save_proposal)
            parent::save();
    }

    function pdf()
    {
        $this->load_library('fpdf/fpdf');
        $pdf = new proposalPDF;

        $pdf->SetproposalData(Utils::decode($_POST));

        $filename = ROOT . "/tmp/" . $_POST['number'] . ".pdf";
        $pdf->Output($filename);

        return $_POST['number'] . ".pdf";
    }

    function download($file_path)
    {
        $file_path = 'tmp/' . $file_path;

        if (!file_exists($file_path))
            return false;

        //todo:if headers are the same for downloading other files, they should be stored in one place App:download_headers(); or better yet File::init_download($file_path) and it handles the whole thing
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
        unlink($file_path);
        exit;
    }

    function update_status($save_status = true){

        //store the current proposal status as it exists in the database
        $old_status = $this->status_text;

        if($this->total <= 0){
            $this->set('status_text', Language::get('proposal.status_inactive'));
            $this->set('is_overdue', false);
            $this->set('is_paid', false);
        }
        else{
            if($this->balance <= 0)
            {
                $this->set('status_text', Language::get('proposal.status_paid'));
                $this->set('is_overdue', false);
                $this->set('is_paid', true);
            } //todo:language file
            else if ($this->due_date < time())
            {
                $this->set('status_text', Language::get('proposal.status_overdue'));
                $this->set('is_overdue', true);
                $this->set('is_paid', false);
            } //todo:language file
            else {
                $this->set('status_text', Language::get('proposal.status_pending'));
                $this->set('is_overdue', false);
                $this->set('is_paid', false);
            }
        }

        //if the old status and the new status do not match, then we need to save this proposal back to the database.
        if(($save_status == true) && ($old_status != (string)$this->status_text)){
           parent::save();
        }
    }

    function get_payments(){
        $payment_class = new Payment();
        $payments = $payment_class->get("WHERE proposal_id = $this->id");

        return is_array($payments) ? $payments : array();
    }


    function delete(){
        $result = parent::delete();

        ActivityManager::proposal_deleted($this);

        return $result;
    }

    function current_user_can_access(){
        //todo:permission needs to be more fine grained. Clients can view but not create, edit, or delete proposals
        $user = current_user();

        if($user->role == 'admin' || $user->client_id == $this->client_id)
            return true;
        else return false;
    }

    function force_delete($proposal_number){
        $sql = "SELECT id FROM proposals WHERE number = '$proposal_number'";
        $id = $this->select($sql);
        if(isset($id[0]))
            $id = $id[0]['id'];
        else $id = false;

        if($id){
            $this->set('id', $id);
            $this->delete();
        }

        return true;
    }
}
 
