import * as React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/**
* TeamSubmissionForm
* 
* This form is displayed on the Teams page of the webpage,allowing users to submit their own team for approval by admins,
* Users are required to submit a team name, the games the team will be playing and the leader of the team.
*
* @author Ethan Borrill W18001798
* @collab
*
* @todo
*/

class TeamSubmissionForm extends React.Component {

    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the Games and Players APIS, these are then assigned to values urlGames and urlPlayers to be used in the dropdown boxes.
    *
    */
    componentDidMount() {
        let urlGames = ""
        this.fetchDataGames(urlGames)

        let urlPlayers = ""
        this.fetchDataPlayers(urlPlayers)
    }


    /**
    * Constructor
    * 
    * Used within this class to initialise several values used within the file, such as an empty data array for accolades and teams.
    *
    */
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            players: [],
            games: [],
        }
    }

    /**
    * fetchDataGames
    * 
    * Function retrieves the data collected from the Games API URL and sets the value of 'games' to be the relevant data.
    *
    */
    fetchDataGames = (urlGames) => {
        fetch(urlGames)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ games: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }

    /**
    * fetchDataPlayers
    * 
    * Function retrieves the data collected from the Players API URL and sets the value of 'players' to be the relevant data.
    *
    */
    fetchDataPlayers = (urlPlayers) => {
        fetch(urlPlayers)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ players: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }


    /**
    * Render
    * 
    * Function will render the Text input used to enter the team names, dropdown menus and buttons used in the form to upload a Team Submission. These dropdowns will also contain the data of the Players and Games from their respective API.
    * This includes the ID and Name of both the Games and Players.
    *
    * @returns {Page} - Will display the rendered page content.
    */
    render() {
        return (
            <div>
                <ul><Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                    Create a new Team
                </Typography></ul>
                <ul><input
                    type='text'
                    placeholder='Team Name'
                    value={this.props.team_name}
                    onChange={this.props.handleTeamName}
                /></ul>

                <ul>
                    <label>
                        <select value={this.props.game_id} onChange={this.props.handleGameSelect}>
                            <option value="">Select a game</option>
                            {this.state.games.map((game) => <option value={game.game_id}>{game.game_name}</option>)}
                        </select>
                    </label>
                </ul>

                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleTeamSelect}>
                            <option value="">Team captain</option>
                            {this.state.players.map((player) => <option value={player.user_id}>{player.user_ign}</option>)}
                        </select>
                    </label>
                </ul>
                <ul><Button onClick={this.props.handleTeamSubmit} sx={{backgroundColor:"#D5761D",color: 'white'}}>Submit Team</Button></ul>
            </div>
        );
    }
}


export default TeamSubmissionForm;