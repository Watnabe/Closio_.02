<?php

class GlobalSearch extends Model{

    public $query;
    public $deals;
    public $tasks;
    public $proposals;
    public $files;
    public $clients;
    public $messages;

    function do_search($query){

       $this->query = $query;

        $this->get_deals();
        $this->get_tasks();
        $this->get_proposals();
        $this->get_files();
        $this->get_clients();
        $this->get_messages();

       return $this->to_array();
    }

    function modify_sql_for_user_type($sql, $type){
        $current_user = current_user();

         if(!$current_user->is('admin')){
             $sql .= " AND $type.client_id = $current_user->client_id";
         }

        return $sql;
    }

    function get_deals(){
        $sql = "SELECT deals.id, deals.name, deals.status_text, deals.due_date, clients.name AS client_name
                FROM deals
                LEFT JOIN clients
                  ON clients.id = deals.client_id
                WHERE
                  (
                      deals.name LIKE '%$this->query%'
                      OR clients.name LIKE '%$this->query%'
                  )";


        $sql = $this->modify_sql_for_user_type($sql, 'deals');
        $this->deals = parent::get($sql);
    }

    function get_tasks(){
        $sql = "SELECT tasks.id, tasks.task, tasks.notes, tasks.deal_id, tasks.due_date, deals.name AS deal_name
                FROM tasks
                LEFT JOIN deals
                  ON deals.id = tasks.deal_id
                WHERE
                  (
                  tasks.task LIKE '%$this->query%'
                  OR tasks.notes LIKE '%$this->query%'
                  )";

        $sql = $this->modify_sql_for_user_type($sql, 'tasks');
        $this->tasks = parent::get($sql);
    }

    function get_proposals(){
        $sql = "SELECT proposals.*, clients.name AS client_name, deals.name AS deal_name
                FROM proposals
                LEFT JOIN clients
                  ON clients.id = proposals.client_id
                LEFT JOIN deals
                  ON deals.id = proposals.deal_id
                WHERE
                  (
                  clients.name LIKE '%$this->query%'
                  OR deals.name LIKE '%$this->query%'
                  )";

        $sql = $this->modify_sql_for_user_type($sql, 'proposals');
        $this->proposals = parent::get($sql);
    }

    function get_files(){
        $sql = "SELECT files.id, files.name, files.deal_id,  files.type AS file_type, deals.name AS deal_name
                FROM files
                LEFT JOIN deals
                  ON deals.id = files.deal_id
                WHERE
                  (
                  files.name LIKE '%$this->query%'
                  OR files.type LIKE '%$this->query%'
                  )";

        $sql = $this->modify_sql_for_user_type($sql, 'files');
        $this->files = parent::get($sql);
    }

    function get_clients(){}

    function get_messages(){
        $sql = "SELECT messages.*
                FROM messages
                WHERE
                  messages.message LIKE '%$this->query%'";

        $sql = $this->modify_sql_for_user_type($sql, 'messages');
        $this->messages = parent::get($sql);
    }
}