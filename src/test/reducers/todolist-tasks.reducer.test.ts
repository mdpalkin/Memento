import {addTodolist, removeTodolist, TodolistDomainType, todolistsReducer} from "../../features/TodolistList/Todolist/todolists.reducer.ts";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "../../features/TodolistList/Todolist/Task/tasks.reducer.ts";
import {TodolistType} from "../../api/todolists-api.ts";

test('ids should be equals', () => {
    const startTodolistsState: TodolistDomainType[] = []
    const startTasksState: TasksStateType = {}

    const newTodolist = {
        id: v1(),
        title: 'What to learn?',
        order: 0,
        addedDate: '',
        filter: 'all'
    }

    const action = addTodolist(newTodolist)
    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)
    const endTodolistState: TodolistType[] = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(idFromTodolist)

})

test('task for deleted todolist should be deleted', () => {


    const startState: TasksStateType = {
        ['todolistId1']: []
    }

    const endState = tasksReducer(startState, removeTodolist('todolistId1'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(0)
    expect(endState['todolistId1']).toBeUndefined()

})
