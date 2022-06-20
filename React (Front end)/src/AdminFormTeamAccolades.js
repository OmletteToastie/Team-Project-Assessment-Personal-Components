import * as React from "react";
import Button from '@mui/material/Button';


/**
* FormTeamAccolades
* 
* This class is used to display the Form needed to update the accolades associated with teams currently available on the service.
* The drop down lists use data collected from the API to display an updated list of Accolades available and all available teams at that moment, with any new teams being automatically updated.
*
* @author Ethan Borrill W18001798
* 
* 
*/
class AdminFormTeamAccolades extends React.Component {



    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the accolades and teams APIS, these are then assigned to values urlAccolade and urlTeam to be used in the dropdown boxes.
    *
    */
    componentDidMount() {
        let urlAccolade = ""
        this.fetchDataAccolade(urlAccolade)

        let urlTeam = ""
        this.fetchDataTeam(urlTeam)
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
            accolades: [],
            teams: [],
        }
    }


    /**
    * fetchDataAccolade
    * 
    * Function retrieves the data collected from the Accolade API URL and sets the value of 'accolades' to be the relevant data.
    *
    */
    fetchDataAccolade = (urlAccolade) => {
        fetch(urlAccolade)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ accolades: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }


    /**
    * fetchDataTeam
    * 
    * Function retrieves the data collected from the Teams API URL and sets the value of 'teams' to be the relevant data.
    *
    */
    fetchDataTeam = (urlTeam) => {
        
        fetch(urlTeam)
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
    * Render
    * 
    * Function will render the Dropdown menus and Buttons used in the form to update accolade details. These dropdowns will also contain the data of the accolades and teams from their respective API.
    * This includes the ID and Name of both the teams and accolades.
    *
    * @returns {Page} - Will display the rendered page content.
    */
    render() {
        return (
            <div>
                <ul>
                    <label>
                        <select value={this.props.accolade_id} onChange={this.props.handleTeamAccoladeSelect}>
                            <option value="">Select an Accolade here</option>
                            {this.state.accolades.map((accolade) => <option value={accolade.accolade_id}>{accolade.accolade_name}</option>)}
                        </select>
                    </label>
                </ul>
                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleTeamSelect}>
                            <option value="">Select a team here</option>
                            {this.state.teams.map((team) => <option value={team.team_id}>{team.team_name}</option>)}
                        </select>
                    </label>
                </ul>

                <ul><Button onClick={this.props.handleAccoladeSubmit} sx={{backgroundColor:"#D5761D",color: 'white'}}>Submit Accolade</Button></ul>
            </div>
        );
    }
}


export default AdminFormTeamAccolades;