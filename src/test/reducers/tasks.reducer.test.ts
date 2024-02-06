import {v1} from "uuid";

import '@testing-library/jest-dom'
import {addTask, removeTask, tasksReducer, TasksStateType, updateTask} from "../../state/tasks.reducer.ts";
import {TaskStatuses, TodoTaskPriority} from "../../api/tasks-api.ts";

let todolistId1: string, todolistId2: string, startState: TasksStateType, taskId: string
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    taskId = v1()

    startState = {
        [todolistId1]: [
            {
                id: taskId,
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

        const newTask = {
            id: v1(),
            title: "New task!",
            status: TaskStatuses.InProgress,
            todoListId: todolistId1,
            startDate: "",
            addedDate: "",
            deadline: "",
            order: 0,
            priority: TodoTaskPriority.Hi,
            description: ""
        }

        const endState = tasksReducer(startState, addTask(newTask))

        expect(endState[todolistId1].length).toBe(4)
        expect(endState[todolistId1][0].title).toBe('New task!')
        expect(endState[todolistId2].length).toBe(3)

    })
})


test('task should be updated', () => {
    const updatedTask = {
        id: taskId,
        title: "HTML",
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TodoTaskPriority.Low,
        description: ""
    }


    const endState = tasksReducer(startState, updateTask(updatedTask))

    expect(endState[todolistId1][0].title).toBe('HTML')
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistId1][0].priority).toBe(TodoTaskPriority.Low)

})

