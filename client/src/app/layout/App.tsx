import {useState} from "react";
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {useActivities} from "../../lib/hooks/useActivities.ts";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const {activities, isPending} = useActivities();
  
  const handleSelectActivity = (id: string) => {
      setSelectedActivity(activities!.find(x => x.id === id));
  };
  
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);  
  };
  
  const handleOpenForm = (id?: string) => {
      if(id) handleSelectActivity(id);
      else handleCancelSelectActivity();
      setEditMode(true);
  }
  
  const handleCloseForm = () => {
      setEditMode(false);
  }
  
  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
        <CssBaseline></CssBaseline>
      <NavBar openForm={handleOpenForm}></NavBar>
        <Container maxWidth="xl" sx={{marginTop: 3}}>
            {!activities || isPending ? (
                <Typography>
                    Loading...
                </Typography>
            ) : (
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    cancelActivity={handleCancelSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    openForm={handleOpenForm}
                    closeForm={handleCloseForm}
                />
            )}
        </Container>
    </Box>
  )
}

export default App
