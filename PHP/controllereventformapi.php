<?php


/**
* ControllerEventFormApi
* 
* This controller oversees the process which allows for the insertion of an event into the database, the controller first checks that no entries are NULL
* Which in the event none are, the SQL query made in the GatewayEventForms is executed and the event is added to the database.
*
* @author Ethan Borrill W18001798
*/
class ControllerEventFormApi extends Controller {

    protected function setGateway() {
        $this->gateway = new GatewayEventForm();
    }

    protected function processRequest() {
        $eventName = $this->getRequest()->getParameter("event_name");
        $eventDesc = $this->getRequest()->getParameter("event_description");
        $eventImg = $this->getRequest()->getParameter("event_img");
        $eventDate = $this->getRequest()->getParameter("event_date");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!$this->getGateway()->eventExists($eventName)){

                if (!is_null($eventName) && !is_null($eventDesc) && !is_null($eventImg)  && !is_null($eventDate)) {
                        $this->getGateway()->AddEvent($eventName,$eventDesc,$eventImg,$eventDate);        
                } else {
                    $this->getResponse()->setMessage("The event details you have entered cannot be used!");
                    $this->getResponse()->setStatus(406);
                }
            } else {
                //if the user is registered prompt a corresponding message
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Sorry, an event with this name already exists!");
                $this->getResponse()->setStatus(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}