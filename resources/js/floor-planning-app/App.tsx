import React, {FC,} from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {UserContextProvider, useUserContext} from "./contexts/UserContext";
import {Layout} from "./pages/Layout";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Planner} from "./pages/Planner";
import {Projects} from "./pages/Projects";

type Props = {
    children?: React.ReactNode
};
const RequireAuth: FC<Props> = ({children}) => {
    const {isLoaded, user} = useUserContext()

    if (!isLoaded) {
        return <p>loading</p>
    }

    if (isLoaded && !user) {
        return <Navigate to="/login"/>
    }

    return children
}

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/planner/:project_id?",
                element:
                    <RequireAuth>
                        <Planner/>
                    </RequireAuth>
            },
            {
                path: "/projects",
                element:
                    <RequireAuth>
                        <Projects/>
                    </RequireAuth>
            }
        ]
    },
]);

export const App = () => {
    return <UserContextProvider>
        <RouterProvider router={router}/>
    </UserContextProvider>
}
