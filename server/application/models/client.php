<?php

use phpSweetPDO\SQLHelpers\Basic as Helpers;

Class Client extends Model
{
    public $name;
    public $email;
    public $address1;
    public $address2;
    public $phone;
    public $website;
    public $primary_contact_id;
	public $creator_id;

    //not saved to the db
    public $primary_contact_name;
    public $primary_contact_image;

    
    function validate(){
        $this->validator_tests = array(
            'name' => 'required'
        );

        return parent::validate();
    }

    function save(){
		
        $this->import_parameters();

        //we need to determine if this is a new client before we do the initial save (it won't be new once we do the
        //initial save
        $is_new = $this->is_new();

        //unset params that aren't saved to the db
        $this->unset_param('primary_contact_name');
        $this->unset_param('primary_contact_image');

        $result = parent::save();

        if($is_new == true){

            $primary_contact = new User($_POST['client']);
			
            $primary_contact->set('client_id', $this->id);
			
            //$primary_contact->validate();
			$user = current_user();
			
            $this->set('email', $primary_contact->email);
            $this->set('primary_contact_id', $primary_contact->id);
			$this->set('creator_id', $user->id);
            parent::save();
			
			
            /*  removed access control is on client side
            if($primary_contact->validation_passed()){
                $primary_contact->save();

                //set the client email and the primary contact id
                $this->set('email', $primary_contact->email);
                $this->set('primary_contact_id', $primary_contact->id);
                parent::save();
            }
            else {
                $this->set_error('first_name', Language::get('errors.saving_primary_contact'));
                return false;
            }
			*/

        }

        return $result;
    }
	
    //get appears to retrive a single item from the database in detail view. 
    function get($criteria = null){
		//$criteria is the id of the model table 
		
		
		if (is_numeric($criteria)) {
			$user = current_user();
			$user_id = $user->id;
			$user_role = $user->role;
			
			//debugging code
			//$con=mysqli_connect('localhost','root','root','closioSPA');
			//$query = "INSERT INTO debugger (message) VALUES ( '".mysql_real_escape_string($criteria.$user_id.$user_role)."' )";
			//mysqli_query($con,$query);
			
		    if($user_role == 'user'){
				
				
				
		    	$sql = "SELECT clients.*, CONCAT(users.first_name, ' ', users.last_name) AS primary_contact_name
                    FROM clients
                    LEFT JOIN users on clients.primary_contact_id = users.id
                    WHERE clients.id = $criteria AND clients.creator_id = $user_id";
				
		    } else if ($user_role == 'admin') {
				//implementation incomplete: todo add filter for all admins users client contacts as well. 
			    
				//debugging code
				
				$sql = "SELECT clients.*, CONCAT(users.first_name, ' ', users.last_name) AS primary_contact_name
	                    FROM clients
	                    LEFT JOIN users on clients.primary_contact_id = users.id
	                    WHERE clients.id = $criteria";
						
			} else {
				
				//debugging code
				
				
			    $sql = "SELECT clients.*, CONCAT(users.first_name, ' ', users.last_name) AS primary_contact_name
	                    FROM clients
	                    LEFT JOIN users on clients.primary_contact_id = users.id
	                    WHERE clients.id = $criteria";
			}
		
		   

            $client = parent::get_one($sql);
            $client['primary_contact_image'] = User::get_profile_image($client['primary_contact_id'], true);

            return $client;
        }
        else {
            if(current_user()->is('client'))
                return false;

            //if we're not getting a specific file, the base get function is fine
            return parent::get($criteria);
        }
    }


    function get_users(){
    //todo:lockdown
	
	
        $sql = "SELECT users.id, users.email, CONCAT(users.first_name, ' ', users.last_name) AS name, role_user.role_id, roles.name AS role
                FROM users
                LEFT JOIN role_user
                  ON role_user.user_id = users.id
                LEFT JOIN roles
                  ON role_user.role_id = roles.id
                WHERE client_id = $this->id";

        return parent::get($sql);
    }

    function get_deals(){
        $sql = "SELECT deals.id, deals.name, deals.due_date, deals.status_text
                FROM deals
                WHERE deals.client_id = $this->id";

        return parent::get($sql);
    }

    function get_proposals(){
        $deal_query = "SELECT deals.id
                          FROM deals
                          WHERE client_id = $this->id";

        $sql = "SELECT proposals.*, deals.name AS deal_name
                          FROM proposals
                          LEFT JOIN deals ON proposals.deal_id = deals.id
                          WHERE proposals.deal_id IN($deal_query)";


        return parent::get($sql);
    }

    function current_user_can_access(){
        $user = current_user();
         
        //only admins or the the client that this model represents can access this model
        if($user->role == 'admin' || $user->role == 'user' || $user->role == 'superadmin' || $user->client_id == $this->id)
            return true;
        else return false;
    }

    function delete_deals(){
        $deals = $this->get_deals();

        foreach($deals as $deal){
            $this_deal = new Deal($deal['id']);
            $this_deal->delete();
        }
    }

    function delete_users(){
        $users = $this->get_users();

        foreach($users as $user){
            $this_user = new User($user['id']);
            $this_user->delete();
        }
    }

    function delete(){
        $result = parent::delete();

        $this->delete_deals();

        $this->delete_users();

        ActivityManager::client_deleted($this);

        return $result;
    }
	
    function addClientUser(){
		
		$poster = Utils::decode($_POST);
		// $data = $this->utf8($data);
		$poster = $this->utf8($poster);
		 //$poster = print_r($_POST);
		$con=mysqli_connect('localhost','root','root','closioSPA');
		$query = "INSERT INTO debugger (message) VALUES ( '$poster' )";
		//$sql = "SELECT id FROM proposals WHERE number = '$proposal_number'";
		mysqli_query($con,$query);
		
		//$params['client_id'] = $client_id;
		
		//update($params, $table = null, $criteria = null)
		
		
		
		
    }
	
}
 
