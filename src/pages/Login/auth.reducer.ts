import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.ts";
import {setAppError, setAppStatus} from "../../app/app.reducer.ts";
import {clearState} from "../../features/TodolistList/Todolist/todolists.reducer.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi, LoginParamsType} from "../../shared/api/login-api.ts";
import {FieldErrorType, ResultCodes} from "../../shared/api/instance.ts";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: {errors: string[], fieldsErrors?: FieldErrorType[]}
}>('auth/login', async (data: LoginParamsType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await loginApi.login(data)
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsError})
        }
    } catch (err) {

        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await loginApi.logout()
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(clearState())
            dispatch(setAppStatus({status: "succeeded"}))
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
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
})

export const authReducer = slice.reducer

export const { setIsLoggedIn } = slice.actions



