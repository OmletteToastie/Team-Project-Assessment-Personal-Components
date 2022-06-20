import * as React from "react";
import Button from '@mui/material/Button';

/**
* FormWeeklyEvents
* 
* This class is used to create the form necessary to create and upload weekly event forms onto the Weekly events page of the website.
*
* @author Ethan Borrill W18001798
*/
class AdminFormWeeklyEvents extends React.Component {
    render() {
        return (
            <div>
                <ul><input
                    type='text'
                    placeholder='Title of event'
                    value={this.props.eventTitle}
                    onChange={this.props.handleEventTitle}
                /></ul>

                <ul><textarea
                    type='text'
                    placeholder='Description of event'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventDesc}
                /></ul>

                <ul><input
                    type='date'
                    placeholder='Date & Time of event'
                    value={this.props.eventDesc}
                    onChange={this.props.handleEventDate}
                /></ul>

                <ul><Button onClick={this.props.handleEventSubmit} size="large" sx={{backgroundColor:"#D5761D",color: 'white'}}>Submit Event</Button></ul>
            </div>
        );
    }
}

export default AdminFormWeeklyEvents;