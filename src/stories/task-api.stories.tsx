import {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api.ts";
import {tasksApi} from "../api/tasks-api.ts";
import {todolistId1} from "../state/todolists.reducer.ts";

export default {
    title: 'API/Task',

}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        tasksApi.getTasks('022d3b9c-8351-4bc2-af05-39e62e97cd00').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>()

    useEffect(() => {
        const todolistId = '022d3b9c-8351-4bc2-af05-39e62e97cd00'
        tasksApi.createTask(todolistId, 'New task!').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = (useState1: [any, React.Dispatch<React.SetStateAction<any>>] = useState<any>(null)) => {
    const [state, setState] = useState1

    useEffect(() => {
        const todolistId = '022d3b9c-8351-4bc2-af05-39e62e97cd00'
        const taskId = "9d932370-c4f1-4dad-95cf-c90bf2f14ab5"
        tasksApi.removeTask(todolistId, taskId).then(() => {
            setState('Done.')
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const [title, setTitle] = useState('title1')
    const [todolistID, setTodolistID] = useState('022d3b9c-8351-4bc2-af05-39e62e97cd00')
    const [description, setDecription] = useState('This is a description')
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')

    const updateTask = () => {
        tasksApi.updateTask(todolistID, '668f306f-6144-4328-9a3e-f45394e74598', {title, deadline, description, priority, status, startDate}).then(res => {
            setState(res.data)
        })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'todolistId'} value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={'description'} value={description} onChange={(e) => setDecription(e.currentTarget.value)}/>
        <input placeholder={'status'} type={'number'} value={status}
               onChange={(e) => setStatus(+e.currentTarget.value)}/>
        <input placeholder={'priority'} type={'number'} value={priority}
               onChange={(e) => setPriority(+e.currentTarget.value)}/>
        <input placeholder={'startDate'} value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
        <input placeholder={'deadline'} value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
    <button onClick={updateTask}>Update task</button>
    </div>
}

