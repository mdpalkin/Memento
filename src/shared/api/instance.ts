import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export type FieldErrorType =  {
    field: string
    error: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorType[]
    data: D
}

export enum ResultCodes {
    OK = 0,
    ERROR = 1
}