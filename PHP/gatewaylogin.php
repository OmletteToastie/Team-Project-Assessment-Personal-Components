<?php

/**
 * This Gateway is used to collect the details of a user from the User table of the database to allow for the login
 * process to occur. In addition to the standard details collected, an isAdmin entry is retrieved - which is used to check if the
 * user attempting to log in has authorisation to the Admin page of the website.
 * 
 * @author Ethan Borrill W18001798
 */
class GatewayLogin extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }

    /**
     * Function executes an SQL query to locate the password, ID and admin status of a user based on the email address associated that is provided.
     * 
     */
    public function loginUser($email) {
        $sql = " Select user_id, user_password,user_ign, user_isAdmin from user where user_email = :user_email";
        $params = [":user_email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

}