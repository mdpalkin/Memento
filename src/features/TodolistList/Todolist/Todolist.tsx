import '../../../styles/styles.css'
import {AddItemForm} from "../../AddItemForm";
import {EditableSpan} from "../../EditableSpan";
import {Button} from "antd"
import {DeleteOutlined} from "@ant-design/icons";
import s from './Todolist.module.css'
import Radio from "antd/lib/radio/index";
import Card from "antd/lib/card/Card";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../app";
import {addTaskTC} from "./Task/tasks.reducer.ts";
import {changeTodolistFilter, changeTodolistTitleTC, FilterValues, removeTodolistTC} from "./todolists.reducer.ts";
import {memo, useCallback, useMemo, useState} from "react";
import {Task} from "./Task/Task.tsx";
import {RequestStatusType} from "../../../app";
import {TaskDomainType, TaskStatuses, TaskType} from "../../../shared/api";

import {selectTasksById} from "./Task/tasks.selectors.ts";

export const Todolist = memo(({title, todolistId, filter, entityStatus}: Props) => {


    const [currentTask, setCurrentTask] = useState<null | TaskType>(null)

    const tasks = useSelector(selectTasksById(todolistId))
    const dispatch = useAppDispatch()

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [todolistId, dispatch])

    const onAllClickHandler = useCallback(() =>dispatch(changeTodolistFilter({todolistId, filter: 'all'})), [todolistId, dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilter({todolistId, filter: 'active'})), [todolistId, dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilter({todolistId, filter: 'completed'})), [todolistId, dispatch])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC({todolistId}))
    }, [todolistId, dispatch])

    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleTC({todolistId, title: newTitle}))
    }, [todolistId, dispatch])


    const tasksForTodolist: TaskDomainType[] = useMemo( () => {

        if (filter === 'completed') {
            return tasks.filter((task: TaskType) => task.status === TaskStatuses.Completed)
        }
        if (filter === 'active') {
            return tasks.filter((task: TaskType) =>
                task.status === TaskStatuses.InProgress || task.status === TaskStatuses.New)
        }

        return tasks

    }, [filter, tasks])

    const isDisabled = entityStatus === 'loading'


    return (
        <Card>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h3>
                        <EditableSpan
                            style={{'fontSize': '20px'}}
                            title={title}
                            disabled={entityStatus === 'loading'}
                            onChange={changeTodolistTitleHandler} />
                    </h3>
                    <Button shape={'circle'} disabled={isDisabled} icon={<DeleteOutlined/>} onClick={removeTodolistHandler}></Button>
                </div>
                <AddItemForm callback={addTaskHandler} disabled={isDisabled}/>
                <ul>
                    {tasksForTodolist.map(task => <Task currentTask={currentTask} setCurrentTask={setCurrentTask} key={task.id} task={task} todolistId={todolistId} /> )}
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
})

type Props = {
    title: string
    filter: FilterValues
    todolistId: string
    entityStatus: RequestStatusType
}
