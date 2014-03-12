<?php

class DealDetails extends Model{
    public $activity;
    public $deal;
    public $task_counts;


    function get($deal_id){
        $activity = new Activity();
        $activity = $activity->get('WHERE deal_id = ' . $deal_id);

        $this->deal = new Deal($deal_id);;

        $task_counts = $this->deal->get_task_counts();


        $this->deal->update_status($task_counts);

        $deal_details = array(
            'deal' => $this->deal->to_array(),
            'activity' => $activity,
            'task_counts' => $task_counts
        );

        return $deal_details;
    }

    //deal details is a collection of other models. There is nothing to save, so let's prevent the base model save
    //from being called accidentally
    function save(){}

    function current_user_can_access(){
        $user = current_user();

        //this->deal is now an array, because of the call to to_array in the get function
        if($user->role == 'admin' || $user->client_id == $this->deal['client_id'])
            return true;
        else return false;
    }
}