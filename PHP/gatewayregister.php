<?php


/**
* GatewayRegister
* 
* This gateway provides the SQL queries needed for the Register account process to occur, collecting all the details entered into the register form
* and inserting them into the User table in the database as a new user. An additional query is used to check if the Email address being entered is already in use.
*
* @author Ethan Borrill W18001798
*/
class GatewayRegister extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    /**
     * SQL query for registering a new user on the webpage and to the database.
     */
    public function registerUser($email, $password, $userign, $userFirst, $userLast)
    {
        $sql = "INSERT into user (user_email,user_password,user_ign,user_firstName,user_lastName) 
                       values(:useremail,:hashedpassword,:userign, :userfirstName, :userlastName)";
        $params = [
            ":useremail" => $email,
            ":hashedpassword" => $password,
            ":userign" => $userign,
            ":userfirstName" => $userFirst,
            ":userlastName" => $userLast

        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query checks if the email address entered is already in use within the database.
     */
    public function emailUsed($email)
    {
        $sql = "SELECT * FROM user WHERE user_email  = :useremail";
        $params = [":useremail" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }
}