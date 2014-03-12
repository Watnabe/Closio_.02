<?php
require_once("../server/config/config.php");

$con=mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
$query = "select * from LinkedIn";	

//get linked in profile info of registered user
$result = mysqli_query($con,$query);
//get list of active users, see if they already have connections, if not add to clients database.  
while($row = mysqli_fetch_array($result))
{
	//print_r(unserialize($row['user']));
	//we serialize the object in linkedin before putting in database so an object is stored as a string in a text column in the db
//now we unserialize it and reference the object. 
	$user_info = unserialize($row['user']);
	
	$firstName = $user_info->firstName;
	$lastName = $user_info->lastName;
	$headline = $user_info->headline;
	$url = $user_info->siteStandardProfileRequest->url;
	

}

//get connections
$query = "select * from LinkedIn";	
$result = mysqli_query($con,$query);
//get list of active users, see if they already have connections, if not add to clients database.
/*
[values] => Array ( [0] => stdClass Object ( [apiStandardProfileRequest] => stdClass Object ( [headers] => stdClass Object ( [_total] => 1 [values] => Array ( [0] => stdClass Object ( [name] => x-li-auth-token [value] => name:rLka ) ) ) [url] => http://api.linkedin.com/v1/people/DoeEcG1X0m ) [firstName] => tammy [headline] => community organizer [id] => DoeEcG1X0m [industry] => Nonprofit Organization Management [lastName] => alpers [location] => stdClass Object ( [country] => stdClass Object ( [code] => us ) [name] => San Francisco Bay Area ) [siteStandardProfileRequest] => stdClass Object ( [url] => http://www.linkedin.com/profile/view?id=182363073&authType=name&authToken=rLka&trk=api*a3524211*s3596611* ) )

*/  
while($row = mysqli_fetch_array($result))
{
	//print_r(unserialize($row['connections']));
	$connections_info = unserialize($row['connections']);
	//print_r($connections_info);
	$data = $connections_info->values;
	//loop through $data or values
	for($i = 0; $i<=count($data); $i++)
	{
		//print_r($data[$i]);
		$firstName = $data[$i]->firstName;
		$lastName = $data[$i]->lastName;
		$headline = $data[$i]->headline;
		$location = $data[$i]->location->name;
		$url = $data[$i]->siteStandardProfileRequest->url;
		$query2 = "INSERT INTO clients ( name,  url, primary_contact_id ) VALUES ( '".mysql_real_escape_string($firstName)."', '".mysql_real_escape_string($url)."', '1', '".mysql_real_escape_string($user_id)."')";
	    mysqli_query($con,$query2);
		//now put in clients database with user_id 
		
		/*
mysql> explain clients;
+--------------------+--------------+------+-----+---------+----------------+
| Field              | Type         | Null | Key | Default | Extra          |
+--------------------+--------------+------+-----+---------+----------------+
| id                 | int(11)      | NO   | PRI | NULL    | auto_increment |
| name               | varchar(400) | NO   |     | NULL    |                |
| email              | varchar(100) | NO   |     | NULL    |                |
| address1           | varchar(100) | NO   |     | NULL    |                |
| address2           | varchar(100) | NO   |     | NULL    |                |
| phone              | varchar(100) | NO   |     | NULL    |                |
| website            | varchar(50)  | NO   |     | NULL    |                |
| primary_contact_id | int(11)      | NO   |     | NULL    |                |
| is_archived        | tinyint(4)   | NO   |     | NULL    |                |
+--------------------+--------------+------+-----+---------+----------------+
9 rows in set (0.12 sec)		
		*/
		
		
	}
	
	$profile = $data[0];
	

}
	
mysqli_close($con);

exit;
 


