import {TodolistType} from "../api/todolists-api.ts";


const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType =
                {
                    id: action.todolistId,
                    title: action.title,
                    order: 0,
                    addedDate: '',
                    filter: 'all'
                }
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


export type TodolistReducerActionType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTododlists

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

type SetTododlists = ReturnType<typeof setTodolists>
export const setTodolists = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)


export type TodolistDomainType = TodolistType & { filter: FilterValues }

export type FilterValues = 'all' | 'active' | 'completed'
