import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";


export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn?', filter: 'all'},
    {id: todolistId2, title: 'What to buy?', filter: 'all'}
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistReducerActionType): TodolistType[] => {
    switch (action.type) {
         case 'REMOVE-TODOLIST': {
             return state.filter(todolist => todolist.id !== action.todolistId)
         }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist =>
                todolist.id === action.id ? {...todolist, title: action.newTitle} : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist =>
                todolist.id === action.id ? {...todolist, filter: action.newFilter} : todolist)
        }
        default:
            return state
    }
}


export type TodolistReducerActionType = RemoveTodolistType |  AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolist>
export const removeTodolist = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
} as const)

export type AddTodolistType = ReturnType<typeof addTodolist>
export const addTodolist = (todolistId: string, title: string) => ({
    type: 'ADD-TODOLIST',
    todolistId,
    title
} as const)

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export const changeTodolistTitle = (id: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    newTitle
} as const)

type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilter>
export const changeTodolistFilter = (id: string, newFilter: FilterValues) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    newFilter
} as const)