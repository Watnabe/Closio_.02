<?php

require_once("server/config/config.php");

$con=mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

// Change these
define('API_KEY',      '75v4csxv5hap7d'                                          );
define('API_SECRET',   'OvswF8DNRzyv4bax'                                       );
define('REDIRECT_URI', 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['SCRIPT_NAME']);
define('SCOPE',        'r_fullprofile r_emailaddress r_contactinfo r_network'                        );
 

session_name('linkedin');
session_start();
 
// OAuth 2 Control Flow
if (isset($_GET['error'])) {
    // LinkedIn returned an error
    print $_GET['error'] . ': ' . $_GET['error_description'];
    exit;
} elseif (isset($_GET['code'])) {
	//echo "code set <br />";
	getAccessToken(); //added by mike
	//print_r($_GET['code']);
    // User authorized your application
	//print_r($_GET['state']); //52be5f43087624.75035029
	//print_r($_SESSION['state']);
    /*
	if ($_SESSION['state'] == $_GET['state']) {
        // Get token so you can make API calls
        getAccessToken();
    } else {
        // CSRF attack? Or did you mix up your states?
        exit;
    }
	*/
} else { 
    if ((empty($_SESSION['expires_at'])) || (time() > $_SESSION['expires_at'])) {
        // Token has expired, clear the state
        $_SESSION = array();
    }
    if (empty($_SESSION['access_token'])) {
        // Start authorization process
        getAuthorizationCode();
    }
}
 
// Congratulations! You have a valid token. Now fetch your profile 
$li_user = fetch('GET', '/v1/people/~');
$connections = fetch('GET', '/v1/people/~/connections');
$email = fetch('GET', '/v1/people/~:(email-address)');
$names = fetch('GET', '/v1/people/~:(first-name,last-name)');

$first_name = $names->firstName;
$last_name = $names->lastName;

$user_email = $email->emailAddress;

$salt = salt();

if(username_available($user_email)){
	//first_name, last_name, client_id=1
	
	$query2 = "INSERT INTO users ( first_name, last_name, client_id, email, password, salt ) VALUES ( '".mysql_real_escape_string($first_name)."', '".mysql_real_escape_string($last_name)."', '1', '".mysql_real_escape_string($user_email)."', '".hash_password('_l1nk3d!n!', $salt)."', '".$salt."' )";
	
	mysqli_query($con,$query2);

    $query3 = "select id from users where email = '".$user_email."'";
	
    $email_result = mysqli_query($con,$query3);

    while($row = mysqli_fetch_array($email_result))
    {
      //echo $row['id'];
      $user_id = $row['id'];

    }

    register($user_id, '3', '');
	$query = "INSERT INTO LinkedIn (user, email, connections, user_id) VALUES ('".mysql_real_escape_string(serialize($li_user))."', '".mysql_real_escape_string(serialize($user_email))."', '".mysql_real_escape_string(serialize($connections))."', '".mysql_real_escape_string($user_id)."')";
	//echo $query;
	mysqli_query($con,$query);
}


mysqli_close($con);

$expire=time()+60*60*24*30;
setcookie("linkedin", serialize($li_user) , $expire);

header("Location: ./#linkedin/".$user_email);
//header("Location: index.php?url=#linkedin");


exit;
 
function getAuthorizationCode() {
	
    $params = array('response_type' => 'code',
                    'client_id' => API_KEY,
                    'scope' => SCOPE,
                    'state' => uniqid('', true), // unique long string
                    'redirect_uri' => REDIRECT_URI,
              );
 
    // Authentication request
    $url = 'https://www.linkedin.com/uas/oauth2/authorization?' . http_build_query($params);
     
    // Needed to identify request when it returns to us
    $_SESSION['state'] = $params['state'];
 
    // Redirect user to authenticate
    header("Location: $url");
    exit;
}
     
function getAccessToken() {
	//echo "getAccessToken";
    $params = array('grant_type' => 'authorization_code',
                    'client_id' => API_KEY,
                    'client_secret' => API_SECRET,
                    'code' => $_GET['code'],
                    'redirect_uri' => REDIRECT_URI,
              );
     
    // Access Token request
    $url = 'https://www.linkedin.com/uas/oauth2/accessToken?' . http_build_query($params);
     
    // Tell streams to make a POST request
    $context = stream_context_create(
                    array('http' => 
                        array('method' => 'POST',
                        )
                    )
                );
 
    // Retrieve access token information
    $response = file_get_contents($url, false, $context);
 
    // Native PHP object, please
    $token = json_decode($response);
 
    // Store access token and expiration time
    $_SESSION['access_token'] = $token->access_token; // guard this! 
    $_SESSION['expires_in']   = $token->expires_in; // relative time (in seconds)
    $_SESSION['expires_at']   = time() + $_SESSION['expires_in']; // absolute time
     
    return true;
}
 
function fetch($method, $resource, $body = '') {
    $params = array('oauth2_access_token' => $_SESSION['access_token'],
                    'format' => 'json',
              );
     
    // Need to use HTTPS
    $url = 'https://api.linkedin.com' . $resource . '?' . http_build_query($params);
    // Tell streams to make a (GET, POST, PUT, or DELETE) request
    $context = stream_context_create(
                    array('http' => 
                        array('method' => $method,
                        )
                    )
                );
 
 
    // Hocus Pocus
    $response = file_get_contents($url, false, $context);
 
    // Native PHP object, please
    return json_decode($response);
}






//from auth class here and below

//returns true if there is NOT a email address in the db that is being queried
//returns false if there already exists a email for the query, username = email addie
function username_available($username)
{
    //$result = $this->db->execute("SELECT id from users WHERE email = '$username'");
    $con=mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
	//$result = mysqli_query($con,$query3);
	$query = "SELECT id from users WHERE email = '$username'";
	
	//$result = mysqli_query($con,$query);
	$result = mysqli_query($con,$query);

	while($row = mysqli_fetch_array($result))
	  {
	  //echo $row['id'];
	  $user_id = $row['id'];
      return false;
	  }
	
        return true;
	/*
	if (!empty($result)) {
        return false;
    } else
        return true;
	*/
}

function hash_password($password = false, $salt = false)
{
    if ($password === false) {
        return false;
    }

    $pepper = '';
    $password = hash('sha256', $password . $salt . $pepper);

    return $password;
}

function salt()
{
    //todo:i need to stop saving the salt, use bcrypt?
    return hash('sha256', uniqid(mt_rand(), true));
}




function register($user_id, $role_id, $password = null)
{
	$con=mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    $registration = array();

    $salt = salt();

    if (!isset($password)) {
        $registration['temporary_password'] = temp_password();
        $password = $registration['temporary_password'];
    }

    $password = hash_password($password, $salt);
    create_user_role($user_id, '3');  //user_role 3 is 'user'

    if ($result != 0)
        $registration['result'] = true;
    else $registration['result'] = false;

    return $registration;
}

function create_user_role($user_id, $role_id){
	$con=mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    $created = time();
	$query = "INSERT INTO role_user (user_id, role_id, created) VALUES ('".mysql_real_escape_string($user_id)."', '".mysql_real_escape_string($role_id)."', '".$created."')";
	$result = mysqli_query($con,$query);
	
    return $result;
}

function temp_password(){
    return substr(uniqid(), -6, 6);
}

