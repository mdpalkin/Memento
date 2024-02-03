import {v1} from "uuid";
import {TodolistType} from "../../App.tsx";
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistsReducer
} from "../../state/todolists.reducer.ts";

import '@testing-library/jest-dom'

let todolist1: string, todolist2: string, startState: TodolistType[]

beforeEach(() => {
    todolist1 = v1()
    todolist2 = v1()

    startState = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'},
    ]
})

describe('Tasks reducer test', () => {
    test('correct todolist should be removed', () => {


        const endState = todolistsReducer(startState, removeTodolist(todolist1))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolist2)

    })
    test('todolist should be added', () => {

        const newTodolistTitle = 'New todolist!'
        const newTodolistId = v1()

        const endState = todolistsReducer(startState, addTodolist(newTodolistId, newTodolistTitle))

        expect(endState.length).toBe(3)
        expect(endState[2].title).toBe(newTodolistTitle)
        expect(endState[2].filter).toBe('all')

    })

    test('todolist should changed its name', () => {

        const newTodolistTitle = 'New todolist!'

        const endState = todolistsReducer(startState, changeTodolistTitle(todolist2, newTodolistTitle))

        expect(endState.length).toBe(2)
        expect(endState[1].title).toBe(newTodolistTitle)
        expect(endState[0].title).toBe('What to learn')

    })

    test('todolist should changed its filter', () => {

        const newTodolistFilter = 'active'

        const endState = todolistsReducer(startState, changeTodolistFilter(todolist2, newTodolistFilter))

        expect(endState.length).toBe(2)
        expect(endState[1].filter).toBe(newTodolistFilter)
        expect(endState[0].filter).toBe('all')

    })
})
