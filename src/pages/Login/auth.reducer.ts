import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.ts";
import {setAppError, setAppStatus} from "../../app/app.reducer.ts";
import {clearState} from "../../features/TodolistList/Todolist/todolists.reducer.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi, LoginParamsType} from "../../shared/api/login-api.ts";
import {FieldErrorType, ResultCodes} from "../../shared/api/instance.ts";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
    rejectValue: {errors: string[], fieldsErrors?: FieldErrorType[]}
}>('auth/login', async (data: LoginParamsType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await loginApi.login(data)
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
            return {isLoggedIn: true}
        } else {
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsError})
        }
    } catch (err) {

        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
})

export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions




export const logoutTC = () => (dispatch: Dispatch) => {
    loginApi.logout().then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearState())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

