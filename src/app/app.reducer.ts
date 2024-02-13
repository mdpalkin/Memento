
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}



export const appReducer = (state = initialState, action: AppActionsType) => {
    switch (action.type) {
        case "SET-ERROR": {
            return {...state, error: action.error}
        }
        case "SET-STATUS": {
            return {...state, status: action.status}
        }
        default: {
            return state
        }
    }
}


export type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: string | null) => ({
    type: 'SET-ERROR',
    error
} as const)

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'SET-STATUS',
    status
} as const)

// TYPES

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = typeof initialState

type AppActionsType = SetAppErrorType | SetAppStatusType