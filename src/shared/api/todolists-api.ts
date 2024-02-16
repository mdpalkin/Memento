import {instance, ResponseType} from "./instance.ts";

export const todolistsApi = {

    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
    },

    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title})
    }
}


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}