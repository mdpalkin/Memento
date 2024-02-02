import {v1} from "uuid";
import {TodolistType} from "../../App.tsx";
import {todolistReducer} from "../todolist.reducer.ts";


let todolist1: string, todolist2: string, startState: TodolistType[]

beforeEach(() => {
    todolist1 = v1()
    todolist2 = v1()

    startState = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'},
    ]
})
test('correct todolist should be removed', () => {


    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolist1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)

})

test('demo', () => {
    expect(true).toBe(true)
})