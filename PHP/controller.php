<?php

abstract class Controller
{
    private $request; //Used to store requested object passed from the webpage
    private $response; //Used to store the response collected from the webpage
    protected $gateway; //Stores information collected from interacting with the database

    public function __construct($request, $response)
    {
        $this->setGateway();
        $this->setRequest($request);
        $this->setResponse($response);

        $data = $this->processRequest();
        $this->getResponse()->setData($data);
    }

    private function setRequest($request)
    {
        $this->request = $request;
    }

    protected function getRequest()
    {
        return $this->request;
    }

    private function setResponse($response)
    {
        $this->response = $response;
    }

    protected function getResponse()
    {
        return $this->response;
    }

    protected function setGateway()
    {
    }

    protected function getGateway()
    {
        return $this->gateway;
    }

    
    protected function processRequest() {
    }
}
