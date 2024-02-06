import {v1} from "uuid";
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist, setTodolists, TodolistDomainType,
    todolistsReducer
} from "../../state/todolists.reducer.ts";

import '@testing-library/jest-dom'

let todolistId1: string, todolistId2: string, startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {
            id: todolistId1,
            title: 'What to learn?',
            order: 0,
            addedDate: '',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'What to buy?',
            order: 0,
            addedDate: '',
            filter: 'all'
        }
    ]
})

describe('Todolist reducer test', () => {
    test('correct todolist should be removed', () => {


        const endState = todolistsReducer(startState, removeTodolist(todolistId1))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistId2)

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

        const endState = todolistsReducer(startState, changeTodolistTitle(todolistId2, newTodolistTitle))

        expect(endState.length).toBe(2)
        expect(endState[1].title).toBe(newTodolistTitle)
        expect(endState[0].title).toBe('What to learn?')

    })

    test('todolist should changed its filter', () => {

        const newTodolistFilter = 'active'

        const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newTodolistFilter))

        expect(endState.length).toBe(2)
        expect(endState[1].filter).toBe(newTodolistFilter)
        expect(endState[0].filter).toBe('all')

    })

    test('todolist should be set to the state', () => {


        const todolists = [
            {
                id: todolistId1,
                title: 'What to learn?',
                order: 0,
                addedDate: '',
            },
            {
                id: todolistId2,
                title: 'What to buy?',
                order: 0,
                addedDate: '',
            }
        ]

        const endState = todolistsReducer([], setTodolists(todolists))

        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('all')

    })
})
