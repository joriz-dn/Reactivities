import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import * as React from "react";

type Props = {
    activity?: Activity;
    closeForm?: () => void;
    submitForm: (activity: Activity) => void;
}

export default function ActivityForm({activity, closeForm, submitForm}: Props) {
    
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data: {[key: string]: FormDataEntryValue} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        })
        
        if (activity){
            data.id = activity.id;
        }
        
        submitForm(data as unknown as Activity);
    }
    
    return (
        <Paper sx={{padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box onSubmit={handleSubmit} component="form" sx={{display: "flex", flexDirection: "column", gap: 3}}>
                <TextField name="title" label='Title' defaultValue={activity?.title}></TextField>
                <TextField name="description" label='Description' defaultValue={activity?.description} multiline rows={3}></TextField>
                <TextField name="category" label='Category' defaultValue={activity?.category}></TextField>
                <TextField name="date" label='Date' type="date" defaultValue={activity?.date}></TextField>
                <TextField name="city" label='City' defaultValue={activity?.city}></TextField>
                <TextField name="venue" label='Venue' defaultValue={activity?.venue}></TextField>
                <Box sx={{display: "flex", justifyContent: "end", gap: 3}}>
                    <Button color='inherit' onClick={closeForm}>Cancel</Button>
                    <Button color='success' variant='contained' type="submit">Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}
