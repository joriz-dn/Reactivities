import {useLocation} from "react-router";
import {Divider, Paper, Typography} from "@mui/material";

function ServerError() {
    const {state} = useLocation();
    return ( 
        <Paper>
            {state.error ? (
                <>
                    <Typography gutterBottom variant="h3" sx={{px:4, pt:2}} color="textSecondary">
                        {state.error.message || 'There has been an error.' }
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="body1" sx={{p: 4}}>
                        {state.error?.details || 'Internal Server Error'}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5"> Server Error  </Typography>
            )}
        </Paper>
    );
}

export default ServerError;