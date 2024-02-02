import {FilterValues} from "./App.tsx";
import './styles/styles.css'
import {AddItemForm} from "./components/AddItemForm.tsx";
import {EditableSpan} from "./components/EditableSpan.tsx";

export const Todolist = (props: Props) => {
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed')

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }
    return (
        <div>
            <h3 style={{display: 'inline'}}>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodolistTitleHandler}
                />
            </h3>
            <button onClick={removeTodolist}>x</button>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {props.tasks.map(task => {

                    const onRemoveHandler = () => {
                        props.removeTask(props.todolistId, task.id)
                    }

                    const onChangeStatusHandler = () => {
                        props.changeStatus(props.todolistId, task.id)
                    }

                    const changeTaskTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, task.id, newTitle)
                    }

                    return <li key={task.id}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={task.isDone}/>
                        <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
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
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValues
    todolistId: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}