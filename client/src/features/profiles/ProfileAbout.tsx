import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, Typography} from "@mui/material";
import EditForm from "./form/EditForm.tsx";
import {useState} from "react";

function ProfileAbout() {

    const {id} = useParams();
    const {profile} = useProfile(id);
    const [isEditing, setIsEditing] = useState<boolean>();
    
    const handleIsEditing = (value : boolean) => {
        setIsEditing(value);
    }
    
    return (
        <Box>
            <Box sx={{display:'flex', justifyContent:'end'}}>
                <Button onClick={() => setIsEditing(!isEditing)}>
                    {!isEditing ? "Edit" : "Cancel"}
                </Button>
            </Box>
            <Divider sx={{my:2}} />
            {!isEditing ? (
                <Box sx={{overflowX: 'auto', maxHeight:350}}>
                    <Typography variant="body1" sx={{whitespace: 'pre-wrap', textAlign: "justify", textIndent:30}}>
                        {profile?.bio || 'No description added yet'}
                    </Typography>
                </Box>
            ) : (
                <EditForm handleIsEditing={handleIsEditing}/>
            )}
        </Box>
    );
}

export default ProfileAbout;