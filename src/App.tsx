import './App.css'
import {Todolist} from "./components/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export const App = () => {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])

    const [filter, setFilter] = useState('all')

    let tasksForTodolist = tasks

    if (filter === 'completed') {
       tasksForTodolist = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
      tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    return (
        <div>
            <Todolist
                title={'What to learn?'}
                tasks={tasksForTodolist}
                changeFilter={changeFilter}
                removeTask={removeTask}/>
        </div>
    )
}

export type FilterValues = 'all' | 'active' | 'completed'

