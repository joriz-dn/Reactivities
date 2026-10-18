import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";

type Props = {
    activity: Activity
}

export default function ActivityDetailsSidebar({activity}: Props) {
    const following = true;
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    {activity.attendees.length} people going
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                {activity.attendees.map((attendee) => (
                    <Grid key={attendee.id} container sx={{alignItems:"center"}}>
                        <Grid size={8}>
                            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                variant="rounded"
                                                alt={attendee.displayName + "images"}
                                                src={`/images/${attendee.displayName}.png`}
                                                sx={{width:75, height:75, mr:3}}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Typography variant="h6">{attendee.displayName}</Typography>
                                            {following && (
                                                <Typography variant="caption" color="primary">
                                                    Following
                                                </Typography>
                                            )}
                                        </ListItemText>
                                    </ListItem>
                            </List>
                        </Grid>
                        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            {activity.hostId === attendee.id && (
                                <Chip
                                    label="Host"
                                    color="info"
                                    variant='outlined'
                                    sx={{borderRadius: 1}}
                                />
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </>
    );
}
