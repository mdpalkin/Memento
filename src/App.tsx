import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn?', filter: 'active'},
        {id: todolistId2, title: 'What to buy?', filter: 'completed'}
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: false},
            {id: v1(), title: "React", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks,
            [todolistId]:  tasks[todolistId].filter(task =>
                task.id !== taskId)})
    }
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist =>
            todolist.id === todolistId ? {...todolist, filter} : todolist))
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, isDone: !task.isDone} : task)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        const tasksCopy = tasks
        delete tasksCopy[todolistId]
        setTasks(tasksCopy)
    }


    return (
        <div className={'App'}>
            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id]

                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                return <Todolist
                    key={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={todolist.filter}
                    todolistId={todolist.id}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    )
}

export type FilterValues = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}