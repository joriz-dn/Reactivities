import {Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import type {Profile} from "../../lib/types/profile.ts";

type Props = {
    profile: Profile
}

function ProfileHeader({ profile }: Props) {
    const {currentUser} = useAccount();
    const isOwnProfile = profile.id === currentUser?.id
    const isFollowing = true;
    return (
        <Paper elevation={3} sx={{p: 4, borderRadius:1}}>
            <Grid container spacing={2}>
                <Grid size={8} sx={{display:"flex", alignItems: 'start'}}>
                    <Stack sx={{display:"flex", flexDirection: 'row', gap:2, alignItems: 'center'}}>
                        <Avatar src={profile.imageUrl} alt={profile.displayName + ' image'} sx={{width: 100, height: 100}} />
                        <Box sx={{display: 'flex', flexDirection: 'column', gap:2}}>
                            <Typography variant='h4'>{profile.displayName}</Typography>
                            {isFollowing && !isOwnProfile && <Chip 
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
                                <Typography variant='h4'>5</Typography>
                            </Box>
                            <Box sx={{textAlign:"center"}}>
                                <Typography variant='h6'>Following</Typography>
                                <Typography variant='h4'>42</Typography>
                            </Box>
                        </Box>
                        {!isOwnProfile && <>
                            <Divider sx={{width:'100%', mb : 2}}></Divider>
                            <Button
                                fullWidth
                                variant="outlined"
                                color={isFollowing ? 'error' : 'success'}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                        </>}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ProfileHeader;