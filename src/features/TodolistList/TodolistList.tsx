import {fetchTodolists, TodolistDomainType} from "./Todolist/todolists.reducer.ts";
import {Todolist} from "./Todolist/Todolist.tsx";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {useEffect} from "react";

export const TodolistList = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, []);

    const todolists = useSelector((state: AppRootState) => state.todolists)

    return <div className={'todolists'}>
        {todolists.map((todolist: TodolistDomainType) => {
            return <Todolist
                key={todolist.id}
                title={todolist.title}
                filter={todolist.filter}
                todolistId={todolist.id}
                entityStatus={todolist.entityStatus}
            />
        })}
    </div>
}