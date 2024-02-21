import {RequestStatusType, setAppError, setAppStatus} from "../../../../app";
import {TaskDomainType, tasksApi, TaskType, UpdateDomainTaskModelType} from "../../../../shared/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, clearState, fetchTodolists, removeTodolistTC} from "../todolists.reducer.ts";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils.ts";
import {AxiosError} from "axios";
import {ResultCodes} from "../../../../shared/api/instance.ts";
import {AppRootState} from "../../../../app";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await tasksApi.getTasks(todolistId);
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch(setAppError({error: null}));
        return {todolistId, tasks: res.data.items};
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)

    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async ({todolistId, taskId}: {
    todolistId: string,
    taskId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTaskEntityStatus({todolistId, taskId, newStatus: 'loading'}))
    try {
        const res = await tasksApi.removeTask(todolistId, taskId);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}));
            dispatch(setAppError({error: null}));
            return {todolistId, taskId};
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async ({todolistId, title}: {
    todolistId: string,
    title: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await tasksApi.createTask(todolistId, title);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}));
            dispatch(setAppError({error: null}));
            return {newTask: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async ({todolistId, taskId, changes}: {
        todolistId: string, taskId: string, changes: Partial<UpdateDomainTaskModelType>
    }, thunkAPI) => {

        const {dispatch, getState, rejectWithValue} = thunkAPI

        const state = getState() as AppRootState

        const task = state.tasks[todolistId].find((task: TaskType) => task.id === taskId)
        dispatch(setAppStatus({status: 'loading'}))

        if (!task) {
            return rejectWithValue('task not found')
        }

        const apiModel: UpdateDomainTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            status: task.status,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            ...changes
        }
        try {
            const res = await tasksApi.updateTask(todolistId, taskId, apiModel)
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
            return {task: res.data.data.item}
        } catch (err) {
            const error = err as AxiosError

            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })


export const changeTaskOrder = createAsyncThunk('tasks/changeTaskOrder', async ({todolistId, taskId, putAfterItemId}: {
    todolistId: string, taskId: string, putAfterItemId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await tasksApi.reorderTask(todolistId, taskId, putAfterItemId);
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppError({error: null}))
            return {todolistId, taskId, putAfterItemId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError

        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
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
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(todolist => {
                    state[todolist.id] = []
                })
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                action.payload.tasks.forEach(task => {
                    state[action.payload.todolistId].push({...task, entityStatus: 'idle'})
                })
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
                state[action.payload.todolistId].splice(index, 1)
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.newTask.todoListId].unshift({...action.payload.newTask, entityStatus: 'idle'})
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.task.todoListId].findIndex(task => task.id === action.payload.task.id)
                state[action.payload.task.todoListId][index] = {...action.payload.task, entityStatus: 'idle'}
            })
            .addCase(changeTaskOrder.fulfilled, (state, action) => {
                const indexOne = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
                const taskOne = state[action.payload.todolistId][indexOne]
                const orderOne = taskOne.order
                const indexTwo = state[action.payload.todolistId].findIndex(task => task.id === action.payload.putAfterItemId)
                const taskTwo = state[action.payload.todolistId][indexTwo]
                const orderTwo = taskTwo.order
                taskOne.order = orderTwo
                taskTwo.order = orderOne

            })
    }
})

export const tasksReducer = slice.reducer

export const {
    changeTaskEntityStatus,
} = slice.actions

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}