<?php

/**
* ControllerAdminAccoladesFormApi
* 
* The controller provides the SQL gateway 'GatewayAccoladeForms' a method of performing its SQL query.
* In this case, insert the collected information into the teamaccolade table of the
*
* @author Ethan Borrill W18001798
*
*/
class ControllerAdminAccoladesFormApi extends Controller
{

    protected function setGateway()
    {
        $this->gateway = new GatewayAccolades();
    }

    
    /**
    * processRequest
    * 
    * Takes the request from the GatewayAllocationForm and attempts to execute it, with error messages available
    * should this request fail.
    *
    * @return   array
    */
    protected function processRequest()
    {
        $teamid = $this->getRequest()->getParameter("userTeam_id");
        $accoladeid = $this->getRequest()->getParameter("accolade_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($teamid) && !is_null($accoladeid)) {
                $this->getGateway()->AddAccolade($teamid, $accoladeid);
            } else {
                $this->getResponse()->setMessage("");
                $this->getResponse()->setStatus(406);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}
