<?php

/**
 * This controller handles and manages the ability for applications within the pendingTeams page to be inserted into the teams table of the database
 * 
 *
 * @author Ethan Borrill W18001798
 */
class ControllerAdminPendingTeamFormApprove extends Controller
{
    /**
     * The setGateway function allocates the PendingTeamsFormApproval Gateway to this controller in order to access the relevant 'params' objects collected from their respective SQL Queries. 
     */
    protected function setGateway()
    {
        $this->gateway = new GatewayTeam();
    }

    /**
     * Processrequest takes the parameters implemented in the gateway.
     * 
     * @return mixed $this - Returns the results collected from the gateway.
     */
    protected function processRequest()
    {
        $teamid = $this->getRequest()->getParameter("team_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
                if (!is_null($teamid)) {
                    $this->getGateway()->ApproveTeam($teamid);
                }
            } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
        return $this->getGateway()->getResult();
    }
}
