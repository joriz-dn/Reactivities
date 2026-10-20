import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, Typography} from "@mui/material";

function ProfileAbout() {
    
    const {id} = useParams();
    const {profile} = useProfile(id);
    
    return (
        <Box>
           <Box sx={{display:'flex', justifyContent:'end'}}>
               <Button>
                   Edit
               </Button>
           </Box>
            <Divider sx={{my:2}} />
            <Box sx={{overflowX: 'auto', maxHeight:350}}>
                <Typography variant="body1" sx={{whitespace: 'pre-wrap'}}>
                    {profile?.bio || 'No description added yet'}
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileAbout;