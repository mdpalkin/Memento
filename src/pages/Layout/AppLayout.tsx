import {Spin} from "antd";
import Layout from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store.ts";
import {AppHeader} from "../../components/AppHeader/AppHeader.tsx";
import { Outlet } from 'react-router-dom'
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar.tsx";
export const AppLayout = () => {

    const appStatus = useSelector<AppRootState>(state => state.app.status)



    return (
        <Layout>
            <Layout>
                <AppHeader/>
            </Layout>
            <Layout className={'App'} style={{minHeight: '93vh'}}>
                <Spin size={'large'} spinning={appStatus === 'loading'} className={'spin'}/>
                <Outlet/>
                <ErrorSnackbar/>
            </Layout>
        </Layout>
    )
}