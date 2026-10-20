import {Grid, Typography} from "@mui/material";
import ProfileHeader from "./ProfileHeader.tsx";
import ProfileContent from "./ProfileContent.tsx";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";

function ProfilePage() {
    const {id} = useParams();
    const {profile, loadingProfile} = useProfile(id);
    
    if (loadingProfile) return <Typography>Loading...</Typography>;
    if (!profile) return <Typography>Profile Not Found</Typography>
    
    return (
        <Grid container sx={{mb: 3}}>
            <Grid size={12} spacing={2}>
                <ProfileHeader profile={profile}/>
                <ProfileContent />
            </Grid>
        </Grid>
    );
}

export default ProfilePage;