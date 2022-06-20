<?php

/** 
 * The request file handles the passage of information requests made to the API, 
 * initialising and constructing the methods involved in handling the requests, 
 * such as getParameter which creates the $param variable used to represent tags made in the database.
 *
 * @author Ethan Borrill W18001798
 */
class Request
{

    private $basepath = BASEPATH;
    private $path;
    private $requestMethod;

    public function __construct() {
        $this->path = parse_url($_SERVER["REQUEST_URI"])['path'];
        $this->path  = strtolower(str_replace($this->basepath, "", $this->path));
        $this->path = trim($this->path, "/");
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
    }

    /**
     * returns the URL path in the form a Clean URL without the .php file format at the end.
     * 
     * @return mixed path - the URL path requested.
     */
    public function getPath() {
        return $this->path;
    }

    /**
     * Returns the HTTP method required for the webpage requested to display. This will be either GET or POST.
     * 
     * @return string requestMethod - the HTTP method needed to display the web content.
     */
    public function getRequestMethod() {
        return $this->requestMethod;
    }

    /**
     * This function collects the $param parameter and outputs them depending on the HTTP method requested (GET or POST).
     * This content is also sanitised to allow for special characters to be output.
     * 
     * @param string $param = Contains data collected from SQL queries in the API gateways.
     * @return mixed $param = the data collected after being sanitised.
     */
    public function getParameter($param) {
        if ($this->getRequestMethod() === "GET") {
            $param = filter_input(INPUT_GET, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        }
        if ($this->getRequestMethod() === "POST") {
            $param = filter_input(INPUT_POST, $param, FILTER_SANITIZE_SPECIAL_CHARS);
        }
        return $param;
    }
}