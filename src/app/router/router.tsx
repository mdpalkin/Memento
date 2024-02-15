import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "../../pages/Layout/AppLayout.tsx";
import {Login} from "../../pages/Login/Login.tsx";
import {TodolistsPage} from "../../pages/TodolistsPage/TodolistsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: '/todolists',
                element: <TodolistsPage/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]

    },
]);

export const Router = () => <RouterProvider router={router}/>