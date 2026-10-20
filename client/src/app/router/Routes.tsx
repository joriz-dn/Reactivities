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
import LoginForm from "../../features/account/LoginForm.tsx";
import RequireAuth from "./RequireAuth.tsx";
import RegisterForm from "../../features/account/RegisterForm.tsx";
import ProfilePage from "../../features/profiles/ProfilePage.tsx";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        {element: <RequireAuth />, children: [
                { path: 'activities', element: <ActivityDashboard /> },
                { path: 'activities/:id', element: <ActivityDetails /> },
                { path: 'create', element: <ActivityForm key='create'/> },
                { path: 'update/:id', element: <ActivityForm /> },
                { path: 'profile/:id', element: <ProfilePage /> },
        ]},
        { path: '', element: <HomePage /> },
        { path: 'counter', element: <Counter /> },
        { path: 'errors', element: <TestErrors /> },
        { path: 'not-found', element: <NotFound /> },
        { path: 'server-error', element: <ServerError /> },
        { path: '*', element: <Navigate replace to='/not-found' /> },
        { path: 'login', element:  <LoginForm /> },
        { path: 'register', element:  <RegisterForm /> }
    ]
}])