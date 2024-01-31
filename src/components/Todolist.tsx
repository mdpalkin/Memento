import {FilterValues} from "../App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export const Todolist = (props: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === 'Enter') addTask()

    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onNewTitleChangeHandler}
                    value={newTaskTitle}
                    onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {props.tasks.map(task => {

                    const onRemoveHandler = () => {
                        props.removeTask(task.id)
                    }

                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>})}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

type Props = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}