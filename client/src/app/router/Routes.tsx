import {createBrowserRouter, Navigate} from "react-router";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/homePage.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityDetails from "../../features/activities/details/ActivityDetails.tsx";
import Counter from "../../features/counter.tsx";
import TestErrors from "../../features/errors/TestErrors.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        { path: '', element: <HomePage /> },
        { path: 'activities', element: <ActivityDashboard /> },
        { path: 'activities/:id', element: <ActivityDetails /> },
        { path: 'create', element: <ActivityForm key='create'/> },
        { path: 'update/:id', element: <ActivityForm /> },
        { path: 'counter', element: <Counter /> },
        { path: 'errors', element: <TestErrors /> },
        { path: 'not-found', element: <NotFound /> },
        { path: 'server-error', element: <ServerError /> },
        { path: '*', element: <Navigate replace to='/not-found' /> },
    ]
}])