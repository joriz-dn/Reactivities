import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

type Props = {
    activities: Activity[],
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    selectedActivity: Activity | undefined;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm : () => void;
}

export default function ActivityDashboard({activities, selectActivity, cancelActivity, selectedActivity, editMode, openForm, closeForm}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList  
                    activities={activities}
                    selectActivity={selectActivity}>
                </ActivityList>
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelActivity={cancelActivity}
                        openForm={openForm}
                    />}
                {editMode && <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity}
                />}
            </Grid>
        </Grid>
    );
}