<?php
/**
* GatewayPlayer
* 
* This gateway collects the data of any Games stored within the 'games' table of the database for use across the webpage when needed.
*
* @author Ethan Borrill W18001798
* @collab
*/

class GatewayGames extends Gateway  {

private $sql = "SELECT game.game_id, game_name, game_minPlayerCount FROM game"; 

public function __construct() {
    $this->setDatabase(DATABASE);
}

/**
 * Returns all Games within the database.
 *
 * @return   array
 */

public function findAll()
{
    $result = $this->getDatabase()->executeSQL($this->sql);
    $this->setResult($result);
}

/**
 * Returns a specific game based on ID.
 *
 * @param    int  $id The ID of the game in question.
 * @return   array
 */

public function findGame($game)
{
    $this->sql .= " WHERE game_id = :id";
    $params = ["id" => $game];
    $result = $this->getDatabase()->executeSQL($this->sql, $params);
    $this->setResult($result);
}
}