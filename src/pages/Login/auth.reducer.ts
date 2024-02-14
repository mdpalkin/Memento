import {loginApi, LoginParamsType} from "../../api/login-api.ts";
import {Dispatch} from "redux";
import {ResultCodes} from "../../api/instance.ts";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.ts";
import {setAppStatus} from "../../app/app.reducer.ts";


const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state = initialState, action: LoginReducerActionTypes): authReducerStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default: {
            return state
        }
    }
}

type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'SET-IS-LOGGED-IN',
    isLoggedIn
} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    loginApi.login(data).then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

// TYPES

type authReducerStateType = typeof initialState

export type LoginReducerActionTypes = SetIsLoggedInType