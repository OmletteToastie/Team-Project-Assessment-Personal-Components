<?php

/**
 * ControllerAdminGetPendingTeams
 * 
 * This controller is used to display content when using the '/api/pendingteams', providing means to display all or singular teams.
 * 
 * @example If the request contains ?id=2, the details of pendingteam 2 will be returned.
 * 
 * @author Ethan Borrill W18001798
 */
class ControllerAdminGetPendingTeams extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayPendingTeams();
    }

    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        $id = $this->getRequest()->getParameter("id");
        
        if (!is_null($id)) {
            $this->getGateway()->filterTeams($id);
        }else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}