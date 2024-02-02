import {ChangeEvent, KeyboardEvent, useState} from "react";
import '../../styles/styles.css'
import {Button, Typography} from "antd";
import Input from "antd/lib/input/Input";
import s from './AddItemForm.module.css'
import {PlusOutlined} from "@ant-design/icons";

export const AddItemForm = (props: Props) => {

    const [text, setText] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setError(null)
    }

    const callBackHandler = () => {

        const cutTitle = text.trim()

        if (cutTitle !== '') {
            props.callback(cutTitle)
            setText('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') callBackHandler()
    }


    return (
        <div>
            <div className={s.wrapper}>
                <Input
                    placeholder={'Type here...'}
                    style={{width: 'auto'}}
                    onChange={onNewTitleChangeHandler}
                    value={text}
                    onKeyDown={onKeyPressHandler}
                    className={error ? s.error : ''}
                />
                <Button shape={'circle'} icon={<PlusOutlined style={{fontSize: '15px'}}/>} type={'primary'}
                        onClick={callBackHandler}></Button>
            </div>
            {error && <Typography className={s.errorMessage}>{error}</Typography>}
        </div>
    )
}

type Props = {
    callback: (text: string) => void
}