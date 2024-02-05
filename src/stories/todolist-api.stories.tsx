import {useEffect, useState} from 'react'
import {todolistsApi, TodolistType} from "../api/todolists-api.ts";

export default {
    title: 'API/TodolistAPI',

}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])

    useEffect(() => {
        todolistsApi.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistsApi.createTodolist('New todolist').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = ''
        todolistsApi.removeTodolist(todolistId).then(() => {
            setState('Done.')
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = ''
        todolistsApi.updateTodolist(todolistId, 'Refreshed title').then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

