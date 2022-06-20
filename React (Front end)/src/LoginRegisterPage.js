import React from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import jwt_decode from "jwt-decode";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import Helmet from "react-helmet";

/**
* LoginRegisterPage
* 
* The Class manages the functionality and content displayed on the Login and Register page of the website. The page provides users with both a login and register form, both of which are accesible through the links are the bottom of each form - 
* which simply switches the state of the page to display the other form.
*
* @author Ethan Borrill W18001798
*/
class LoginRegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            registered: false,
            registerpage: false,
            token: null,
            email: null,
            password: null,
            userign: null,
            userFirst: null,
            userLast: null,
            error: "",
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handleUserIGN = this.handleUserIGN.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleRegisterState = this.handleRegisterState.bind(this);
        this.handleLoginState = this.handleLoginState.bind(this);
    }


    /**
    * componentDidMount
    * 
    * This function is used within this file to check if there is a token within the local storage of the web browser. If there is one, the user value will be set to true, resulting in the login page being set to display a welcome page
    * Which will prevent the user from logging in again.
    */
    componentDidMount() {
        if (localStorage.getItem('UserLoginToken')) {
            this.setState({
                user: true,
                token: localStorage.getItem('UserLoginToken')
            })
        }

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
    * handlePassword(e)
    * 
    * Handles the input and change of text within the password field used within the register and login pages.
    *
    */
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }


    /**
    * handlefirstName(e)
    * 
    * Handles the input and change of text within the 'First Name' field used within the register page.
    *
    */
    handlefirstName = (e) => {
        this.setState({ userFirst: e.target.value })
    }


    /**
    * handlelastName(e)
    * 
    * Handles the input and change of text within the 'Last Name' field used within the register page.
    *
    */
    handlelastName = (e) => {
        this.setState({ userLast: e.target.value })
    }


    /**
    * handleUserIGN(e)
    * 
    * Handles the input and change of text within the 'User IGN' field used within the register page.
    *
    */
    handleUserIGN = (e) => {
        this.setState({ userign: e.target.value })
    }

    /**
    * handleRegisterState()
    * 
    * Changes the state of the webpage to display the register form when the user presses the register button on the Login page.
    *
    */
    handleRegisterState = () => {
        this.setState(
            {
                loginpage: false,
                registerpage: true
            }
        )
        if (this.state.registered){
            this.setState({ error: "You cannot re-register your account from here, please use the details you created to log in." })
        }
    }


    /**
    * handleLoginState()
    * 
    * Changes the state of the webpage to display the login form when the user presses the login button on the Register page.
    *
    */
    handleLoginState = () => {
        this.setState(
            {
                loginpage: true,
                registerpage: false
            }
        )
    }


    /**
    * handleLoginClick()
    * 
    * This functionality is used when the user presses the 'Login' button on the login page, this will first check the form data entered into it
    * - which should the details be correct, a token is created to keep the user logged into the website should they leave and the user is redirected to the events page.
    *
    * In the event the details entered are incorrect, this will be flagged within an error message and prevent the user from logging in.
    * @param [type] $[var]   [Description]
    */
    handleLoginClick = () => {
        let url = ""

        let formData = new FormData();
        formData.append('user_email', this.state.email);
        formData.append('user_password', this.state.password);

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 200) { //If the status code of the webpage is 200, perform the login function from the API.
                    alert("Login Successful. Redirecting")
                    window.location.replace("");
                    return response.json()
                } else if ((this.state.email === null) && (this.state.password === null)) {
                    this.setState({ error: "Please enter your email address & password  before attempting to login." })
                } else if (this.state.email === null) {
                    this.setState({ error: "Please enter your email address." })
                } else if (this.state.password === null) {
                    this.setState({ error: "Please enter your password." })
                } else if (response.status === 401) { //If the status code of the webpage is 401, display an error saying the details collected are incorrect.
                    this.setState({ error: "The email address or password you have entered are not correct, please try again!" })
                }
            })

            .then((data) => { //Using the data collected from a successful login, store the data in a Java Web Token to be used on the webpage and set the boolean 'user' to true.
                if ("token" in data.results) {
                    this.setState(
                        {
                            token: data.results.token
                        }
                    )

                    localStorage.setItem('UserLoginToken', data.results.token); //Store the Token within the Browser's local storage.
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }


    /**
    * handleRegisterClick
    * 
    * This functionality handles when a user presses the Register button on the Register page. Includes error catches for if form inputs are empty.
    * Will only submit data to the database if all fields are filled and provide the correct data. Upon complete submission, the boolean 'Registered' is updated to be true.
    * This is used to move users to the secondary login page for users to login immediately after registering.
    *
    */
    handleRegisterClick = () => {
        let url = ""

        let formData = new FormData();
        formData.append('user_email', this.state.email);
        formData.append('user_password', this.state.password);
        formData.append('user_ign', this.state.userign);
        formData.append('user_firstName', this.state.userFirst);
        formData.append('user_lastName', this.state.userLast);


        if ((this.state.email === null) && (this.state.password === null) && (this.state.userign === null) && (this.state.userFirst === null) && (this.state.userLast === null)) {
            this.setState({ error: "Please answer all fields within the form before submitting." })
        } else if (this.state.email === null) {
            this.setState({ error: "Please enter an email." })
        } else if (this.state.password === null) {
            this.setState({ error: "Please enter a password (8-16 characters )." })
        } else if (this.state.userign === null) {
            this.setState({ error: "Please enter your In-Game Name" })
        } else if (this.state.userFirst === null) {
            this.setState({ error: "Please enter your first name." })
        } else if (this.state.userLast === null) {
            this.setState({ error: "Please enter your last name." })
        } 
        else{
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if (response.status === 406) {
                    this.setState({ error: "The email address or password you have entered is not acceptable." })
                } else if (response.status === 403) {
                    this.setState({ error: "The email address you have entered already exists, please try another email address." })
                } else if ((response.status === 200) || (response.status === 204)) {
                    this.setState(
                        {
                            registered: true
                        }
                    )
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
        }    }

    /**
     * 
     * @returns {Page} - Will display the rendered page content based on the conditions required.
     */
    render() {
        let errorMessage = this.state.error

        /**
         * Default page presented upon accessing the page, will display standard login page.
         * Is also accessed should a user press the 'Already have an account? Log in here!' link on the register page.
         */
        let page = (
            <Box sx={{ flexGrow: 1 }}>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                            Login
                        </Typography>
                        <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                            Please enter your details to log into your account!
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <FormLogin
                            handleEmail={this.handleEmail}
                            handlePassword={this.handlePassword}
                            handleLoginClick={this.handleLoginClick}
                            handleRegisterState={this.handleRegisterState}
                        />
                        <ul><p className="errorMessage">{errorMessage}</p></ul>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )


        /**
         * The content required for the Register page, will be displayed if user presses the 'Don't have an account? register one here!' link on the Login page.
         */
        if (this.state.registerpage) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Register
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Please enter your details below to register your account!
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                            <FormRegister
                                handlefirstName={this.handlefirstName}
                                handlelastName={this.handlelastName}
                                handleUserIGN={this.handleUserIGN}
                                handleEmail={this.handleEmail}
                                handlePassword={this.handlePassword}
                                handleRegisterClick={this.handleRegisterClick}
                                handleLoginState={this.handleLoginState}
                            />
                            <ul><p className="errorMessage">{errorMessage}</p></ul>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </Box>
            )
        }

        /**
         * Secondary login page content, displayed only when a user performs a successfuly account registration.
         */
        if (this.state.registered) {
            page = (
                <Box sx={{ flexGrow: 1 }}>
                    <Helmet>
                        <title>Registered</title>
                    </Helmet>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                                Your details have been successfully registered!
                            </Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                                Please enter your details below to log into your account!
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                            <FormLogin
                                handleEmail={this.handleEmail}
                                handlePassword={this.handlePassword}
                                handleLoginClick={this.handleLoginClick}
                                handleRegisterState={this.handleRegisterState}
                            />
                            <ul><p className="errorMessage">{errorMessage}</p></ul>
                        </Grid>
                        <Grid item xs={4}>
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

export default LoginRegisterPage;