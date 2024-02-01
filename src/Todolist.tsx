import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import './styles/styles.css'
export const Todolist = (props: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {

        const cutNewTaskTitle = newTaskTitle.trim()

        if (cutNewTaskTitle !== '') {
            props.addTask(props.todolistId, cutNewTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.todolistId,'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId,'completed')

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }
    return (
        <div>
            <h3 style={{display: 'inline'}}>{props.title}</h3><button onClick={removeTodolist}>x</button>
                <div>
                <input
                    onChange={onNewTitleChangeHandler}
                    value={newTaskTitle}
                    onKeyDown={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>Add</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(task => {

                    const onRemoveHandler = () => {
                        props.removeTask(props.todolistId, task.id)
                    }

                    const onChangeStatusHandler = () => { 
                        props.changeStatus(props.todolistId, task.id)
                    }

                    return <li key={task.id}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>})}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter': ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter': ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter': ''}>Completed</button>
            </div>
        </div>
    )
}

type Props = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValues
    todolistId: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}