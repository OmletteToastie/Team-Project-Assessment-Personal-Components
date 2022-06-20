<?php

/**
* GatewayEventForm
* 
* This gateway is used to insert details from the Event Form on the Admin Page into the Events table of the database.
* It additionally includes an SQL query which checks to see if the event being entered has already been used.
*
* @author Ethan Borrill W18001798
*/
class GatewayEventForm extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }


/**
 * SQL Query for inserting Event form data.
 */
public function AddEvent($eventName,$eventDesc,$eventImg,$eventDate) {
    $sql = "INSERT into events (event_name,event_description,event_img,event_date) 
                       values(:eventName,:eventDesc,:eventImg, :eventDate)";
    $params = [
               ":eventName" => $eventName,
               ":eventDesc" => $eventDesc,
               ":eventImg" => $eventImg,
               ":eventDate" => $eventDate,     
            ];
    $result = $this->getDatabase()->executeSQL($sql, $params);
    $this->setResult($result);
}

/**
 * SQL query checks if the event's name is already being used in the Database.
 */
public function eventExists($eventName) {
    $sql = "SELECT * FROM events WHERE event_name  = :eventName";
    $params = [":eventName" => $eventName];
    $result = $this->getDatabase()->executeSQL($sql, $params);
    if ($result == FALSE) {
        return false;
    } else {
        return true;
    }
}
}
