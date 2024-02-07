import {AddItemForm} from "../components/AddItemForm/AddItemForm.tsx";
import Layout from "antd/lib/layout/layout";
import '../styles/styles.css'
import {useDispatch} from "react-redux";
import {StoreType} from "./store.ts";
import {addTodolistTC} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {useCallback} from "react";
import {ThunkDispatch} from "redux-thunk";
import {UnknownAction} from "redux";
import {TodolistList} from "../features/TodolistList/TodolistList.tsx";
import {AppHeader} from "../components/AppHeader/AppHeader.tsx";

export const App = () => {

    const dispatch: ThunkDispatch<StoreType, never, UnknownAction> = useDispatch()

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return (
        <Layout>
            <Layout>
                <AppHeader/>
            </Layout>
            <Layout className={'App'} style={{minHeight: '93vh'}}>
                <AddItemForm callback={addTodolistHandler}/>
                <TodolistList/>
            </Layout>
        </Layout>
    )
}
