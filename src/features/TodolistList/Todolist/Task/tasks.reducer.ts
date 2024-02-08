import {AddTodolistType, RemoveTodolistType, SetTodolists} from "../todolists.reducer.ts";
import {tasksApi, TaskType, UpdateDomainTaskModelType} from "../../../../api/tasks-api.ts";
import {Dispatch} from "redux";
import {AppRootState} from "../../../../app/store.ts";
import {setAppStatus, SetAppStatusType, setError} from "../../../../app/app.reducer.ts";
import {ResultCodes} from "../../../../api/instance.ts";

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
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]}
        }
        case
        "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case
        'REMOVE-TODOLIST': {
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
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId].map(task => task.id === action.task.id
                    ? {...action.task}
                    : task)
            }
        }
        default:
            return state
    }
}

// ACTIONS

type RemoveTaskType = ReturnType<typeof removeTask>
export const removeTask = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId, taskId
} as const)

type AddTaskType = ReturnType<typeof addTask>
export const addTask = (newTask: TaskType) => ({
    type: 'ADD-TASK', newTask
} as const)


type SetTasksType = ReturnType<typeof setTasks>
export const setTasks = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId, tasks
} as const)

type UpdateTaskType = ReturnType<typeof updateTask>
export const updateTask = (task: TaskType) => ({
    type: 'UPDATE-TASK',
    task
} as const)

// THUNKS

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch<TaskReducerActionType | SetAppStatusType>) => {
    dispatch(setAppStatus('loading'))
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasks(todolistId, res.data.items))
        dispatch(setAppStatus('succeeded'))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    tasksApi.removeTask(todolistId, taskId).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(removeTask(todolistId, taskId))
            dispatch(setAppStatus('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setError(res.data.messages[0]))
            } else {
                dispatch(setError('Some error occurred'))
            }
            dispatch(setAppStatus('failed'))
        }
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    tasksApi.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(addTask(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setError(res.data.messages[0]))
            } else {
                dispatch(setError('Some error occurred'))
            }
            dispatch(setAppStatus('failed'))
        }

    })
}

export const updateTaskTC = (todolistId: string, taskId: string, changes: Partial<UpdateDomainTaskModelType>) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {

    const task = getState().tasks[todolistId].find((task: TaskType) => task.id === taskId)

    dispatch(setAppStatus('loading'))

    const apiModel: UpdateDomainTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        status: task.status,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
         ...changes}

    tasksApi.updateTask(todolistId, taskId, apiModel).then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(updateTask(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setError(res.data.messages[0]))
            } else {
                dispatch(setError('Some error occurred'))
            }
            dispatch(setAppStatus('failed'))
        }
    })
}

// TYPES

export type TaskReducerActionType =
    RemoveTaskType
    | AddTaskType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolists
    | SetTasksType
    | UpdateTaskType

export type TasksStateType = {
    [key: string]: TaskType[]
}