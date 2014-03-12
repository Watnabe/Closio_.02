<?php



Class Relayer 
{
    
    
	
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
 
