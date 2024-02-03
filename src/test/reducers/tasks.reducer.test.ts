import {v1} from "uuid";
import {TasksStateType} from "../../App.tsx";

import '@testing-library/jest-dom'
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from "../../state/tasks.reducer.ts";

let todolistId1: string, todolistId2: string, startState: TasksStateType
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: false},
            {id: v1(), title: "React", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
        ]}
})

describe('Todolists reducer tets', () => {
    test('correct task should be removed', () => {


        const endState = tasksReducer(startState, removeTask(todolistId1, startState[todolistId1][0].id))

        expect(endState[todolistId1].length).toBe(2)
        expect(endState[todolistId2].length).toBe(3)

    })
    test('task should be added', () => {

        const newTaskTitle = 'New task!'

        const endState = tasksReducer(startState, addTask(todolistId1, newTaskTitle))

        expect(endState[todolistId1].length).toBe(4)
        expect(endState[todolistId1][0].title).toBe(newTaskTitle)
        expect(endState[todolistId2].length).toBe(3)

    })

    test('task should changed its name', () => {

        const newTaskTitle = 'New task title!'

        const endState = tasksReducer(startState, changeTaskTitle(todolistId2, startState[todolistId2][2].id, newTaskTitle))

        expect(endState[todolistId2][2].title).toBe(newTaskTitle)
        expect(endState[todolistId2][1].title).toBe('Bread')
        expect(endState[todolistId1][2].title).toBe('React')

    })

    test('todolist should changed its status', () => {

        const newTaskStatus = true

        const endState = tasksReducer(startState, changeTaskStatus(todolistId2, startState[todolistId2][1].id, newTaskStatus))

        expect(endState[todolistId2][1].isDone).toBeTruthy()
        expect(endState[todolistId1][1].isDone).toBeFalsy()
        expect(endState[todolistId2][1].title).toBe('Bread')

    })
})
