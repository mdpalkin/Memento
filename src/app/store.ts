import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import {tasksReducer} from "../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {appReducer} from "./app.reducer.ts";
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "../pages/Login/auth.reducer.ts";
import {useDispatch} from "react-redux";


const rootReducer: any = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppRootState = ReturnType<typeof rootReducer>;

export type StoreType = typeof store;

export const useAppDispatch = () => useDispatch<ThunkDispatch<StoreType, never, UnknownAction>>()