import {Todolist} from "./features/Todolist/Todolist.tsx";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm.tsx";
import Layout, {Header} from "antd/lib/layout/layout";
import {GiBrainstorm} from "react-icons/gi";
import {Typography} from "antd";
import './styles/styles.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";
import {addTodolist} from "./state/todolists.reducer.ts";
import {useCallback} from "react";

export const App = () => {

    const todolists = useSelector((state: AppRootState) => state.todolists)

    const dispatch = useDispatch()

    const addTodolistHandler =  useCallback((title: string) => {
        const newTodolistId = v1()
        dispatch(addTodolist(newTodolistId, title))
    }, [dispatch])


    return (
        <Layout>
            <Layout>
                <Header style={{display: 'flex', alignItems: 'center', minHeight: '7vh'}}>
                    <div className={'logo'}>
                        <GiBrainstorm size={40} color={'white'} />
                        <Typography.Title style={{color: 'white', fontSize: '20px'}}>Brain storm</Typography.Title>
                    </div>
                </Header>
            </Layout>
            <Layout className={'App'} style={{minHeight: '93vh'}}>
                    <AddItemForm callback={addTodolistHandler}/>
                <div className={'todolists'}>
                    {todolists.map(todolist => {
                        return <Todolist
                            key={todolist.id}
                            title={todolist.title}
                            filter={todolist.filter}
                            todolistId={todolist.id}
                        />
                    })}
                </div>
            </Layout>
        </Layout>
    )
}
