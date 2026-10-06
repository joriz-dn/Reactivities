import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

export default function ActivityDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);
    
    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity Not Found</Typography>
    
    return (
        <Card sx={{borderRadius: 3}}>
            <CardMedia
                component="img"
                src={`/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1">{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} color="primary" to={`/update/${activity.id}`}>Edit</Button>
                <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
            </CardActions>
        </Card>
    );
}