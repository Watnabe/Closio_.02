<?php


class Calendar extends Model{
    public $tasks;
    public $deal_id;
    public $deal;


    function get($deal_id){
        $this->deal = new Deal($deal_id);

        //todo:this should not get section headers
        $this->tasks = $this->deal->get_tasks('incomplete');
    }

    function current_user_can_access(){
        $user = current_user();

        //this->deal is now an array, because of the call to to_array in the get function
        if($user->role == 'admin' || $user->client_id == $this->deal->client_id)
            return true;
        else return false;
    }
}
 
