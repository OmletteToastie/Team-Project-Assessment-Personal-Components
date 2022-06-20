<?php

/**
* GatewayEvents
* 
* This class acts as a gateway for all content relating to the retrieval of event data from the database, this gateway also includes the SQL queries needed to insert events into the database to be displayed,
* with an additional query to check if an event already exists.
*
* @author Ethan Borrill W18001798
* @collab Connor Campbell W18003255
*
* @todo
*/


class GatewayEvents extends Gateway
{

    private $sql = "SELECT event_id, event_name, event_description, event_date FROM events";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns all events within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * 
     * The queries below are used to insert details from the Event Form on the Admin Page into the Events table of the database.
     * It additionally includes an SQL query which checks to see if the event being entered has already been used.
     *
     * @author Ethan Borrill W18001798
     */

    /**
     * SQL Query for inserting Event form data.
     */
    public function AddEvent($eventName, $eventDesc, $eventDate)
    {
        $sql = "INSERT into events (event_name,event_description,event_date) 
                       values(:eventName,:eventDesc,:eventDate)";
        $params = [
            ":eventName" => $eventName,
            ":eventDesc" => $eventDesc,
            ":eventDate" => $eventDate,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query checks if the event's name is already being used in the Database.
     */
    public function eventExists($eventName)
    {
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
