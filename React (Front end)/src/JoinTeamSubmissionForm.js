import * as React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/**
* JoinTeamSubmissionForm
* 
* This form is displayed on the Teams page of the webpage,allowing users to create an application to join a team for approval by admins,
*
* @author Ethan Borrill W18001798
*/

class JoinTeamSubmissionForm extends React.Component {

    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the Games and Players APIS, these are then assigned to values urlGames and urlPlayers to be used in the dropdown boxes.
    *
    */
    componentDidMount() {
        let urlTeams = ""
        this.fetchDataTeams(urlTeams)

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
            teams: [],
        }
    }

    /**
    * fetchDataTeams
    * 
    * Function retrieves the data collected from the Teams API URL and sets the value of 'teams' to be the relevant data.
    *
    */
    fetchDataTeams = (urlTeams) => {
        fetch(urlTeams)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ teams: data.results })
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
    * Function will render dropdown menus and buttons used in the form to upload a submission to join a team. These dropdowns will also contain the data of the Players and Teams from their respective API.
    * This includes the ID and Name of both the Games and Players.
    *
    * @returns {Page} - Will display the rendered page content.
    */
    render() {
        return (
            <div>
                <ul><Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                    Join a team!
                </Typography></ul>
                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleJoinTeamSelect}>
                            <option value="">Team name</option>
                            {this.state.teams.map((team) => <option value={team.team_id}>{team.team_name}</option>)}
                        </select>
                    </label>
                </ul>

                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleJoinPlayerSelect}>
                            <option value="">Your IGN</option>
                            {this.state.players.map((player) => <option value={player.user_id}>{player.user_ign}</option>)}
                        </select>
                    </label>
                </ul>
                <ul><Button onClick={this.props.handleJoinTeamSubmit} sx={{backgroundColor:"#D5761D",color: 'white'}}>Submit Team</Button></ul>
            </div>
        );
    }
}


export default JoinTeamSubmissionForm;