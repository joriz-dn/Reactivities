import {Link} from "react-router";
import {Box, Button, Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";
import {Person} from "@mui/icons-material";
import type {Profile} from "../../lib/types/profile.ts";
import {useAccount} from "../../lib/hooks/useAccount.ts";

type Props = {
    profile: Profile
}

function ProfileCard({ profile }: Props) {
    const {currentUser} = useAccount();
    const isOwnProfile = currentUser?.id === profile.id;
    
    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{
                borderRadius:3, 
                p:3, 
                maxWidth: 300, 
                textDecoration: 'none'
            }} elevation={4}>
                <CardMedia 
                    component="img" 
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{width: '100%', zIndex: 50}}
                    alt={profile.displayName + 'image'}
                >
                </CardMedia>
                <CardContent>
                    <Box sx={{display: 'flex', flexDirection:'column', gap: 1}}>
                        <Typography variant="h5">{profile.displayName}</Typography>
                        {
                            profile.bio && (
                                <Typography
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {profile.bio}
                                </Typography>
                            )
                        }
                    </Box>
                </CardContent>
                <Divider sx={{mb: 2}}></Divider>
                <Box sx={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Person></Person>
                        <Typography sx={{ml: 1}}>{profile.followersCount} Followers</Typography>
                    </Box>
                    {!isOwnProfile && (
                        <Button>
                            {profile.following ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
                </Box>
            </Card>
        </Link>
    );
}

export default ProfileCard;