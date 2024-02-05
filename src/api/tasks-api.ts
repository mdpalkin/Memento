import {ResponseType, instance} from "./instance.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, changes: Partial<TaskType>) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, changes)
    }
}

export type TaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: Date
    deadline: Date
}

type GetTasksResponse = {
    items: TaskType[],
    totalCount: number
    error: string | null
}