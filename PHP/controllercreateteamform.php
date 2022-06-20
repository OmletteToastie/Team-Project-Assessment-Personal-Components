<?php


/**
 * ControllerCreateTeamForm
 * 
 * This gateway provides the SQL queries needed for the Create Team form on the teams page of the webpage process to function, collecting all the details entered into the register form
 * and inserting them into the pendingTeams table in the database to be approved. An additional query is used to check if the Team name being entered is already in use.
 *
 * @author Ethan Borrill W18001798
 */
class ControllerCreateTeamForm extends Controller
{
    protected function setGateway()
    {
        $this->gateway = new GatewayPendingTeams();
    }

    protected function processRequest()
    {
        $teamname = $this->getRequest()->getParameter("team_name");
        $gameid = $this->getRequest()->getParameter("game_id");
        $teamlead = $this->getRequest()->getParameter("team_lead");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!$this->getGateway()->teamPending($teamname)) {
                if (!is_null($teamname) && !is_null($gameid) && !is_null($teamlead)) {
                    $this->getGateway()->submitTeam($teamname, $gameid, $teamlead);
                } else {
                    $this->getResponse()->setMessage("The password or email you have entered cannot be used.");
                    $this->getResponse()->setStatus(406);
                }
            } else {
                //If the team already exists, this message is presented.
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Sorry, this team name is already in use!");
                $this->getResponse()->setStatus(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}
