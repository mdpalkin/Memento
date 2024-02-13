import {SetAppErrorType, setAppStatus, SetAppStatusType, setAppError} from "../app/app.reducer.ts";
import {Dispatch} from "redux";
import {ResponseType} from "../api/instance.ts";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusType | SetAppErrorType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppStatusType | SetAppErrorType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred!' ))
    dispatch(setAppStatus('failed'))
}