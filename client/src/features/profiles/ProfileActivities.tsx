import {Box,
    Card, CardContent, CardMedia, Divider, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import {Link, useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import type {ProfileActivity} from "../../lib/types/profile.ts";
import {formatDateWithSuffix, formattedTime} from "../../lib/util/util.ts";

function ProfileActivities() {
    const  {id} = useParams();
    const [filter, setFilter] = useState('hosting');
    const {profileActivities} = useProfile(id,"", filter);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }
        
    return (
        <Box>
            <Box sx={{display:'flex', justifyContent:'start'}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={(e => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>))}
                    >
                        <MenuItem value='hosting'>Hosting</MenuItem>
                        <MenuItem value='past'>Past</MenuItem>
                        <MenuItem value='future'>Future</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Divider sx={{my:2}} />
            <Box sx={{overflowX: 'auto', maxHeight:400, display:'flex', flexDirection: 'row', gap: 2}}>
                {
                    profileActivities?.map((activity: ProfileActivity) => (
                        <Card sx={{ maxWidth: 300, mb:2 }} key={activity.id} component={Link} to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                            <CardMedia
                                sx={{ height: 120 }}
                                image={activity.category ? `/categoryImages/${activity.category}.jpg`: '/images/user.png'}
                                title={activity.title}
                            />
                            <CardContent sx={{display:"flex", alignItems:"center", flexDirection: "column"}}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {activity.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {formatDateWithSuffix(new Date(activity.date))}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {formattedTime(new Date(activity.date))}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box>
        </Box>
    );
}

export default ProfileActivities;