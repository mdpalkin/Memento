import {AddItemForm} from "../../features/AddItemForm/AddItemForm.tsx";
import {TodolistList} from "../../features/TodolistList/TodolistList.tsx";
import {useAppDispatch} from "../../app/store.ts";
import {useSelector} from "react-redux";
import {useCallback} from "react";
import {addTodolistTC} from "../../features/TodolistList/Todolist/todolists.reducer.ts";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Login/auth.selectors.ts";

export const TodolistsPage = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return <>
        <AddItemForm callback={addTodolistHandler}/>
        <TodolistList/>
    </>
}