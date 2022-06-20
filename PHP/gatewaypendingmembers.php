<?php

/**
 * GatewayAdminGetPendingMembers
 * 
 * This gateway is used to obtain the details of users from the pendingMembers form to be displayed within the Join Team application's form prior to submission or deletion.
 * 
 * @author Ethan Borrill W18001798
 */

class GatewayPendingMembers extends Gateway
{
    private $sql = "SELECT pendingMembers.userTeam_id, pendingMembers.user_id, team_name, user_ign FROM pendingMembers
                    JOIN team ON pendingMembers.userTeam_id = team.team_id JOIN user ON pendingMembers.user_id = user.user_id";

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

    public function filterMember($id)
    {
        $this->sql .= " WHERE pendingMembers.user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query for submimtting a new team member.
     */
    public function joinTeam($teamid, $userid)
    {
        $sql = "INSERT into pendingMembers (userTeam_id, user_id) 
                       values(:userteam,:userid)";
        $params = [
            ":userteam" => $teamid,
            ":userid" => $userid,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL will delete the Member application form from the pendingMembers table.
     */
    public function DeclineMember($userid)
    {
        $sql = "DELETE FROM pendingMembers WHERE pendingMembers.user_id = :user_id;";
        $params = [":user_id" => $userid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
