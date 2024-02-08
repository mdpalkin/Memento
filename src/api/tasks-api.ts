import {ResponseType, instance} from "./instance.ts";
import {RequestStatusType} from "../app/app.reducer.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, model: UpdateDomainTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}



type GetTasksResponse = {
    items: TaskType[],
    totalCount: number
    error: string | null
}

export type UpdateDomainTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskDomainType = TaskType & {entityStatus: RequestStatusType}
