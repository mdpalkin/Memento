import {GiBrainstorm} from "react-icons/gi";
import {Button, Typography} from "antd";
import {Header} from "antd/lib/layout/layout";
import {useNavigate} from "react-router-dom";

export const AppHeader = () => {

    const navigate = useNavigate()

    const logOut = () => {
        navigate('/login')
    }

    return <Header style={{display: 'flex', alignItems: 'center', minHeight: '7vh', justifyContent: 'space-between'}}>
        <div className={'logo'}>
            <GiBrainstorm size={40} color={'white'}/>
            <Typography.Title style={{color: 'white', fontSize: '20px'}}>Brain storm</Typography.Title>
        </div>
        <Button onClick={logOut}>Logout</Button>
    </Header>
}