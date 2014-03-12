<?php

class ActivityManager{

    static function client_deleted($client){
        new Activity($client, Language::get('activity.deleted'), $client->name);
    }

    static function file_created($file){
        new Activity($file, Language::get('activity.uploaded'), $file->name);
    }
    static function file_deleted($file){
        new Activity($file, Language::get('activity.deleted'), $file->name);
    }

    static function proposal_created($proposal){
        //todo:some saves shouldn't generate an activity item
        new Activity($proposal, Language::get('activity.created'), '#' . $proposal->number);
    }
    static function proposal_updated($proposal){
        //todo:some saves shouldn't generate an activity item
        new Activity($proposal, Language::get('activity.updated'), '#' . $proposal->number);
    }
    static function proposal_deleted($proposal){
        new Activity($proposal, Language::get('activity.deleted'), $proposal->number);
    }

    static function message_activity_title($object){
        //get the activity title
        switch (get_class($object)) {
            case 'File':
                $title_field = 'name';
                break;
            case 'proposal':
                $title_field = 'number';
                break;
            case 'Deal':
                $title_field = 'name';
                break;
            case 'Task':
                $title_field = 'task';
                break;
            default:
                $title_field = '';
                break;
        }

        return isset($object->$title_field) ? $object->$title_field : '';
    }
    static function message_created($message){
        $activity = new Activity();
        $activity->set_object($message);
        $activity->set('object_title', $message->message);
        $activity->set('action_taken', Language::get('activity.posted'));

        $message->linked_object = new $message->reference_object($message->reference_id);
        $activity->set_linked_object($message->linked_object);

        $message->linked_object_title = ActivityManager::message_activity_title($message->linked_object);
        $activity->set('linked_object_title', $message->linked_object_title);

        $activity->save();
    }

    //todo:payment method (and possibly proposal) should be parameters on the payment object and this function, should just accept the payment object and possibly user_id
    static function payment_created($payment, $proposal, $payment_method, $user_id){
        $title = Language::get('activity.payment_created', array(
            'proposal_number' => $proposal->number,
            'currency_symbol' => get_config('currency_symbol'),
            'paymentAmount' => $payment->amount
        ));

        $activity = new Activity();
        $activity->set_object($payment);
        $activity->set('action_taken', Language::get('activity.completed'));
        $activity->set('object_title', $title);
        $activity->set('deal_id', $proposal->deal_id);
        $activity->set('client_id', $proposal->client_id);

        if ($payment_method == 'paypal') {
            $activity->is_user_generated = false;
            $activity->set('user_id', $user_id);
        }

        $activity->save();
    }

    static function deal_due_date_updated($deal){
        $change = $deal->evaluate_date_difference($deal->previous_params['due_date'], $deal->due_date);

        $data = array_merge(array('deal_name' => $deal->name), $change);
        $title = Language::get('activity.due_date_updated_details', $data);
        $action = Language::get('activity.updated');

        new Activity($deal, $action, $title);
    }
    static function deal_status_changed($deal){
        //todo: create a function on activity model to handle system generated messages. Otherwise this code will just be repeated
        $activity = new Activity();
        $activity->set_object($deal);
        $activity->is_user_generated = false;
        $activity->set_action(Language::get('activity.status_change'));

        $title_data = array(
            'deal_name' => $deal->name,
            'deal_status' => $deal->get_status()
        );

        $activity->set_title(Language::get('activity.status_change_details', $title_data));
        $activity->save();
    }
    static function deal_created(){}
    static function deal_deleted($deal){
        new Activity($deal, Language::get('activity.deleted'), $deal->name);
    }

    static function task_created($task){
        new Activity($task, Language::get('activity.created'), $task->task);
    }
    static function task_deleted($task){
        new Activity($task, Language::get('activity.deleted'), $task->task);
    }
    static function task_completed($task){
        new Activity($task, Language::Get('activity.completed'), $task->task);
    }
    static function task_reassigned($task, $assigned_to_user){
        $title = Language::get('activity.assignment_details', array(
            'assigned_to_first_name' => $assigned_to_user->first_name,
            'assigned_to_last_name' => $assigned_to_user->last_name
        ));

        new Activity($task, Language::get('activity.reassigned'), $title);
    }
}
 
