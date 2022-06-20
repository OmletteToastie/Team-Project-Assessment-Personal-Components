<?php

/**
 * The child class of response responsible for handling data within the JSON areas of the webpage, containing the functions for setting status codes and messages on the API’s created. 
 * Both for when content is okay and in the case of an error.
 *
 * @author Ethan Borrill W18001798
 */

class ResponseJSON extends Response
{
    private $message;
    private $statusCode;

    protected function headers() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

     /**
     * This function is used as a setter to collect the message text for API's depending on the corresponding status codes.
     * 
     * @param $message = used to contain and present the data to be shown with Status Codes.
     */
    public function setMessage($message) {
        $this->message = $message;
    }

     /**
     * This function is used to set the statuscode's used on the api depending on the context of the page.
     * 
     * @param $statusCode - contains and displays the respective status code associated with the context of the webpage.
     */
    public function setStatus($statusCode) {
        $this->statusCode = $statusCode;
    }

    /**
     * This function checks for the status of data being collected from the database.
     * Displaying a message and status number based on the corresponding event that occurs.
     * 
     * @return mixed $reponse - contains the response message, count and results based on data collected from database.
     */
    public function getData() {
        if (is_null($this->data)) {
            $this->data = [];
        }

        if (is_null($this->message)) {
            if (count($this->data) === 0) {
                $this->message = "No content";
                $this->setStatus(204);
            } else {
                $this->message = "OK";
                $this->setStatus(200);
            }
        }
        http_response_code($this->statusCode);

        $response['message'] = $this->message;
        $response['count'] = count($this->data);
        $response['results'] = $this->data;

        return json_encode($response);
    }
}
