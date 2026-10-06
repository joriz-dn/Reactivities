import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    activity: Activity,
    cancelActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activity, cancelActivity, openForm} : Props) {
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
                <Button color="primary" onClick={() => openForm(activity.id)}>Edit</Button>
                <Button color="inherit" onClick={cancelActivity}>Cancel</Button>
            </CardActions>
        </Card>
    );
}