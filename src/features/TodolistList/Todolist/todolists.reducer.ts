import {Dispatch, UnknownAction} from "redux";
import {RequestStatusType, setAppError, setAppStatus} from "../../../app/app.reducer.ts";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils.ts";
import {fetchTasks} from "./Task/tasks.reducer.ts";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../../app/store.ts";
import {todolistsApi, TodolistType} from "../../../shared/api/todolists-api.ts";
import {ResultCodes} from "../../../shared/api/instance.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistDomainType[] = []


const slice =  createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
             state.splice(index, 1)
        },
        addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterValues}>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        setTodolists: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
            action.payload.todolists.forEach(todolist => state.push({...todolist, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
        clearState: () => {
            return []
        },
    }
})

export const todolistsReducer = slice.reducer

export const {
    setTodolists,
    changeTodolistEntityStatus,
    changeTodolistTitle,
    changeTodolistFilter,
    addTodolist,
    removeTodolist,
    clearState
} = slice.actions

// THUNKS

export const fetchTodolists = () => (dispatch: ThunkDispatch<StoreType, never, UnknownAction>) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists({todolists: res.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
            return res.data
        })
        .then(todolists => {
            todolists.forEach( (todolist) =>
                dispatch(fetchTasks(todolist.id))
            )
        })
        .catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({todolistId,status: 'loading'}))
    todolistsApi.removeTodolist(todolistId).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(removeTodolist({todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistsApi.createTodolist(title).then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            debugger
            dispatch(addTodolist({todolist: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistsApi.updateTodolist(todolistId, title).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(changeTodolistTitle({todolistId, title}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

// TYPES

export type TodolistDomainType = TodolistType & { filter: FilterValues, entityStatus: RequestStatusType }

export type FilterValues = 'all' | 'active' | 'completed'