<?php

use Firebase\JWT\JWT;

/**
 * This Controller oversees the process which allows for the login process to occur, should the entered details be correct - the User's ID and admin status are stored in a web token.
 * Also included in this token is an expiration date for the token.
 * 
 * @author Ethan Borrill W18001798
 */
class ControllerAuthenticateApi extends Controller
{

    protected function setGateway() {
        $this->gateway = new GatewayPlayer();
    }


    /**
     * Process request below will collect the parameters 'email' and 'password' and determines whether the password entered matches the email address provided.
     * If it does match, the password is then hashed/encrypted using the secret key in Config.php. A web token is then produced with the corresponding user_id, user_isAdmin and an expiration date for the token.
     * This is then encoded using the JWT class from firebase to encode the token for use of the webpage.
     * 
     * If the password does not match the connected email address, a 401 (Unauthorised) is returned, 404 (Resource Not Found), or in the case a GET method is used a 405 will display.
     * 
     * @return mixed $data - The data produced by the controller.
     */
    protected function processRequest() {
        $data = [];

        //Sets the parameters used
        $email = $this->getRequest()->getParameter("user_email");
        $password = $this->getRequest()->getParameter("user_password");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($email) && !is_null($password)) { //If values are entered for both email and password, the password is entered is checked to if it matches the email address entered

                $this->getGateway()->loginUser($email);

                //If statement used if an password is found to a corresponding email within the database, retrieving the password in a hashed form for the user.
                if (count($this->getGateway()->getResult()) == 1) {
                    $hashpassword = $this->getGateway()->getResult()[0]['user_password'];

                    if (password_verify($password, $hashpassword)) {
                        $key = SECRET_KEY; //$key refers to the encryption key.

                        $payload = array(
                            "user_id" => $this->getGateway()->getResult()[0]['user_id'], //Assigns the user_id in the token to be the same as the id collected when checking the email address and password.
                            "user_isAdmin" => $this->getGateway()->getResult()[0]['user_isAdmin'], //Assigns the user_isAdmin value into the token, used to check the Admin status to gain access to the admin page.
                            "user_ign" => $this->getGateway()->getResult()[0]['user_ign'], //Assigns the user_isAdmin value into the token, used to check the Admin status to gain access to the admin page.
                            "exp" => time() + 2592000 //Set to 30 days till expiration.
                        );

                        $jwt = JWT::encode($payload, $key, 'HS256'); //Encodes the web token using JWT Class from Firebase.
                        $data = ['token' => $jwt];
                    }
                }
            }

            if (!array_key_exists('token', $data)) {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatus(401);
            }
            else{        
                $this->message = "Resource Not Found";
                $this->getResponse()->setStatus(404);
                }
        } else {
            $this->getResponse()->setMessage("Method not Allowed");
            $this->getResponse()->setStatus(405);
        }

        return $data;
    }
}