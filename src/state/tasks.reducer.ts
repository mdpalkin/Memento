import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, SetTodolists} from "./todolists.reducer.ts";
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriority} from "../api/tasks-api.ts";
import {Dispatch} from "redux";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(task =>
                    task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.InProgress,
                todoListId: action.todolistId,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case
        'CHANGE-TASK-TITLE'
        : {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId
                        ? {...task, title: action.newTitle}
                        : task)
            }
        }
        case
        'CHANGE-TASK-STATUS'
        : {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, status: action.newStatus} : task)
            }
        }
        case
        "ADD-TODOLIST"
        : {
            return {...state, [action.todolistId]: []}
        }
        case
        'REMOVE-TODOLIST'
        : {
            const copyState: TasksStateType = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(todolist => {
                copyState[todolist.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}


export type TaskReducerActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolists
    | SetTasksType

type RemoveTaskType = ReturnType<typeof removeTask>
export const removeTask = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId, taskId
} as const)

type AddTaskType = ReturnType<typeof addTask>
export const addTask = (todolistId: string, title: string) => ({
    type: 'ADD-TASK',
    todolistId, title
} as const)

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>
export const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId, taskId, newTitle
} as const)

type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>
export const changeTaskStatus = (todolistId: string, taskId: string, newStatus: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId, taskId, newStatus
} as const)

type SetTasksType = ReturnType<typeof setTasks>
export const setTasks = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId, tasks
} as const)

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasks(todolistId, res.data.items))
    })
}

export type TasksStateType = {
    [key: string]: TaskType[]
}