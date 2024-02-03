import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks.reducer.ts";
import {todolistsReducer} from "./todolists.reducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const store = legacy_createStore(rootReducer)

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-expect-error ???
window.store = store.getState()