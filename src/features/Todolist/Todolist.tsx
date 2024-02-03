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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store.ts";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask} from "../../state/tasks.reducer.ts";
import {changeTodolistFilter, changeTodolistTitle, removeTodolist} from "../../state/todolists.reducer.ts";

export const Todolist = ({title, todolistId, filter}: Props) => {

    const tasks = useSelector((state: AppRootState) => state.tasks[todolistId])
    const dispatch = useDispatch()

    const addTaskHandler = (title: string) => {
        dispatch(addTask(todolistId, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilter(todolistId, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilter(todolistId, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilter(todolistId, 'completed'))

    const removeTodolistHandler = () => {
        dispatch(removeTodolist(todolistId))
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitle(todolistId, newTitle))
    }


    let tasksForTodolist: TaskType[] = tasks

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    return (
        <Card>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h3>
                        <EditableSpan
                            style={{'fontSize': '20px'}}
                            title={title}
                            onChange={changeTodolistTitleHandler} />
                    </h3>
                    <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={removeTodolistHandler}></Button>
                </div>
                <AddItemForm callback={addTaskHandler}/>
                <ul>
                    {tasksForTodolist.map(task => {

                        const onRemoveHandler = () => {
                            dispatch(removeTask(todolistId, task.id))
                        }

                        const onChangeStatusHandler = () => {
                            dispatch(changeTaskStatus(todolistId, task.id, !task.isDone))
                        }

                        const changeTaskTitleHandler = (newTitle: string) => {
                            dispatch(changeTaskTitle(todolistId, task.id, newTitle))
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
                    <Radio.Group value={filter}>
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
    filter: FilterValues
    todolistId: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}