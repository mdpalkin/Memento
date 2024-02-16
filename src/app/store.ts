import {combineReducers, UnknownAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {tasksReducer} from "../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {appReducer} from "./app.reducer.ts";
import {authReducer} from "../pages/Login/auth.reducer.ts";
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

export type StoreType = typeof store;

export const useAppDispatch = () => useDispatch<ThunkDispatch<StoreType, never, UnknownAction>>()