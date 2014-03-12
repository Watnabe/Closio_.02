<?php


class DealNotes extends Model
{

    public $deal_id;
    public $notes;


    function __construct($parameters = null)
    {
        $this->table = 'deal_notes';
        $this->set('deal_id', $parameters);

        parent::__construct($parameters);
    }

    function validate()
    {
        $this->validator_tests = array(
            'deal_id' => 'required'
        );

        parent::validate();
    }

    function get($deal_id)
    {
        $deal = new Deal($deal_id);
        //todo:test owner

        $sql = "SELECT * FROM deal_notes WHERE deal_id = $deal_id";
        $notes = parent::get($sql);

        return isset($notes[0]) ? $notes[0] : false;
    }

    function save()
    {
        $this->import_parameters();

        if (!isset($this->notes) || empty($this->notes)) {
            $sql = "DELETE from deal_notes
                    WHERE deal_id = $this->deal_id";
            return parent::execute($sql);
        }
        else {

             return parent::save();

        }
    }

    function current_user_can_access(){
        $user = current_user();

        $deal = new Deal($this->deal_id);

        if($user->role == 'admin' || $user->client_id == $deal->client_id)
            return true;
        else return false;
    }
}