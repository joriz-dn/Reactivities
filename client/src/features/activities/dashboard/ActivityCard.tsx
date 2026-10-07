import {
    Avatar,
    Box,
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

type Props = {
    activity: Activity
}
export default function ActivityCard({activity}: Props) {
    const isHost = false;
    const isGoing = false;
    const label = isHost ? 'You are hosting' : 'You are going';
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';
    
    return (
        <Card sx={{borderRadius: 3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CardHeader
                    disableTypography={false}
                    avatar={<Avatar sx={{height: 40, width:40}} />}
                    title={
                        <Typography sx={{ fontWeight:"bold", fontSize:20}}>
                            {activity.title}
                        </Typography>
                    }
                    subheader={
                       <>
                        Hosted by <Link to={`/profiles/bob`}>Bob</Link>
                       </>
                    }
                />
                <Box sx={{display: "flex", flexDirection:"column", gap:2, mr: 2}}>
                    {(isHost || isGoing) && <Chip label={label} color={color} sx={{borderRadius: 2}}></Chip>}
                    {isCancelled && <Chip label="cancelled" color="error"></Chip>}
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
                    Attendees go here.
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