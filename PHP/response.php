<?php

/**
 * The parent class responsible for containing the primary functions used in handling content sent to the client, 
 * primarily the setters and getters used for collecting and implementing data.
 * 
 * @author Ethan Borrill W18001798
 */
abstract class Response

{
    protected $data;

    public function __construct() {
        $this->headers();
    }
    
    /**
     * This function will collect and add data to the variable to be deployed on the API's.
     * 
     * @param $data - collects responses and stores the data to be deployed onto the API webpages.
     */
    public function setData($data) {
        $this->data = $data;
    }

    /**
     * This function will return and display the data collected from setData on the API webpages.
     * 
     * @return mixed data = returns collected data to be displayed.
     */
    public function getData() {
        return $this->data;
    }

    protected function headers() {
    }
}