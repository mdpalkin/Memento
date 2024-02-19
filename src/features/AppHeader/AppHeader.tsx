import { FaHardDrive } from "react-icons/fa6";
import {Button, Typography} from "antd";
import {Header} from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {logoutTC} from "../../pages/Login/auth.reducer.ts";
import {AppRootState, useAppDispatch} from "../../app";
import {useCallback} from "react";
import {selectIsLoggedIn} from "../../pages/Login/auth.selectors.ts";
import s from './AppHeader.module.css'

export const AppHeader = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootState, boolean>(selectIsLoggedIn)

    const logOut = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    return <Header className={s.wrapper}>
        <div className={'logo'}>
            <FaHardDrive  size={35} color={'white'}/>
            <Typography.Title style={{color: 'white', fontSize: '20px', margin: '0'}}>Memento</Typography.Title>
        </div>
        {isLoggedIn && <Button onClick={logOut}>Logout</Button> }
    </Header>
}