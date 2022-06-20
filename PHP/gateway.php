<?php

/**
 * This class contains the primary functions required by all other gateways to operate correctly andensure that the required SQL queries are correctly collected
 * in order to properly retrieve data from the database.
 * 
 * @author Ethan Borrill W18001798
 */
abstract class Gateway{
    private $database; 
    private $result;

  
    /**
     * The function below will allow for allocation of the database needed when creating a gateway.
     * 
     * @param string $database - Parameter which holds information for accessing the required database.
     */
    protected function setDatabase($database) {
        $this->database = new DBConnection($database); 
    }

    /**
     * This function returns the requested database collected from setDatabase.
     * 
     * @return mixed database - Will return the selected SQL query from the $database parameter.
     */
    protected function getDatabase() {
        return $this->database;
    }

    /**
     * This function collects the result pulled from the SQL query and sets it within a parameter to be displayed.
     * 
     * @param string $result - Assigned the data collected from the SQL query.
     */
    protected function setResult($result) {
        $this->result = $result;
    }

    /**
     * This function will return the selected SQL allocated to the $result query from setResult function.
     * 
     * @return mixed result - Will return the selected SQL query from $result parameter.
     */
    public function getResult() {
        return $this->result;
    }
}