import {GiBrainstorm} from "react-icons/gi";
import {Typography} from "antd";
import {Header} from "antd/lib/layout/layout";

export const AppHeader = () => {
    return <Header style={{display: 'flex', alignItems: 'center', minHeight: '7vh'}}>
        <div className={'logo'}>
            <GiBrainstorm size={40} color={'white'}/>
            <Typography.Title style={{color: 'white', fontSize: '20px'}}>Brain storm</Typography.Title>
        </div>
    </Header>
}