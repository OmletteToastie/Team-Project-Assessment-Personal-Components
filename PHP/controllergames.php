<?php

/**
 * Player Controller
 * 
 * This controller collects the data from the GatewayGames to display data based on the parameters provided, in this case either all games of single games based on their ID number.
 * 
 * @example If the request contains ?game=2, League of Legends will be selected.
 * 
 * @author Ethan Borrill W18001798
 */

class ControllerGames extends Controller
{

    protected function setGateway()
    {
        $this->gateway = new GatewayGames();
    }

    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest()
    {

        $game = $this->getRequest()->getParameter("id");


        if (!is_null($game)) {
            $this->getGateway()->findGame($game);
        } else {
            $this->getGateway()->findAll();
        }

        return $this->getGateway()->getResult();
    }
}
