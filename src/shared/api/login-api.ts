import {instance, ResponseType} from "./instance.ts";


export const loginApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<LoginInResponse>>('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/login')
    },
    authMe() {
        return instance.get<ResponseType<UserType>>('/auth/me')
    }
}

type LoginInResponse = {
    userId?: string
}

export type LoginParamsType =  {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export type UserType = {
    id: string,
    email: string,
    login: string
}