import {changeTaskStatus, changeTaskTitle, removeTask} from "../state/tasks.reducer.ts";
import s from "./Todolist/Todolist.module.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {EditableSpan} from "../components/EditableSpan.tsx";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {TaskStatuses, TaskType} from "../api/tasks-api.ts";

export const Task = ({todolistId, task}: Props) => {

    const dispatch = useDispatch()
    const onRemoveHandler =  useCallback(() => {
        dispatch(removeTask(todolistId, task.id))
    }, [todolistId, task, dispatch])

    const onChangeStatusHandler = useCallback(() => {
        const isDone = task.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
        dispatch(changeTaskStatus(todolistId, task.id, isDone))
    }, [todolistId, task, dispatch])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitle(todolistId, task.id, newTitle))
    }, [todolistId, task, dispatch])

    return <li className={s.task} key={task.id}>
        <div style={{display: 'flex', gap: '20px'}}>
            <Checkbox onChange={onChangeStatusHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
        </div>
        <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={onRemoveHandler}></Button>

    </li>

}

type Props = {
    todolistId: string
    task: TaskType
}
