import {RequestStatusType, setAppError, setAppStatus} from "../../../app/app.reducer.ts";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils.ts";
import {todolistsApi, TodolistType} from "../../../shared/api/todolists-api.ts";
import {ResultCodes} from "../../../shared/api/instance.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {fetchTasks} from "./Task/tasks.reducer.ts";


const initialState: TodolistDomainType[] = []

export const fetchTodolists = createAsyncThunk('todolists/fetchTasks', async (_arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsApi.getTodolists();
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch(setAppError({error: null}));
        const todolists = res.data
        todolists.forEach( todolist => {
                dispatch(fetchTasks(todolist.id))
        })
        return {todolists}
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)

    }
})


export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async ({todolistId}: {
    todolistId: string,
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({todolistId, status: 'loading'}))
    try {
        const res = await todolistsApi.removeTodolist(todolistId);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}));
            dispatch(setAppError({error: null}));
            dispatch(changeTodolistEntityStatus({todolistId, status: 'succeeded'}))
            return {todolistId};
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async ({title}: {
    title: string,
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))

            return {todolist: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async ({title, todolistId}: {
    title: string, todolistId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsApi.updateTodolist(todolistId, title);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
            return {todolistId, title};
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValues }>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            status: RequestStatusType
        }>) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
        clearState: () => {
            return []
        },
    },
    extraReducers: builder => builder
        .addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state.splice(index, 1)
        })
        .addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
        .addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(todolist => state.push({...todolist, filter: 'all', entityStatus: 'idle'}))
        })
})

export const todolistsReducer = slice.reducer

export const {
    changeTodolistEntityStatus,
    changeTodolistFilter,
    clearState
} = slice.actions

// THUNKS

// export const fetchTodolists = () => (dispatch: ThunkDispatch<StoreType, never, UnknownAction>) => {
//     dispatch(setAppStatus({status: 'loading'}))
//     todolistsApi.getTodolists()
//         .then(res => {
//             dispatch(setTodolists({todolists: res.data}))
//             dispatch(setAppStatus({status: 'succeeded'}))
//             dispatch(setAppError({error: null}))
//             return res.data
//         })
//         .then(todolists => {
//             todolists.forEach((todolist) =>
//                 dispatch(fetchTasks(todolist.id))
//             )
//         })
//         .catch(e => {
//             handleServerNetworkError(e, dispatch)
//         })
// }

// TYPES

export type TodolistDomainType = TodolistType & { filter: FilterValues, entityStatus: RequestStatusType }

export type FilterValues = 'all' | 'active' | 'completed'