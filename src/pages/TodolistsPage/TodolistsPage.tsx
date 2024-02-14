import {AddItemForm} from "../../components/AddItemForm/AddItemForm.tsx";
import {TodolistList} from "../../features/TodolistList/TodolistList.tsx";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../app/store.ts";
import {UnknownAction} from "redux";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {addTodolistTC} from "../../features/TodolistList/Todolist/todolists.reducer.ts";

export const TodolistsPage = () => {

    const dispatch: ThunkDispatch<StoreType, never, UnknownAction> = useDispatch()

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return <>
        <AddItemForm callback={addTodolistHandler}/>
        <TodolistList/>
    </>
}