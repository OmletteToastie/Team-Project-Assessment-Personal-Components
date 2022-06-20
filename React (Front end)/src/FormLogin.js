import * as React from "react";
import Button from '@mui/material/Button';

/**
* FormLogin
* 
* This class is used to create the login form needed to be displayed within the LoginRegister page of the site, including inputs for the email address and password of the user -
* in addition to 2 buttons, used to either submit the entered details or move to the register account form.
*
* @author Ethan Borrill W18001798
*/
class FormLogin extends React.Component {

    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Email here'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                /></ul>
                <ul><input
                    type='password'
                    placeholder='Password here'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                /></ul>
                <ul><Button onClick={this.props.handleLoginClick} sx={{backgroundColor:"#D5761D",color: 'white'}}>Log in</Button></ul>
                <ul><Button onClick={this.props.handleRegisterState} sx={{backgroundColor:"#D5761D",color: 'white'}}>Don't have an account? register one here!</Button></ul>
            </div>
        );
    }
}

export default FormLogin;