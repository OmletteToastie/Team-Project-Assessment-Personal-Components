import * as React from "react";
import Button from '@mui/material/Button';
import AdminFormTeamApplicationDetails from "./AdminFormTeamApplicationDetails";

/**
* AdminFormTeamApplication
* 
* This class is used to create the form necessary to handle applications to create teams, this form is used on the 'Team applications' page of the Admin page.
*
* @author Ethan Borrill W18001798
*/
class AdminFormTeamApplication extends React.Component {


    /**
    * componentDidMount
    * 
    * Component did mount for this class collects the data from the pendingTeams API, this is then used within the dropdown box by being assigned to the URL variable.
    *
    */
    componentDidMount() {
        let urlPendingTeams = ""
        this.fetchDataPendingTeams(urlPendingTeams)
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
        }
    }

    /**
    * fetchDataPendingTeams
    * 
    * Function retrieves the data collected from the pendingTeams API URL and sets the value of 'Results' to contain the relevant data.
    *
    */
    fetchDataPendingTeams = (urlPendingTeams) => {
        if (this.props.team_id !== undefined && this.props.team_id !== "") {
            urlPendingTeams += "?id=" + this.props.team_id
        }
        fetch(urlPendingTeams)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                this.setState({ results: data.results })
            })
            .catch((err) => {
                console.log("something has gone wrong ", err)
            });
    }


    /**
    * render()
    * 
    * Renders the content needed to display the team application form.
    *
    */
    render() {

        return (
            <div>
                {this.state.results.map((pendingTeams, i) => (<AdminFormTeamApplicationDetails key={i} pendingTeams={pendingTeams} />))}

                <ul>
                    <label>
                        <select value={this.props.team_id} onChange={this.props.handleTeamSubmissionsSelect}>
                            <option value="">Select a Team Application here</option>
                            {this.state.results.map((pendingTeams) => <option value={pendingTeams.team_id}>{pendingTeams.team_name}</option>)}
                        </select>
                    </label>
                </ul>
                <div>
                    <Button onClick={this.props.handleTeamsFormApprove} sx={{backgroundColor:"#D5761D",color: 'white', margin:2}}>Approve Application</Button>
                    <Button onClick={this.props.handleTeamsFormDecline} sx={{backgroundColor:"#D5761D",color: 'white', margin:2}}>Decline/Delete Application</Button>
                </div>
            </div>
        );
    }
}

export default AdminFormTeamApplication;