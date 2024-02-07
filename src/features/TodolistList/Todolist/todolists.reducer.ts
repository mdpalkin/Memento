import {todolistsApi, TodolistType} from "../../../api/todolists-api.ts";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist =>
                todolist.id === action.id ? {...todolist, title: action.newTitle} : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist =>
                todolist.id === action.id ? {...todolist, filter: action.newFilter} : todolist)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({...todolist, filter: 'all' }))
        }
        default:
            return state

    }
}

// ACTIONS

type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilter>
export const changeTodolistFilter = (id: string, newFilter: FilterValues) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    newFilter
} as const)

export type RemoveTodolistType = ReturnType<typeof removeTodolist>
export const removeTodolist = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
} as const)

export type AddTodolistType = ReturnType<typeof addTodolist>
export const addTodolist = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export const changeTodolistTitle = (id: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    newTitle
} as const)


export type SetTodolists = ReturnType<typeof setTodolists>
export const setTodolists = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)


// THUNKS

export const fetchTodolists = () => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.removeTodolist(todolistId).then(() => {
        dispatch(removeTodolist(todolistId))
    })
}

export const addTodolistTC = (title: string ) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.createTodolist(title).then(res => {
        dispatch(addTodolist(res.data.data.item))
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.updateTodolist(todolistId, title).then(() => {
        dispatch(changeTodolistTitle(todolistId, title))
    })
}

// TYPES

export type TodolistDomainType = TodolistType & { filter: FilterValues }

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistReducerActionType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolists
