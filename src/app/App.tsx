import {AddItemForm} from "../components/AddItemForm/AddItemForm.tsx";
import Layout from "antd/lib/layout/layout";
import '../styles/styles.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, StoreType} from "./store.ts";
import {addTodolistTC} from "../features/TodolistList/Todolist/todolists.reducer.ts";
import {useCallback} from "react";
import {ThunkDispatch} from "redux-thunk";
import {UnknownAction} from "redux";
import {TodolistList} from "../features/TodolistList/TodolistList.tsx";
import {AppHeader} from "../components/AppHeader/AppHeader.tsx";
import {Spin} from "antd";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar.tsx";

export const App = () => {

    const appStatus = useSelector<AppRootState>(state => state.app.status)

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
                <Spin spinning={appStatus === 'loading'} />
                <AddItemForm callback={addTodolistHandler}/>
                <TodolistList/>
                <ErrorSnackbar />
            </Layout>
        </Layout>
    )
}
