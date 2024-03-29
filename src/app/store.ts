import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {appReducer} from "./app.reducer.ts";
import {authReducer} from "../pages/Login";
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,    
    app: appReducer,
    auth: authReducer
});

export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>;


export type DispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<DispatchType>()