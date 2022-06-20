<?php


/**
* ControllerErrorApi
* 
* This controller is used to display an API error in the event an API requested does not exist.
*
* @author Ethan Borrill W18001798
*/

class ControllerErrorApi extends Controller
{
    protected function processRequest()
    {
        $this->getResponse()->setMessage("Page not found");
        $this->getResponse()->setStatus(404);
    }

}