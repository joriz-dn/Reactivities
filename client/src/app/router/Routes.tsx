import {createBrowserRouter} from "react-router";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/homePage.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityDetails from "../../features/activities/details/ActivityDetails.tsx";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        { path: '', element: <HomePage /> },
        { path: 'activities', element: <ActivityDashboard /> },
        { path: 'activities/:id', element: <ActivityDetails /> },
        { path: 'create', element: <ActivityForm key='create'/> },
        { path: 'update/:id', element: <ActivityForm /> },
    ]
}])