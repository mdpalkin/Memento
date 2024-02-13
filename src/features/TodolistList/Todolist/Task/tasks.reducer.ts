import {AddTodolistType, RemoveTodolistType, SetTodolists} from "../todolists.reducer.ts";
import {TaskDomainType, tasksApi, TaskType, UpdateDomainTaskModelType} from "../../../../api/tasks-api.ts";
import {Dispatch} from "redux";
import {AppRootState} from "../../../../app/store.ts";
import {RequestStatusType, setAppStatus, SetAppStatusType} from "../../../../app/app.reducer.ts";
import {ResultCodes} from "../../../../api/instance.ts";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils.ts";

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
            return {
                ...state,
                [action.newTask.todoListId]: [{
                    ...action.newTask,
                    entityStatus: 'idle'
                }, ...state[action.newTask.todoListId]]
            }
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
            return {
                ...state, [action.todolistId]: action.tasks.map(task => ({...task, entityStatus: 'idle'}))
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId].map(task => task.id === action.task.id
                    ? {...action.task, entityStatus: 'idle'}
                    : task)
            }
        }
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, entityStatus: action.newStatus}
                    : task
                )
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

type ChangeTaskEntityStatus = ReturnType<typeof changeTaskEntityStatus>
export const changeTaskEntityStatus = (todolistId: string, taskId: string, newStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, newStatus
} as const)

// THUNKS

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch<TaskReducerActionType | SetAppStatusType>) => {
    dispatch(setAppStatus('loading'))
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasks(todolistId, res.data.items))
        dispatch(setAppStatus('succeeded'))
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'))
    tasksApi.removeTask(todolistId, taskId).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(removeTask(todolistId, taskId))
            dispatch(setAppStatus('succeeded'))
        } else {
           handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    tasksApi.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(addTask(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    }).catch(e => {
        handleServerNetworkError(e, dispatch)
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
            ...changes
        }

        tasksApi.updateTask(todolistId, taskId, apiModel).then(res => {
            if (res.data.resultCode === ResultCodes.OK ) {
                dispatch(updateTask(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
               handleServerAppError(res.data, dispatch)
            }
        }).catch(e => {
            handleServerNetworkError(e, dispatch)
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
    | ChangeTaskEntityStatus

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}