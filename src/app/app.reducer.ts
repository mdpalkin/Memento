import {Dispatch} from "redux";
import {setIsLoggedIn} from "../pages/Login/auth.reducer.ts";
import {loginApi} from "../shared/api/login-api.ts";
import {ResultCodes} from "../shared/api/instance.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{isAppInitialized: boolean}>) => {
            state.isInitialized = action.payload.isAppInitialized
        }
    }
})


export const appReducer = slice.reducer

export const {setAppError, setAppStatus, setAppInitialized} = slice.actions

// export const appReducer = (state = initialState, action: AppActionsType) => {
//     switch (action.type) {
//         case "SET-ERROR": {
//             return {...state, error: action.error}
//         }
//         case "SET-STATUS": {
//             return {...state, status: action.status}
//         }
//         case "SET-IS-INITIALIZED": {
//             return {...state, isInitialized: action.value}
//         }
//         default: {
//             return state
//         }
//     }
// }

//ACTIONS

// export type SetAppErrorType = ReturnType<typeof setAppError>
// export const setAppError = (error: string | null) => ({
//     type: 'SET-ERROR',
//     error
// } as const)

// export type SetAppStatusType = ReturnType<typeof setAppStatus>
// export const setAppStatus = (status: RequestStatusType) => ({
//     type: 'SET-STATUS',
//     status
// } as const)


// type SetAppInitialized = ReturnType<typeof setAppInitialized>
// export const setAppInitialized = (value: boolean) => ({
//     type: 'SET-IS-INITIALIZED',
//     value
// } as const)

// THUNKS

export const initializeAppTC = () => (dispatch: Dispatch) => {
    loginApi.authMe().then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
        dispatch(setAppInitialized({isAppInitialized: true}))
    })
}

// TYPES

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = typeof initialState
