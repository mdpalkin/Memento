import {fetchTodolists, TodolistDomainType} from "./Todolist/todolists.reducer.ts";
import {Todolist} from "./Todolist/Todolist.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, StoreType} from "../../app/store.ts";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {UnknownAction} from "redux";

export const TodolistList = () => {

    const dispatch: ThunkDispatch<StoreType, never, UnknownAction> = useDispatch()

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