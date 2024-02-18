import {setIsLoggedIn} from "../pages/Login/auth.reducer.ts";
import {loginApi} from "../shared/api/login-api.ts";
import {ResultCodes} from "../shared/api/instance.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils.ts";
import {AxiosError} from "axios";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}


export const initializeAppTC = createAsyncThunk('auth/initializeApp', async (_arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await loginApi.authMe()
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {

        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => builder
        .addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
})


export const appReducer = slice.reducer

export const {setAppError, setAppStatus} = slice.actions

// TYPES

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = typeof initialState
