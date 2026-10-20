import {Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {useParams} from "react-router";

function ProfileHeader() {
    const {id} = useParams();
    const {isCurrentUser, profile, updateFollowing} = useProfile(id);

    if (!profile) return <Typography>Profile Not Found</Typography>
    
    return (
        <Paper elevation={3} sx={{p: 4, borderRadius:1}}>
            <Grid container spacing={2}>
                <Grid size={8} sx={{display:"flex", alignItems: 'start'}}>
                    <Stack sx={{display:"flex", flexDirection: 'row', gap:2, alignItems: 'center'}}>
                        <Avatar src={profile.imageUrl} alt={profile.displayName + ' image'} sx={{width: 100, height: 100}} />
                        <Box sx={{display: 'flex', flexDirection: 'column', gap:2}}>
                            <Typography variant='h4'>{profile.displayName}</Typography>
                            {profile.following && !isCurrentUser && <Chip 
                                variant='outlined' 
                                color='primary' 
                                label= 'Following' 
                                sx={{borderRadius: 1}} 
                            />}
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Stack sx={{ display:"flex", spacing:2, alignItems: 'center'}}>
                        <Box sx={{display:"flex", justifyContent:'space-around', width:'100%'}}>
                            <Box sx={{textAlign:"center"}}>
                                <Typography variant='h6'>Followers</Typography>
                                <Typography variant='h4'>{profile.followersCount}</Typography>
                            </Box>
                            <Box sx={{textAlign:"center"}}>
                                <Typography variant='h6'>Following</Typography>
                                <Typography variant='h4'>{profile.followingsCount}</Typography>
                            </Box>
                        </Box>
                        {!isCurrentUser && <>
                            <Divider sx={{width:'100%', mb : 2}}></Divider>
                            <Button
                                fullWidth
                                variant="outlined"
                                color={profile.following ? 'error' : 'primary'}
                                onClick={() => updateFollowing.mutate()}
                                disabled={updateFollowing.isPending}
                            >
                                {profile.following  ? 'Unfollow' : 'Follow'}
                            </Button>
                        </>}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ProfileHeader;