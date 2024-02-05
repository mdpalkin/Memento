import  {ChangeEvent, CSSProperties, memo, useState} from "react";
import {Typography} from "antd";
import Input from "antd/lib/input/Input";

export const EditableSpan = memo((props: Props) => {

    const [text, setText] = useState('')
    const [editMode, setEditMode] = useState(false)

    const activateViewMode = () => {
        setEditMode(true)
        setText(props.title)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.onChange(text)
    }

    const textHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }


    return (
        <>
            {editMode
                ? <Input value={text} size={'small'} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <Typography style={props.style} onDoubleClick={activateViewMode}>{props.title}</Typography>
            }
        </>
    )
})

type Props = {
    title: string
    onChange: (newTitle: string) => void
    style?: CSSProperties
}