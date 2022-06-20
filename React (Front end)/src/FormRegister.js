import React from "react";
import Button from '@mui/material/Button';
import { Tooltip } from "@mui/material";
/**
* FormLRegister
* 
* This class is used to create the register form needed to be displayed within the LoginRegister page of the site, including inputs for the email address, password, first & last name of the user and their In-game name (IGN).
* in addition to 2 buttons, used to either submit the entered details or move to the register account form.
*
* @author Ethan Borrill W18001798
*/
class FormRegister extends React.Component {
    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Email Address'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                /></ul>
                <ul>
                <Tooltip title="Please create a strong password with 8 or more characters." Password Tips>
                    <input
                    type='password'
                    placeholder='Password'
                    value={this.props.password}
                    onChange={this.props.handlePassword}
                    />
                </Tooltip></ul>
                <ul><input
                    type='text'
                    placeholder='User IGN'
                    value={this.props.userign}
                    onChange={this.props.handleUserIGN}
                /></ul>
                <ul><input
                    type='text'
                    placeholder='First Name'
                    value={this.props.userFirst}
                    onChange={this.props.handlefirstName}
                /></ul>
                <ul><input
                    type='text'
                    placeholder='Last Name'
                    value={this.props.userLast}
                    onChange={this.props.handlelastName}
                /></ul>
                <ul><Button onClick={this.props.handleRegisterClick} sx={{backgroundColor:"#D5761D",color: 'white'}}>Register account</Button></ul>
                <ul><Button onClick={this.props.handleLoginState} sx={{backgroundColor:"#D5761D",color: 'white'}}>Already have an account? log in here!</Button></ul>
            </div>
        )
    }
}

export default FormRegister;