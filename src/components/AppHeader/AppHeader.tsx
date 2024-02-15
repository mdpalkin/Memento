import {GiBrainstorm} from "react-icons/gi";
import {Button, Typography} from "antd";
import {Header} from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {logoutTC} from "../../pages/Login/auth.reducer.ts";
import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {useCallback} from "react";

export const AppHeader = () => {


    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    const logOut = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return <Header style={{display: 'flex', alignItems: 'center', minHeight: '7vh', justifyContent: 'space-between'}}>
        <div className={'logo'}>
            <GiBrainstorm size={40} color={'white'}/>
            <Typography.Title style={{color: 'white', fontSize: '20px'}}>Brain storm</Typography.Title>
        </div>
        {isLoggedIn && <Button onClick={logOut}>Logout</Button> }
    </Header>
}