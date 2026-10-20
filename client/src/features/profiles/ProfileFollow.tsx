import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Link, useParams} from "react-router";
import type {Profile} from "../../lib/types/profile.ts";

type Props = {
    predicate: string
}

function ProfileFollow({predicate}: Props) {
    const {id} = useParams();
    const {followings, isCurrentUser, updateFollowing} = useProfile(id, predicate);
    
    return (
        <Box sx={{display: "flex", flexDirection: "row", gap: 1}}>
            {followings?.map((profile: Profile) => (
                <Card key={profile.id} sx={{ maxWidth: "20%", minWidth:"20%", }}>
                    <CardMedia
                        component="img"
                        alt={profile.displayName + ' image'}
                        height="200px"
                        image={profile.imageUrl || '/images/user.png'}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {profile.displayName}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            color: 'text.secondary', 
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            height: '100px',
                            textAlign: "justify"
                        }}>
                            {profile.bio || 'No Content'}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                        { isCurrentUser && 
                            <Button 
                                size="small" 
                                color={profile.following ? 'warning' : 'primary'}
                                onClick={() => updateFollowing.mutate(profile)}
                                disabled={updateFollowing.isPending}
                            >
                            {profile.following ? 'Unfollow' : 'Follow'}
                        </Button> }
                        <Button component={Link} to={`/profile/${profile.id}`} size="small">Go to Profile</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default ProfileFollow;