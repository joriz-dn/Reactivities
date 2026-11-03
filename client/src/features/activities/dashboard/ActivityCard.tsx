import {
    Avatar, Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Typography
} from "@mui/material";
import {Link} from "react-router";
import {AccessTime, Place} from "@mui/icons-material";
import {formatDate} from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover.tsx";
import type {Profile} from "../../../lib/types/profile.ts";
import type {Activity} from "../../../lib/types";

type Props = {
    activity: Activity
}
export default function ActivityCard({activity}: Props) {
    const label = activity.isHost ? 'You are Hosting' : 'You are going!';
    const color = activity.isHost ? 'primary' : activity.isGoing ? 'success' : 'default';
    
    return (
        <Card sx={{borderRadius: 3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
                <CardHeader
                    disableTypography={false}
                    avatar={<Avatar src={activity.hostImageUrl} sx={{height: 60, width:60}} />}
                    title={
                        <Typography sx={{ fontWeight:"bold", fontSize:20}}>
                            {activity.title}
                        </Typography>
                    }
                    subheader={
                       <Box>
                        Hosted by <Link style={{ textDecoration: 'none' }} to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
                       </Box>
                    }
                />
                <Box sx={{display: "flex", flexDirection:"column", gap:1, m: 2}}>
                    {(activity.isHost || activity.isGoing) && <Chip label={label} color={color} sx={{borderRadius: 1}}></Chip>}
                    {activity.isCancelled && <Chip label="Cancelled" color="error" sx={{borderRadius: 1}} variant="outlined"></Chip>}
                </Box>
            </Box>
            
            <Divider sx={{mb: 3}}>
                
            </Divider>
            
            <CardContent sx={{p: 0}}>
                <Box sx={{display: "flex", alignItems: 'center', mb: 2, px: 2}}>
                   <Box sx={{display: "flex", alignItems: 'center', flexGrow:0}}>
                       <AccessTime sx={{mr: 1}}></AccessTime>
                       <Typography variant="body2" noWrap={true}>
                           {formatDate(activity.date)}
                       </Typography>
                   </Box>
                    <Place sx={{ml:3, mr:1}}></Place>
                    <Typography variant="body2">{activity.venue}</Typography>
                </Box>
                <Divider />
                <Box sx={{display: "flex", gap: 2, backgroundColor: "grey.100", py:3, pl:3}}>
                    {activity.attendees.map((att: Profile) => (
                        <AvatarPopover key={att.id} profile={att}></AvatarPopover>
                    ))}
                </Box>
            </CardContent>
            <CardContent sx={{ pb: 2}}>
                <Typography variant="body2">
                    {activity.description}
                </Typography>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium" variant="contained"
                    sx={{display:"flex", justifySelf:"self-end", borderRadius: 1}}>
                    View
                </Button>
            </CardContent>
        </Card>
    );
}