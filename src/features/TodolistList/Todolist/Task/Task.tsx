import {changeTaskOrder, fetchTasks, removeTaskTC, updateTaskTC} from "./tasks.reducer.ts";
import s from "../Todolist.module.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {EditableSpan} from "../../../EditableSpan";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {TaskDomainType, TaskStatuses, TaskType} from "../../../../shared/api";
import {useAppDispatch} from "../../../../app";
import {DragEvent} from "react";

export const Task = ({todolistId, task, currentTask, setCurrentTask}: Props) => {

    const dispatch = useAppDispatch()
    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskTC({todolistId, taskId: task.id}))
    }, [todolistId, task, dispatch])

    const onChangeStatusHandler = useCallback(() => {
        const isDone = task.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
        dispatch(updateTaskTC({todolistId, taskId: task.id, changes: {status: isDone}}))
    }, [todolistId, task, dispatch])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTC({todolistId, taskId: task.id, changes: {title: newTitle}}))
    }, [todolistId, task, dispatch])


    const onDragOverHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.preventDefault()
    }

    const changeTaskOrderHandler = (todolistId: string, taskId: string, putAfterItemId: string) => {
        dispatch(changeTaskOrder({todolistId, taskId, putAfterItemId}))
    }

    const onDragStartHandler = () => {
        setCurrentTask(task)
    }

    const onDropHandler = (e: DragEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        e.preventDefault()
        changeTaskOrderHandler(todolistId, currentTask!.id, task.id)

    }


    return <li className={s.task} key={task.id}
               onDragStart={onDragStartHandler}
               onDragOver={(e) => onDragOverHandler(e)}
               onDrop={(e) => onDropHandler(e)}
               draggable
    >
        <div style={{display: 'flex', gap: '20px'}}>
            <Checkbox onChange={onChangeStatusHandler} checked={task.status === TaskStatuses.Completed}
                      disabled={task.entityStatus === 'loading'}/>
            <EditableSpan title={task.title} onChange={changeTaskTitleHandler}
                          disabled={task.entityStatus === 'loading'}/>
        </div>
        <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={onRemoveHandler}
                disabled={task.entityStatus === 'loading'}></Button>

    </li>

}

type Props = {
    todolistId: string
    task: TaskDomainType
    currentTask: TaskType | null
    setCurrentTask: (task: TaskType | null) => void
}
