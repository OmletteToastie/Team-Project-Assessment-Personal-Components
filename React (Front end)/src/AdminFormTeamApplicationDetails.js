import React from "react";
import Typography from '@mui/material/Typography';



/**
* AdminFormTeamApplicationDetails
* 
* The class is used to populate the team application form with data to help read and determine application forms.
*
* @author Ethan Borrill W18001798
* @collab
*
* @todo
*/
class AdminFormTeamApplicationDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: true
        }
    }

    /**
    * render()
    * 
    * Renders the content needed to display the Applications to create a team.
    *
    */
    render() {
        let details = "";

        if (this.state.display) {
            
            details = <div>
                        <Typography sx={{ fontSize: 20, fontWeight: 450 }}>
                        Game played by team:
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 250 }}>
                        {this.props.pendingTeams.game_name}
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 450 }}>
                        Team Leader:
                        </Typography>
                        <Typography sx={{ fontSize: 20, fontWeight: 250 }}>
                        {this.props.pendingTeams.user_ign}
                        </Typography>
                        <br></br>
                      </div>
        }    

        return(
            <div>
                <Typography sx={{ fontSize: 20, fontWeight: 450 }}>
                Team name:
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 250 }}>
                {this.props.pendingTeams.team_name}        
                </Typography>
                {details}
            </div>
        )
    }
}

export default AdminFormTeamApplicationDetails;