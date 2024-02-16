import {RequestStatusType, setAppError, setAppStatus} from "../../../../app/app.reducer.ts";
import {TaskDomainType, tasksApi, TaskType, UpdateDomainTaskModelType} from "../../../../shared/api/tasks-api.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, clearState, removeTodolist, setTodolists} from "../todolists.reducer.ts";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    const res = await tasksApi.getTasks(todolistId);
    dispatch(setAppStatus({status: 'succeeded'}));
    dispatch(setAppError({error: null}));
    return {todolistId, tasks: res.data.items};
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async ({todolistId, taskId}: {
    todolistId: string,
    taskId: string
}, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTaskEntityStatus({todolistId, taskId, newStatus: 'loading'}))
    await tasksApi.removeTask(todolistId, taskId);
    dispatch(setAppStatus({status: 'succeeded'}));
    dispatch(setAppError({error: null}));
    return {todolistId, taskId};
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async ({todolistId, title}: {
    todolistId: string,
    title: string
}, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    const res = await tasksApi.createTask(todolistId, title);
    dispatch(setAppStatus({status: 'succeeded'}));
    dispatch(setAppError({error: null}));
    return {newTask: res.data.data.item};
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async ({todolistId, taskId, changes}: {
    todolistId: string, taskId: string, changes: Partial<UpdateDomainTaskModelType>
}, thunkAPI) => {
    const {dispatch, getState} = thunkAPI
    const task = getState().tasks[todolistId].find((task: TaskType) => task.id === taskId)
    dispatch(setAppStatus({status: 'loading'}))
    const apiModel: UpdateDomainTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        status: task.status,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...changes
    }
    const res = await tasksApi.updateTask(todolistId, taskId, apiModel)
    dispatch(setAppStatus({status: 'succeeded'}))
    dispatch(setAppError({error: null}))
    return {task: res.data.data.item}
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
    }
})

export const tasksReducer = slice.reducer

export const {
    changeTaskEntityStatus,
} = slice.actions

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}