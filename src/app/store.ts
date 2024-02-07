import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {tasksReducer} from "../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {todolistsReducer} from "../features/TodolistList/Todolist/todolists.reducer.ts";


const rootReducer: any = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer>;

export type StoreType = typeof store;

// @ts-expect-error ???
window.store = store.getState()