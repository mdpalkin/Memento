import {TodolistType} from "../App.tsx";

export const todolistReducer = (state: TodolistType[], action: any) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
                return state.filter(todolist => todolist.id !== action.id)

        default:
            return state
    }
}

export const removeTodolist = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
})