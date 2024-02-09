import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {tasksReducer} from "../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {appReducer} from "./app.reducer.ts";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer: any = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppRootState = ReturnType<typeof rootReducer>;

export type StoreType = typeof store;

// @ts-expect-error ???
window.store = store.getState()