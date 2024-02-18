import {v1} from "uuid";
import {
    addTodolistTC, changeTodolistEntityStatus, changeTodolistFilter, changeTodolistTitleTC, fetchTodolists,
    removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from "../../features/TodolistList/Todolist/todolists.reducer.ts";

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
            filter: 'all',
            entityStatus: "idle"
        },
        {
            id: todolistId2,
            title: 'What to buy?',
            order: 0,
            addedDate: '',
            filter: 'all',
            entityStatus: 'idle'
        }
    ]
})

describe('Todolist reducer test', () => {
    test('correct todolist should be removed', () => {


        const action = {todolistId: todolistId1}

        const endState = todolistsReducer(startState, removeTodolistTC.fulfilled(action, 'requestId', action))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistId2)

    })
    test('todolist should be added', () => {

        const newTodolist = {
            id: v1(),
            title: 'New todolist!',
            order: 0,
            addedDate: '',
            filter: 'all',
            entityStatus: 'idle'
        }

        const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist: newTodolist}, 'requestId', newTodolist))

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe('New todolist!')
        expect(endState[0].filter).toBe('all')

    })

    test('todolist should changed its name', () => {

        const newTodolistTitle = 'New todolist!'

        const action = {todolistId: todolistId2, title: newTodolistTitle}

        const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled(action, 'requestId', action))

        expect(endState.length).toBe(2)
        expect(endState[1].title).toBe(newTodolistTitle)
        expect(endState[0].title).toBe('What to learn?')

    })

    test('todolist should changed its filter', () => {

        const newTodolistFilter = 'active'

        const endState = todolistsReducer(startState, changeTodolistFilter({todolistId: todolistId2,  filter: newTodolistFilter}))

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

        const endState = todolistsReducer([], fetchTodolists.fulfilled({todolists}, 'requestId'))

        expect(endState.length).toBe(2)
        expect(endState[0].filter).toBe('all')

    })

    test('todolists entity status should be changed', () => {


        const newTodolistEntityStatus = 'loading'

        const endState = todolistsReducer(startState, changeTodolistEntityStatus({todolistId: todolistId2, status: newTodolistEntityStatus}))

        expect(endState.length).toBe(2)
        expect(endState[1].entityStatus).toBe(newTodolistEntityStatus)
        expect(endState[0].entityStatus).toBe('idle')
    })

})
