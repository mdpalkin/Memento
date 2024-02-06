import '../../styles/styles.css'
import {AddItemForm} from "../../components/AddItemForm/AddItemForm.tsx";
import {EditableSpan} from "../../components/EditableSpan.tsx";
import {Button} from "antd"
import {DeleteOutlined} from "@ant-design/icons";
import s from './Todolist.module.css'
import Radio from "antd/lib/radio/index";
import Card from "antd/lib/card/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, StoreType} from "../../state/store.ts";
import {addTask, fetchTasks} from "../../state/tasks.reducer.ts";
import {
    changeTodolistFilter,
    changeTodolistTitle,
    FilterValues,
    removeTodolist
} from "../../state/todolists.reducer.ts";
import {memo, useCallback, useEffect, useMemo} from "react";
import {Task} from "../Task.tsx";
import {TaskStatuses, TaskType} from "../../api/tasks-api.ts";
import {ThunkDispatch} from "redux-thunk";
import {UnknownAction} from "redux";

export const Todolist = memo(({title, todolistId, filter}: Props) => {

    const tasks = useSelector((state: AppRootState) => state.tasks[todolistId])
    const dispatch: ThunkDispatch<StoreType, never, UnknownAction> = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(todolistId))
    }, []);

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask(todolistId, title))
    }, [todolistId, dispatch])

    const onAllClickHandler = useCallback(() =>dispatch(changeTodolistFilter(todolistId, 'all')), [todolistId, dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilter(todolistId, 'active')), [todolistId, dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilter(todolistId, 'completed')), [todolistId, dispatch])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolist(todolistId))
    }, [todolistId, dispatch])

    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitle(todolistId, newTitle))
    }, [todolistId, dispatch])


    const tasksForTodolist: TaskType[] = useMemo( () => {

        if (filter === 'completed') {
            return tasks.filter((task: TaskType) => task.status === TaskStatuses.Completed)
        }
        if (filter === 'active') {
            return tasks.filter((task: TaskType) => task.status === TaskStatuses.InProgress)
        }

        return tasks

    }, [filter, tasks])

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
                    {tasksForTodolist.map(task => <Task key={task.id} task={task} todolistId={todolistId} /> )}
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
}
