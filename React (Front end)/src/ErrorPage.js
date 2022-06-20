import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";

/**
* ErrorPage
* 
* This class is used to display a page on the website in the event a user tries to access a page which is not available or does not exist.
*
* @author Ethan Borrill W18001798
*/

class ErrorPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                            Page not found!
                        </Typography>
                        <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                            Unfortunately, the page you are looking for does not exist! Please use the Navigation bar at the top to return to an existing page.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default ErrorPage;