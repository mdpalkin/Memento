import {todolistsApi, TodolistType} from "../../../api/todolists-api.ts";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus, SetAppStatusType, setError} from "../../../app/app.reducer.ts";
import {ResultCodes} from "../../../api/instance.ts";


const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
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
            return action.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle' }))
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

export const fetchTodolists = () => (dispatch: Dispatch<TodolistReducerActionType | SetAppStatusType>) => {
    dispatch(setAppStatus('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
            dispatch(setAppStatus('succeeded'))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.removeTodolist(todolistId).then(() => {
        dispatch(removeTodolist(todolistId))
    })
}

export const addTodolistTC = (title: string ) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then(res => {
        if (res.data.resultCode === ResultCodes.OK) {
            dispatch(addTodolist(res.data.data.item))
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

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    todolistsApi.updateTodolist(todolistId, title).then(() => {
        dispatch(changeTodolistTitle(todolistId, title))
    })
}

// TYPES

export type TodolistDomainType = TodolistType & { filter: FilterValues, entityStatus: RequestStatusType }

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistReducerActionType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolists

