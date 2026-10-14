import {Box, Button, Paper, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import SelectInput from "../../../app/shared/components/selectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/components/dateTimeInput.tsx";
import LocationInput from "../../../app/shared/components/LocationInput.tsx";

export default function ActivityForm() {
    const navigate = useNavigate();
    const {control, reset, handleSubmit} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const {id} = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    
    useEffect(() => {
        if(activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue : activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude,
            }
        });
    }, [activity, reset]);
    
    const onSubmit = async (data: ActivitySchema) => {
       console.log("Form Data", data);
       const {location, ...rest} = data;
       const flattenedData = {...rest, ...location};
       try {
           if (activity){
               updateActivity.mutate({...activity, ...flattenedData}, {
                   onSuccess: () => navigate(`/activities/${activity.id}`)
               });
           } else {
               createActivity.mutate(flattenedData as Activity, {
                   onSuccess: (id) => navigate(`/activities/${id}`)
               })
           }
       } catch (error) {
           console.error(error);
       }
    }
    
    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    
    return (
        <Paper sx={{padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{display: "flex", flexDirection: "column", gap: 3}}>
                <TextInput label="Title" control={control} name="title" />
                <TextInput label="Description" control={control} name="description" multiline rows={3} />
                <Box sx={{display: "flex", gap: 3}}>
                    <SelectInput items={categoryOptions} label="Category" control={control} name="category" />
                    <DateTimeInput label="Date" control={control} name="date" />
                </Box>
                <LocationInput label="Location" control={control} name="location" />
                
                <Box sx={{display: "flex", justifyContent: "end", gap: 3}}>
                    <Button color='inherit'>Cancel</Button>
                    <Button 
                        color='success' 
                        variant='contained' 
                        type="submit"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}
