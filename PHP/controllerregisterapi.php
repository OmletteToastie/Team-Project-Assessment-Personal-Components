<?php


/**
* ControllerRegisterApi
* 
* This controller oversees the functions needed to insert a new user entry into the database during the register account process.
* Several checks are performed before this can occur, firstly should the email address being entered already by in use through identifyting it with the emailUsed query
* an error message will be displayed. Additionally email addresses are required to contain an @ and passwords must be greater than 8 charatcers.
*
* In both of the cases where this is true, the entry as added to the database as a new user, which can be used to log in with immediately afterwards.
*
* @author Ethan Borrill W18001798
*/
class ControllerRegisterApi extends Controller {

    protected function setGateway() {
        $this->gateway = new GatewayPlayer();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("user_email");
        $password = $this->getRequest()->getParameter("user_password");
        $userign = $this->getRequest()->getParameter("user_ign");
        $userFirst = $this->getRequest()->getParameter("user_firstName");
        $userLast = $this->getRequest()->getParameter("user_lastName");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!$this->getGateway()->emailUsed($email)){

                if (!is_null($email) && !is_null($password) && !is_null($userign)  && !is_null($userFirst)  && !is_null($userLast)) {

                    if (strpos($email,'@') && strlen($password)>=8) 
                    {

                        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
                        $this->getGateway()->registerUser($email,$hashedpassword,$userign,$userFirst,$userLast);
                
                    } else {
                        $this->getResponse()->setMessage("The password or email you have entered cannot be used.");
                        $this->getResponse()->setStatus(406);
                    }
                } else {
                    $this->getResponse()->setMessage("The password or email you have entered cannot be used.");
                    $this->getResponse()->setStatus(406);
                }
            } else {
                //if the user is registered prompt a corresponding message
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Sorry, this email address is already in use!");
                $this->getResponse()->setStatus(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}