import {ResponseType, instance} from "./instance.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType[]>>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, model: TaskUpdate) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type TaskUpdate = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}


type GetTasksResponse = {
    items: TaskType[],
    totalCount: number
    error: string | null
}