<?php

/**
* ControllerAdminResultsForm
* 
* This controller oversees the process which allows for the insertion of a matches results into the database, the controller first checks that no entries are NULL
* Which in the event none are, the SQL query made in the GatewayAdminResultsForm is executed and the Match result is added to the database.
*
* @author Ethan Borrill W18001798
*/
class ControllerAdminResultsForm extends Controller {

    protected function setGateway() {
        $this->gateway = new GatewayResults();
    }

    protected function processRequest() {
        $team_id = $this->getRequest()->getParameter("match_teamId");
        $match_opponent = $this->getRequest()->getParameter("match_opponent");
        $match_date = $this->getRequest()->getParameter("match_date");
        $match_result = $this->getRequest()->getParameter("match_outcome");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
                if (!is_null($team_id) && !is_null($match_opponent) && !is_null($match_date) && !is_null($match_result)) {
                        $this->getGateway()->addResult($team_id,$match_date,$match_opponent,$match_result);        
                } else {
                    $this->getResponse()->setMessage("The match details you have entered cannot be used!");
                    $this->getResponse()->setStatus(406);
                }
            
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}