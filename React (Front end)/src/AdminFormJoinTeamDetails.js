import React from "react";
import Typography from '@mui/material/Typography';

/**
* AdminFormJoinTeamDetails
* 
* This class is used to populate the Member application form with data to help read and determine application forms.
*
* @author Ethan Borrill W18001798
* @collab
*
* @todo
*/
class AdminFormJoinTeamDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: true
        }
    }

    /**
    * render()
    * 
    * Renders the content needed to display the Applications to join the requested teams.
    *
    */
    render() {
        let details = "";

        if (this.state.display) {
            
            details = <div>
                        <Typography sx={{ fontSize: 20, fontWeight: 450 }}>
                        The user wanting to join this team:
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 250 }}>
                        {this.props.pendingMembers.user_ign}
                        </Typography>
                        <br></br>
                      </div>
        }    

        return(
            <div>
                <Typography sx={{ fontSize: 20, fontWeight: 450 }}>
                The team wanting to be joined:
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 250 }}>
                {this.props.pendingMembers.team_name}        
                </Typography>
                {details}
            </div>
        )
    }
}

export default AdminFormJoinTeamDetails;