import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {tasksReducer} from "./tasks.reducer.ts";
import {todolistsReducer} from "./todolists.reducer.ts";


const rootReducer: any = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer>;

export type StoreType = typeof store;

// @ts-expect-error ???
window.store = store.getState()