<?php

/**
 * GatewayPendingTeams
 * 
 * This gateway is used to obtain the details of teams from the PendingTeams form to be displayed within the manageTeam's form prior to submission or deletion.
 * 
 * @author Ethan Borrill W18001798
 * 
 */

class GatewayPendingTeams extends Gateway
{
    private $sql = "SELECT pendingTeams.team_id, team_name, game.game_name, user_ign FROM pendingTeams
                    JOIN game ON pendingTeams.game_id = game.game_id JOIN user ON pendingTeams.team_lead = user.user_id";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }
    /**
     * Returns all results within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    public function filterTeams($id)
    {
        $this->sql .= " WHERE team_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * The SQL queries below are needed for the Team form to function, collecting all details entered into the teams submission form and inserting them into the pendingTeams table in the database,
     * which will then be held for approving, an additional query exists to check if a team of the same name exists within the database.

     * @author Ethan Borrill W18001798
     */

    /**
     * SQL will delete the pendingTeams application form from the PendingTeams table.
     */
    public function DeleteTeam($teamid)
    {
        $sql = "DELETE FROM pendingTeams WHERE pendingTeams.team_id = :team_id;";
        $params = [":team_id" => $teamid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query for submimtting a new team on the webpage and to the database.
     */
    public function submitTeam($teamname, $gameid, $teamlead)
    {
        $sql = "INSERT into pendingTeams (team_name,game_id,team_lead) 
                       values(:teamname,:gameid,:teamlead)";
        $params = [
            ":teamname" => $teamname,
            ":gameid" => $gameid,
            ":teamlead" => $teamlead,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query checks if the team name entered is already in use within the database.
     */
    public function teamPending($teamname)
    {
        $sql = "SELECT * FROM pendingTeams WHERE team_name  = :teamname";
        $params = [":teamname" => $teamname];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }
}