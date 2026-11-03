import {Box, Typography} from "@mui/material";
import ActivityCard from "./ActivityCard.tsx";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import { useInView } from "react-intersection-observer";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

const ActivityList = observer(function ActivityList() {
    const {activityGroup, isLoading, hasNextPage, fetchNextPage} = useActivities();
    const {inView, ref} = useInView({
        threshold: 0.5
    });

    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);
    
    if (!activityGroup || isLoading) return <Typography> Loading...</Typography>
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, mb: 3}}>
            {activityGroup.pages.map((activities, index) => (
                <Box 
                    key={index} 
                    ref={index === activityGroup.pages.length - 1 ? ref : null}
                    sx={{display:"flex", flexDirection:"column", gap:2}}
                >
                    {activities.items.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        ></ActivityCard>
                    ))}
                </Box>
            ))}
        </Box>
    );
});

export default ActivityList;
