import {v1} from "uuid";

import '@testing-library/jest-dom'
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    tasksReducer,
    TasksStateType
} from "../../state/tasks.reducer.ts";
import {TaskStatuses, TodoTaskPriority} from "../../api/tasks-api.ts";

let todolistId1: string, todolistId2: string, startState: TasksStateType
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.InProgress,
                todoListId: todolistId1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
            {
                id: v1(),
                title: "JavaScript",
                status: TaskStatuses.InProgress,
                todoListId: todolistId1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.InProgress,
                todoListId: todolistId1,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.InProgress,
                todoListId: todolistId2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
            {
                id: v1(),
                title: "Bread",
                status: TaskStatuses.InProgress,
                todoListId: todolistId2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
            {
                id: v1(),
                title: "Meat",
                status: TaskStatuses.InProgress,
                todoListId: todolistId2,
                startDate: "",
                addedDate: "",
                deadline: "",
                order: 0,
                priority: TodoTaskPriority.Hi,
                description: ""
            },
        ],
    }
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

        const newTaskStatus = TaskStatuses.Completed

        const endState = tasksReducer(startState, changeTaskStatus(todolistId2, startState[todolistId2][1].id, newTaskStatus))

        expect(endState[todolistId2][1].status).toBe(TaskStatuses.Completed)
        expect(endState[todolistId1][1].status).toBe(TaskStatuses.InProgress)
        expect(endState[todolistId2][1].title).toBe('Bread')

    })
})
