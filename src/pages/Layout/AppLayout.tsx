import {Spin} from "antd";
import Layout from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {AppHeader} from "../../components/AppHeader/AppHeader.tsx";
import {Outlet, useNavigate} from 'react-router-dom'
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar.tsx";
import {useEffect} from "react";
import {initializeAppTC} from "../../app/app.reducer.ts";


export const AppLayout = () => {

    const navigate = useNavigate()

    const appStatus = useSelector<AppRootState>(state => state.app.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
    const error = useSelector<AppRootState, string | null>((state) => state.app.error)

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
        navigate('/login')
    }, []);


    if (!isInitialized) {
        return <Spin size={'large'} className={'spin'}/>
    }

    return (
        <Layout>
            <Layout>
                <AppHeader/>
            </Layout>
            <Layout className={'App'} style={{minHeight: '93vh'}}>
                <Spin size={'large'} spinning={appStatus === 'loading'} className={'spin'}/>
                <Outlet/>
                <ErrorSnackbar error={error}/>
            </Layout>
        </Layout>
    )
}