import {removeTaskTC, updateTaskTC} from "./tasks.reducer.ts";
import s from "../Todolist.module.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan.tsx";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {TaskDomainType, TaskStatuses} from "../../../../api/tasks-api.ts";
import {useAppDispatch} from "../../../../app/store.ts";

export const Task = ({todolistId, task}: Props) => {

    const dispatch = useAppDispatch()
    const onRemoveHandler =  useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id))
    }, [todolistId, task, dispatch])

    const onChangeStatusHandler = useCallback(() => {
        const isDone = task.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
        dispatch(updateTaskTC(todolistId, task.id, {status: isDone}))
    }, [todolistId, task, dispatch])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title: newTitle}))
    }, [todolistId, task, dispatch])

    return <li className={s.task} key={task.id}>
        <div style={{display: 'flex', gap: '20px'}}>
            <Checkbox onChange={onChangeStatusHandler} checked={task.status === TaskStatuses.Completed} disabled={task.entityStatus === 'loading'}/>
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler} disabled={task.entityStatus === 'loading'}/>
        </div>
        <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={onRemoveHandler} disabled={task.entityStatus === 'loading'}></Button>

    </li>

}

type Props = {
    todolistId: string
    task: TaskDomainType
}
