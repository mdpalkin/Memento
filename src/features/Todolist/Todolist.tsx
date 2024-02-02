import {FilterValues} from "../../App.tsx";
import '../../styles/styles.css'
import {AddItemForm} from "../../components/AddItemForm/AddItemForm.tsx";
import {EditableSpan} from "../../components/EditableSpan.tsx";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {Button} from "antd"
import {DeleteOutlined} from "@ant-design/icons";
import s from './Todolist.module.css'
import Radio from "antd/lib/radio/index";
import Card from "antd/lib/card/Card";

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
        <Card>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h3>
                        <EditableSpan
                            style={{'fontSize': '20px'}}
                            title={props.title}
                            onChange={changeTodolistTitleHandler}
                        />
                    </h3>
                    <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={removeTodolist}></Button>
                </div>
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

                        return <li className={s.task} key={task.id}>
                            <div style={{display: 'flex', gap: '20px'}}>
                                <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                            </div>
                            <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={onRemoveHandler}></Button>

                        </li>
                    })}
                </ul>
                <div>
                    <Radio.Group value={props.filter}>
                        <Radio.Button onClick={onAllClickHandler} value="all">All</Radio.Button>
                        <Radio.Button onClick={onActiveClickHandler} value="active">Active</Radio.Button>
                        <Radio.Button onClick={onCompletedClickHandler} value="completed">Completed</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        </Card>
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