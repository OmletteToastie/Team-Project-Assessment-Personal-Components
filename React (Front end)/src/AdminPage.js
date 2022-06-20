import React from "react";
import AdminButtons from "./AdminButtons.js";
import jwt_decode from "jwt-decode";
import AdminFormWeeklyEvents from "./AdminFormWeeklyEvents.js";
import AdminFormTeamApplication from "./AdminFormTeamApplication.js";
import AdminFormTeamAccolades from "./AdminFormTeamAccolades.js";
import AdminFormJoinTeamApplication from "./AdminFormJoinTeamApplication.js";
import AdminResultsForm from "./AdminResultsForm.js";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import Helmet from "react-helmet";

/**
* AdminPage
* 
* This class is used to manage the functionalites and content seen within the Administrative pages of the application, which are only accessible by verified users in teh database.
* To check this, the user's webtoken is decoded to check whether the isAdmin value retrieved in association with their account is a value of 1, which will allow them access.
*
* Within this page, users can access several forms related to the functions within the website, such as the weekly results page, events and teams - these forms are then used to update content shown on these pages.
*
* @author Ethan Borrill W18001798
*/

class AdminPage extends React.Component {


    /**
    * Constructor
    * 
    * This function initialises several critical components needed for this file to run.
    *
    */

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            authenticated: true,
            token: null,
            error: "",

            EventsForm: false,
            ResultsForm: false,
            TeamApplicationForm: false,
            MemberApplicationForm: false,
            AccoladesForm: false,

            EventTitle: null,
            EventDesc: null,
            EventDate: null,

            MatchteamDropDown: "",
            MatchOpponent: null,
            MatchDate: null,
            MatchResults: null,

            TeamDropDown: "",
            AccoladesDropDown: "",
            TeamApplicationsDropDown: "",
            MemberApplicationDropDown: "",
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleEventsFormClick = this.handleEventsFormClick.bind(this);
        this.handleTeamApplicationsClick = this.handleTeamApplicationsClick.bind(this);
        this.handleTeamAccoladesClick = this.handleTeamAccoladesClick.bind(this);
        this.handleMembersApplicationClick = this.handleMembersApplicationClick.bind(this);
        this.handleMatchFormClick = this.handleMatchFormClick.bind(this);

        this.handleTeamAccoladeSelect = this.handleTeamAccoladeSelect.bind(this);
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.handleAccoladeSubmit = this.handleAccoladeSubmit.bind(this);

        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleEventDesc = this.handleEventDesc.bind(this);
        this.handleEventDate = this.handleEventDate.bind(this);
        this.handleEventSubmit = this.handleEventSubmit.bind(this);

        this.handleTeamSubmissionsSelect = this.handleTeamSubmissionsSelect.bind(this);
        this.handleTeamsFormApprove = this.handleTeamsFormApprove.bind(this);
        this.handleTeamsFormDecline = this.handleTeamsFormDecline.bind(this);

        this.handleMemberSubmissionsSelect = this.handleMemberSubmissionsSelect.bind(this);
        this.handleMemberFormDecline = this.handleMemberFormDecline.bind(this);
        this.handleMemberFormApprove = this.handleMemberFormApprove.bind(this);

        this.handleMatchTeam  = this.handleMatchTeam.bind(this);
        this.handleMatchOpponent = this.handleMatchOpponent.bind(this);
        this.handleMatchDate = this.handleMatchDate.bind(this);
        this.handleMatchResults = this.handleMatchResults.bind(this);
        this.handleMatchSubmit = this.handleMatchSubmit.bind(this);
    }


    /**
    * componentDidMount
    * 
    * This function collects any webtoken stored within the browser made when logging into the site, this is then decoded to check the is_admin value stored within.
    * Should the value of the is_admin be 1, admin access is granted - otherwise the unauthorised webpage will be displayed to prevent unwanted access.
    *
    */
    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
            if (decodedToken.user_isAdmin == 1) {
                this.setState({
                    admin: true
                });
            }
            else if (decodedToken.user_isAdmin == 0) {
                this.setState({
                    admin: false
                });
            }
        }

    }

    /**
    * handlePassword(e)
    * 
    * Handles the input and change of text within the password field used within the register and login pages.
    *
    */
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    /**
    * handleEmail(e)
    * 
    * Handles the input and change of text within the email field used with the register and login pages.
    *
    */
    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    /**
    * handleLogoutClick
    * 
    * Functionality to handle a users logout click within the collection of buttons on the left hand side, will remove the token from local storage - essentially logging the user out.
    *
    */
    handleLogoutClick = () => {
        this.setState(
            {
                admin: false,
                token: null
            }
        )
        localStorage.removeItem('UserLoginToken');
    }
    //FUNCTIONALITY FOR THE WEEKLY EVENTS FORM.
    /**
    * handleEventsFormClick
    * 
    * This is used on the Events form button, will set the state needed for the Events form to be displayed to be true.
    *
    */
    handleEventsFormClick = () => {
        this.setState(
            {
                EventsForm: true,
                ResultsForm: false,
                TeamApplicationForm: false,
                MemberApplicationForm: false,
                AccoladesForm: false
            }
        )
    }

    /**
    * handleEventTitle(e)
    * 
    * Handles the input and change of text within the 'Event Title' field used within the Events form page.
    *
    */
    handleEventTitle = (e) => {
        this.setState({ EventTitle: e.target.value })
    }

    /**
    * handleEventDesc(e)
    * 
    * Handles the input and change of text within the 'Event Description' field used within the Events form page.
    *
    */
    handleEventDesc = (e) => {
        this.setState({ EventDesc: e.target.value })
    }

    /**
    * handleEventDate(e)
    * 
    * Handles the input and change of text within the 'Event Date' field used within the Events form page.
    *
    */
    handleEventDate = (e) => {
        this.setState({ EventDate: e.target.value })
    }


    /**
    * handleEventSubmit
    * 
    * This function is used on the Submission button present on the Events form page. 
    * Upon pressing the button, The contents entered within each field is checked to not be empty - if not the details are submitted to the Events table in the database.
    *
    */
    handleEventSubmit = () => {
        let url = ""

        let formData = new FormData();
        formData.append('event_name', this.state.EventTitle);
        formData.append('event_description', this.state.EventDesc);
        formData.append('event_date', this.state.EventDate);
        
        if ((this.state.EventTitle === null) && (this.state.EventDesc === null) && (this.state.EventDate === null)) {
            this.setState({ error: "Please answer all fields within the form before submitting." })
        } else if (this.state.EventTitle === null) {
            this.setState({ error: "Please enter a Title for the event." })
        } else if (this.state.EventDesc === null) {
            this.setState({ error: "Please enter a description for the event." })
        } else if (this.state.EventDate === null) {
            this.setState({ error: "Please enter a date for the event." })
        } else{
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 403) {
                    this.setState({ error: "Sorry, an event with this name already exists!" })
                }else if (response.status === 406) {
                    this.setState({ error: "The event details you have entered cannot be used!" })
                }else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "Event has been successfully created and uploaded!" })
                    this.setState({EventsForm: false});
                    this.setState({EventsForm: true});
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
        }
    }

    //FUNCTIONALITY FOR THE MATCH RESULTS FORM.
    /**
    * handleMatchFormClick
    * 
    * This is used on the Add match results form button, will set the state needed for the Match Results form to be displayed to be true.
    *
    */
    handleMatchFormClick =() => {
        this.setState(
            {
                EventsForm: false,
                ResultsForm: true,
                TeamApplicationForm: false,
                MemberApplicationForm: false,
                AccoladesForm: false
            }
        )
    }

    /**
    * handleMatchTeam
    * 
    * This function handles the updating of the dropdown box used on the 'Match Results' page, which is essential for navigating applications via updating the ID used in the dropdown box to identify each item.
    *
    */
     handleMatchTeam = (e) => {
        this.setState({ MatchteamDropDown: e.target.value })
    }

    /**
    * handleMatchOpponent(e)
    * 
    * Handles the input and change of text within the 'Opponent' field used within the Events form page.
    *
    */
     handleMatchOpponent = (e) => {
        this.setState({ MatchOpponent: e.target.value })
    }

    /**
    * handleMatchDate(e)
    * 
    * Handles the input and change of text within the 'Match date' field used within the Events form page.
    *
    */
     handleMatchDate = (e) => {
        this.setState({ MatchDate: e.target.value })
    }

    /**
    * handleMatchResults(e)
    * 
    * Handles the input and change of text within the 'Match Field' field used within the Events form page.
    *
    */
     handleMatchResults = (e) => {
        this.setState({ MatchResults: e.target.value })
    }


    /**
     * handleResultFormReset
     * 
     * Clears result form fields
     */

    handleResultFormReset = () => {
        this.setState({
          MatchResults: "",
          MatchteamDropDown: "",
          MatchOpponent: "",
          MatchDate: ""
        });
    };


    /**
    * handleMatchSubmit
    * 
    * This function is used on the Submission button present on the Match results form page. 
    * Upon pressing the button, The contents entered within each field is checked to not be empty - if not the details are submitted to the matchHistory table in the database.
    *
    */
    handleMatchSubmit = () => {
        let url = ""

        let formData = new FormData();
        formData.append('match_teamId', this.state.MatchteamDropDown);
        formData.append('match_opponent', this.state.MatchOpponent);
        formData.append('match_date', this.state.MatchDate);
        formData.append('match_outcome', this.state.MatchResults);
        
        if ((this.state.MatchteamDropDown === "") && (this.state.MatchOpponent === null) && (this.state.MatchDate === null) && (this.state.MatchResults === null)) {
            this.setState({ error: "Please answer all fields within the form before submitting." })
        } else if (this.state.MatchteamDropDown === "") {
            this.setState({ error: "Please select a team which played in the match!" })
        } else if (this.state.MatchOpponent === null) {
            this.setState({ error: "Please enter the Opponent of this match." })
        } else if (this.state.MatchDate === null) {
            this.setState({ error: "Please enter the date the match took place on." })
        } else if (this.state.MatchResults === null) {
            this.setState({ error: "Please enter the results of the match in numerical format." })
        } else{
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 406) {
                    this.setState({ error: "The match details you have entered cannot be used!"})}
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "The matches results has been successfully created and uploaded!" })
                    this.setState({ResultsForm: false});
                    this.setState({ResultsForm: true});
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }   }

    //FUNCTIONALITY FOR THE TEAM MANAGEMENT PAGE.
    /**
    * handleTeamApplicationsClick
    * 
    * This is used on the ManageTeams form button, will set the state needed for the Team management form to be displayed to be true.
    *
    */
    handleTeamApplicationsClick = () => {
        this.setState(
            {
                EventsForm: false,
                ResultsForm: false,
                TeamApplicationForm: true,
                MemberApplicationForm: false,
                AccoladesForm: false
            }
        )
    }

    /**
    * handleTeamSubmissionsSelect
    * 
    * This function handles the updating of the dropdown box used on the 'Teams Application' page, which is essential for navigating applications via updating the ID used in the dropdown box to identify each item.
    *
    */
    handleTeamSubmissionsSelect = (e) => {
        this.setState({ TeamApplicationsDropDown: e.target.value })
    }

    /**
    * handleTeamsFormApprove
    * 
    * This function handles the Approval of a team application from the pendingTeams list, this is assigned to the 'Approve application' button on the Team Applications.
    * The form is managed using the dropdown box, which displays the name of the Team in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleTeamsFormApprove = () => {
        let url = ""

        let formData = new FormData();
        formData.append('team_id', this.state.TeamApplicationsDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.TeamApplicationsDropDown === "")) {
                    this.setState({ error: "Please select an application before approving!" })
                }
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This team submission has been approved! You can now safely delete this application." })
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
    * handleTeamsFormDecline
    * 
    * This function handles the deletion of a team application from the pendingTeams list, this is assigned to the Decline application button on the Team Applications.
    * The form is managed using the dropdown box, which displays the name of the Team in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleTeamsFormDecline = () => {
        let url = ""

        let formData = new FormData();
        formData.append('team_id', this.state.TeamApplicationsDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (this.state.TeamApplicationsDropDown === "") {
                    this.setState({ error: "Please select an application before attempting to delete!" })
                } else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This team application has been successfully deleted!" })
                    this.setState({TeamApplicationForm: false});
                    this.setState({TeamApplicationForm: true});
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    //FUNCTIONALITY FOR THE ACCOLADES PAGE.
    /**
    * handleTeamAccoladesClick
    * 
    * This is used on the Accolades form button, will set the state needed for the Accolades form to be displayed to be true.
    *
    */
    handleTeamAccoladesClick = () => {
        this.setState(
            {
                EventsForm: false,
                ResultsForm: false,
                TeamApplicationForm: false,
                MemberApplicationForm: false,
                AccoladesForm: true
            }
        )
    }

    /**
    * handleTeamSelect
    * 
    * This function handles updating the option selected within the Teams dropdown used by the Accolades form, this is done so that the correct ID is collected and sent during submission.
    *
    */
    handleTeamSelect = (e) => {
        this.setState({ TeamDropDown: e.target.value })
    }

    /**
    * handleTeamAccolade Select
    * 
    * This function handles updating the option selected within the Accolades dropdown used by the Accolades form, this is done so that the correct ID is collected and sent during submission.
    *
    */
    handleTeamAccoladeSelect = (e) => {
        this.setState({ AccoladesDropDown: e.target.value })
    }

    /**
    * handleAccoladeSubmit
    * 
    * This function is used with the Submission button shown on the accolade page, upon pressing this button a check is performed. This check determines if the dropdowns used have an option selected within them,
    * If a team has been selected and the accolade ID have been selected - the ID of these 2 components are inserted into the teamAccolades table within the database.
    */
    handleAccoladeSubmit = () => {
        let url = ""

        let formData = new FormData();
        formData.append('userTeam_id', this.state.TeamDropDown);
        formData.append('accolade_id', this.state.AccoladesDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.TeamDropDown === "") && (this.state.AccoladesDropDown === "")) {
                    this.setState({ error: "Please provide both an Team and Accolade before submitting." })
                }
                else if (this.state.TeamDropDown === "") {
                    this.setState({ error: "Please enter a team to provide this accolade to!" })
                }
                else if (this.state.AccoladesDropDown === "") {
                    this.setState({ error: "Please enter an accolade for this team!" })
                }
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "Accolade has been successfully Assigned!" })
                    this.setState({AccoladesForm: false});
                    this.setState({AccoladesForm: true});
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    
    /**
    * handleMembersApplicationClick
    * 
    * Manages the functionality on the 'Member applications' button on the left hand side of the page. Will change the state of the page to display the Members applications form.
    *
    */
    handleMembersApplicationClick = () => {
        this.setState(
            {
                EventsForm: false,
                ResultsForm: false,
                TeamApplicationForm: false,
                MemberApplicationForm: true,
                AccoladesForm: false
            }
        )
    }

    
    /**
    * handleMemberSubmissionsSelect
    * 
    * Will update the dropdown menu used on the Member applications page.
    *
    */
    handleMemberSubmissionsSelect = (e) => {
        this.setState({ MemberApplicationDropDown: e.target.value })
    }

    /**
    * handleMemberFormApprove
    * 
    * This function handles the Approval of a member application from the pendingMembers list, this is assigned to the 'Approve application' button on the Members Applications.
    * The form is managed using the dropdown box, which displays the name of the User in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleMemberFormApprove = () => {
        let url = ""

        let formData = new FormData();
        formData.append('user_id', this.state.MemberApplicationDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.MemberApplicationDropDown === "")) {
                    this.setState({ error: "Please select an application before approving!" })
                }
                else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This users application has been approved! You can now safely delete this application." })
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    /**
    * handleMemberFormDecline
    * 
    * This function handles the Deletion of a member application from the pendingMembers list, this is assigned to the 'Decline application' button on the Members Applications.
    * The form is managed using the dropdown box, which displays the name of the User in accordance with the list of applications displayed above the dropdown.
    *
    */
    handleMemberFormDecline = () => {
        let url = ""

        let formData = new FormData();
        formData.append('user_id', this.state.MemberApplicationDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (this.state.MemberApplicationDropDown === "") {
                    this.setState({ error: "Please select an application before attempting to delete!" })
                } else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This users application has been declined and deleted!" })
                    this.setState({MemberApplicationForm: false});
                    this.setState({MemberApplicationForm: true});
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }


    /**
    * render
    * 
    * This function will create and display the required functionalities for the Adminpage to operate as intended, this consists of several states created by clicking the buttons presented to the left of the page.
    * Upon pressing these buttons the relevant forms and inputs will be displayed to update certain data displayed on the webpage.
    *
    * @returns {Page} - Will display the rendered page content based on the conditions required.
    */
    render() {
        let page;
        let errorMessage = this.state.error

        if (this.state.admin) {
            if (this.state.EventsForm) { //EVENTS FORM STATE
                page = (
                    
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                            <ul><Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Add an event!
                                </Typography></ul>
                             <ul><Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Enter the event's details down below!
                                </Typography></ul>   
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminFormWeeklyEvents
                                    handleEventTitle={this.handleEventTitle}
                                    handleEventDesc={this.handleEventDesc}
                                    handleEventDate={this.handleEventDate}
                                    handleEventSubmit={this.handleEventSubmit} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.ResultsForm) { //TEAM APPLICATION STATE
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Add match results
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Enter the details of a match below!
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminResultsForm
                                    handleMatchTeam={this.handleMatchTeam}
                                    handleMatchOpponent={this.handleMatchOpponent}
                                    handleMatchDate={this.handleMatchDate}
                                    handleMatchResults={this.handleMatchResults}
                                    handleMatchSubmit={this.handleMatchSubmit} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.TeamApplicationForm) { //TEAM APPLICATION STATE
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Team Applications
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please use the dropdown box to approve or decline applications.
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminFormTeamApplication
                                    handleTeamSubmissionsSelect={this.handleTeamSubmissionsSelect}
                                    handleTeamsFormApprove={this.handleTeamsFormApprove}
                                    handleTeamsFormDecline={this.handleTeamsFormDecline} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.MemberApplicationForm) { //MEMBER APPLICATION STATE.
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Manage User Applications
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                   Please use the dropdown box to approve or decline applications.
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminFormJoinTeamApplication
                                    handleMemberSubmissionsSelect={this.handleMemberSubmissionsSelect}
                                    handleMemberFormApprove={this.handleMemberFormApprove}
                                    handleMemberFormDecline={this.handleMemberFormDecline} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else if (this.state.AccoladesForm) { //ACCOLADES FORM STATE
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                <ul><Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Add an Accolade
                                </Typography></ul>
                                <ul><Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please select the team below and the accolades you wish to add!
                                </Typography></ul>
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminFormTeamAccolades
                                    handleTeamAccoladeSelect={this.handleTeamAccoladeSelect}
                                    handleTeamSelect={this.handleTeamSelect}
                                    handleAccoladeSubmit={this.handleAccoladeSubmit} />
                                <ul><p className="errorMessage">{errorMessage}</p></ul>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            } else { //LANDING PAGE STATE.
                page = (
                    <Box sx={{ flexGrow: 1 }}>
                        <Helmet>
                            <title>Admin</title>
                        </Helmet>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                    Administrative Options
                                </Typography>
                                <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                    Please select an option from the list on the left!
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <AdminButtons
                                    handleEventsFormClick={this.handleEventsFormClick}
                                    handleMatchFormClick={this.handleMatchFormClick}
                                    handleTeamApplicationsClick={this.handleTeamApplicationsClick}
                                    handleMembersApplicationClick={this.handleMembersApplicationClick}
                                    handleTeamAccoladesClick={this.handleTeamAccoladesClick}
                                    handleLogoutClick={this.handleLogoutClick} />
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }
        } else { //Unauthorised ACCESS STATE
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Helmet>
                        <title>Admin</title>
                    </Helmet>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Unauthorised access!
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Unfortunately, you do not have the required level of access to enter this page!
                                <br></br>Please leave this page and return to the rest of the site.
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        return (
            <div>{page}</div>
        )
    }
}
export default AdminPage;
