import './App.css'
import {TaskType, Todolist} from "./components/Todolist.tsx";

export const App = () => {

    const tasks1: TaskType[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JavaScript", isDone: true},
        {id: 3, title: "React", isDone: true},
    ]

    const tasks2: TaskType[] = [
        {id: 1, title: "Milk", isDone: true},
        {id: 2, title: "Bread", isDone: false},
        {id: 3, title: "Meat", isDone: false},
    ]


    return (
        <div>
            <Todolist title={'What to learn?'} tasks={tasks1}/>
            <Todolist title={'What to buy?'} tasks={tasks2}/>
        </div>
    )
}

