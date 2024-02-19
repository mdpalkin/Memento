import {fetchTodolists, TodolistDomainType} from "./Todolist/todolists.reducer.ts";
import {Todolist} from "./Todolist/Todolist.tsx";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app";
import {useEffect} from "react";


import {selectTodolists} from "./Todolist/todolists.selectors.ts";

export const TodolistList = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, []);

    const todolists = useSelector(selectTodolists)

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