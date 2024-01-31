import {FilterValues} from "../App.tsx";

export const Todolist = (props: Props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Add</button>
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

type Props = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}