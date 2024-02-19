import {Spin} from "antd";
import Layout from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app";
import {AppHeader} from "../../features/AppHeader";
import {Outlet, useNavigate} from 'react-router-dom'
import {ErrorSnackbar} from "../../features/ErrorSnackbar";
import {useEffect} from "react";
import {initializeAppTC} from "../../app";
import {selectAppError, selectIsInitialized, selectStatus} from "../../app";


export const AppLayout = () => {

    const navigate = useNavigate()

    const appStatus = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const error = useSelector(selectAppError)

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
        navigate('/login')
    }, [dispatch, navigate]);


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