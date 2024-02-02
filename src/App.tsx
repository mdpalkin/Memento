import './styles/styles.css'
import {TaskType, Todolist} from "./features/Todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm.tsx";
import Layout, {Header} from "antd/lib/layout/layout";
import {GiBrainstorm} from "react-icons/gi";
import {Typography} from "antd";

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn?', filter: 'all'},
        {id: todolistId2, title: 'What to buy?', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task =>
                task.id !== taskId)
        })
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
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, isDone: !task.isDone} : task)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        const tasksCopy = tasks
        delete tasksCopy[todolistId]
        setTasks(tasksCopy)
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})

    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId
                    ? {...task, title: newTitle}
                    : task)
        })
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(todolist =>
            todolist.id === todolistId
                ? {...todolist, title: newTitle}
                : todolist))
    }


    return (
        <Layout>
            <Layout>
                <Header style={{display: 'flex', alignItems: 'center', minHeight: '7vh'}}>
                    <div className={'logo'}>
                        <GiBrainstorm size={40} color={'white'} />
                        <Typography.Title style={{color: 'white', fontSize: '20px'}}>Brain storm</Typography.Title>
                    </div>
                </Header>
            </Layout>
            <Layout className={'App'} style={{minHeight: '93vh'}}>
                    <AddItemForm callback={addTodolist}/>
                <div className={'todolists'}>
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
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    })}
                </div>
            </Layout>
        </Layout>
    )
}

export type FilterValues = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

type TasksStateType = {
    [key: string]: TaskType[]
}