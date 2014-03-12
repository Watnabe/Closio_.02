<?php

class Dashboard extends Model
{
    protected $deals;
    protected $activity;

    function get(){
        $user = current_user();
        $deals = new Deal();
        $activity = new Activity();

        $this->deals = $deals->get();
        $this->activity = $activity->get();
    }

    function current_user_can_access(){
        return true;
    }
}