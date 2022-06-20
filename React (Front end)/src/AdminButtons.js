import * as React from "react";
import Button from '@mui/material/Button';

/**
* AdminButtons
* 
* This class creates the 5 buttons to be used on the admin page of the website, which will be used to navigate between the several forms available for administrators to update or upload content onto the website.
*
* @author Ethan Borrill W18001798
*/

class AdminButtons extends React.Component {
    render() {
        return (
            <div>
                <ul><Button onClick={this.props.handleEventsFormClick} size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block', textAlign:"center", width:"100%"}}>Add an event</Button></ul>
                <ul><Button onClick={this.props.handleMatchFormClick} size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block',width:"100%"}}>Add match results</Button></ul>
                <ul><Button onClick={this.props.handleTeamApplicationsClick} size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block',width:"100%"}}>Team Applications</Button></ul>
                <ul><Button onClick={this.props.handleMembersApplicationClick} size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block',width:"100%"}}>Member Applications</Button></ul>
                <ul><Button onClick={this.props.handleTeamAccoladesClick} size="large" sx={{backgroundColor:"#D5761D",color: 'white', display: 'block',width:"100%"}}>Manage Team Accolades</Button></ul>
            </div>
        );
    }
}

export default AdminButtons;