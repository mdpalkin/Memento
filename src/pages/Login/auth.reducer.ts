import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.ts";
import {setAppError, setAppStatus} from "../../app/app.reducer.ts";
import {clearState} from "../../features/TodolistList/Todolist/todolists.reducer.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginApi, LoginParamsType} from "../../shared/api/login-api.ts";
import {ResultCodes} from "../../shared/api/instance.ts";


const initialState = {
    isLoggedIn: false,
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer

export const { setIsLoggedIn} = slice.actions




export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    loginApi.login(data).then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppError({error: null}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

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

