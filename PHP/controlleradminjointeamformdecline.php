<?php

/**
 * ControllerAdminJoinTeamFormDecline
 * 
 * This controller handles and manages the ability for applications within the pendingMembers to be deleted from the database.
 * 
 *
 * @author Ethan Borrill W18001798
 */
class ControllerAdminJoinTeamFormDecline extends Controller
{
    /**
     * The setGateway function allocates the GatewayJoinTeamFormDecline Gateway to this controller in order to access the relevant 'params' objects collected from their respective SQL Queries. 
     */
    protected function setGateway()
    {
        $this->gateway = new GatewayPendingMembers();
    }

    /**
     * Processrequest takes the parameters implemented in the gateway.
     * 
     * @return mixed $this - Returns the results collected from the gateway.
     */
    protected function processRequest()
    {
        $userid = $this->getRequest()->getParameter("user_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
                if (!is_null($userid)) {
                    $this->getGateway()->DeclineMember($userid);
                }
            } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
        return $this->getGateway()->getResult();
    }
}
