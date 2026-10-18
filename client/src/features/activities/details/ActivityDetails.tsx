import {Grid, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import ActivityDetailsHeader from "./ActivityDetailsHeader.tsx";
import ActivityDetailsInfo from "./ActivityDetailsInfo.tsx";
import ActivityDetailsChat from "./ActivityDetailsChat.tsx";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar.tsx";
import {useParams} from "react-router";

export default function ActivityDetails() {
    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);
    
    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity Not Found</Typography>
    
    return (
       <Grid container spacing={3}>
           <Grid size={8}>
               <ActivityDetailsHeader activity={activity}></ActivityDetailsHeader>
               <ActivityDetailsInfo activity={activity}></ActivityDetailsInfo>
               <ActivityDetailsChat></ActivityDetailsChat>
           </Grid>
           <Grid size={4}>
               <ActivityDetailsSidebar activity={activity}></ActivityDetailsSidebar>
           </Grid>
       </Grid>
    );
}