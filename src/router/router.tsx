import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {TodolistList} from "../features/TodolistList/TodolistList.tsx";
import {AppLayout} from "../pages/Layout/AppLayout.tsx";
import {Login} from "../pages/Login/Login.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: '/todolists',
                element: <TodolistList />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]

    },
]);

export const Router = () => <RouterProvider router={router} />