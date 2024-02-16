import {Dispatch} from "redux";
import {AppRootState} from "../../../../app/store.ts";
import {RequestStatusType, setAppError, setAppStatus} from "../../../../app/app.reducer.ts";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils.ts";
import {TaskDomainType, tasksApi, TaskType, UpdateDomainTaskModelType} from "../../../../shared/api/tasks-api.ts";
import {ResultCodes} from "../../../../shared/api/instance.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, clearState, removeTodolist, setTodolists} from "../todolists.reducer.ts";


const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ newTask: TaskType }>) => {
            state[action.payload.newTask.todoListId].unshift({...action.payload.newTask, entityStatus: 'idle'})
        },
        setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            action.payload.tasks.forEach(task => {
                state[action.payload.todolistId].push({...task, entityStatus: 'idle'})
            })
        },
        updateTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const index = state[action.payload.task.todoListId].findIndex(task => task.id === action.payload.task.id)
            state[action.payload.task.todoListId][index] = {...action.payload.task, entityStatus: 'idle'}
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            newStatus: RequestStatusType
        }>) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId][index].entityStatus = action.payload.newStatus
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearState, () => {
                return {}
            })
            .addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach(todolist => {
                    state[todolist.id] = []
                })
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
    }
})

export const tasksReducer = slice.reducer

export const {
    removeTask,
    changeTaskEntityStatus,
    addTask,
    updateTask,
    setTasks
} = slice.actions

// THUNKS

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasks({todolistId, tasks: res.data.items}))
        dispatch(setAppStatus({status: 'succeeded'}))
        dispatch(setAppError({error: null}))
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTaskEntityStatus({todolistId, taskId, newStatus: 'loading'}))
    tasksApi.removeTask(todolistId, taskId).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(removeTask({todolistId, taskId}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(e => {
        handleServerNetworkError(e, dispatch)
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    tasksApi.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(addTask({newTask: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
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

        dispatch(setAppStatus({status: 'loading'}))

        if (task) {
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
                if (res.data.resultCode === ResultCodes.OK) {
                    dispatch(updateTask({task: res.data.data.item}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                    dispatch(setAppError({error: null}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(e => {
                handleServerNetworkError(e, dispatch)
            })
        }

    }


export type TasksStateType = {
    [key: string]: TaskDomainType[]
}