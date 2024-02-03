import {TasksStateType} from "../App.tsx";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, todolistId1, todolistId2} from "./todolists.reducer.ts";

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Meat", isDone: false},
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
         case 'REMOVE-TASK': {
             return {...state, [action.todolistId]: state[action.todolistId].filter(task =>
                     task.id !== action.taskId) }
         }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId
                        ? {...task, title: action.newTitle}
                        : task)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, isDone: action.newStatus} : task)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState: TasksStateType = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}


export type TaskReducerActionType =
    RemoveTaskType
    |  AddTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistType
    | RemoveTodolistType

type RemoveTaskType = ReturnType<typeof removeTask>
export const removeTask = (todolistId: string,  taskId: string) => ({
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
export const changeTaskStatus= (todolistId: string, taskId: string, newStatus: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId, taskId, newStatus
} as const)