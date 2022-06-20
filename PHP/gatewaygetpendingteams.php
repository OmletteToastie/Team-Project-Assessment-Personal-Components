<?php

/**
 * GatewayGetPendingTeams
 * 
 * This gateway is used to obtain the details of teams from the PendingTeams form to be displayed within the manageTeam's form prior to submission or deletion.
 * 
 * @author Ethan Borrill W18001798
 * 
 */         

class GatewayGetPendingTeams extends Gateway  {
    private $sql = "SELECT pendingTeams.team_id, team_name, game.game_name, user_ign FROM pendingTeams
                    JOIN game ON pendingTeams.game_id = game.game_id JOIN user ON pendingTeams.team_lead = user.user_id";
    
    public function __construct() {
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

    
    
}