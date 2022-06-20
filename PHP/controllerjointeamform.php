<?php

/**
 * This controller handles and manages the ability for applications made on the 'All teams' page into the pendingMembers table of the database.
 * 
 *
 * @author Ethan Borrill W18001798
 */
class ControllerJoinTeamForm extends Controller
{
    /**
     * The setGateway function allocates the PendingTeamsFormApproval Gateway to this controller in order to access the relevant 'params' objects collected from their respective SQL Queries. 
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
        $teamid = $this->getRequest()->getParameter("userTeam_id");
        $userid = $this->getRequest()->getParameter("user_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
                if (!is_null($teamid) && !is_null($userid)) {
                    $this->getGateway()->joinTeam($teamid,$userid);
                }
            } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
        return $this->getGateway()->getResult();
    }
}