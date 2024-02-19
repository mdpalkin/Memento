import  {ChangeEvent, CSSProperties, memo, useState} from "react";
import {Typography} from "antd";
import Input from "antd/lib/input/Input";

export const EditableSpan = memo(({disabled, title, onChange, style}: Props) => {

    const [text, setText] = useState('')
    const [editMode, setEditMode] = useState(false)

    const activateViewMode = () => {
        setEditMode(true)
        setText(title)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        onChange(text)
    }

    const textHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }


    return (
        <>
            {editMode && !disabled
                ? <Input value={text} size={'small'} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <Typography style={style} onDoubleClick={activateViewMode}>{title}</Typography>
            }
        </>
    )
})

type Props = {
    disabled?: boolean,
    title: string
    onChange: (newTitle: string) => void
    style?: CSSProperties
}