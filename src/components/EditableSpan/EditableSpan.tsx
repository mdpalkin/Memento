import  {ChangeEvent, CSSProperties, memo, useState} from "react";
import {Typography} from "antd";
import Input from "antd/lib/input/Input";

export const EditableSpan = memo(({disable, title, onChange, style}: Props) => {

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
            {editMode && !disable
                ? <Input value={text} size={'small'} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <Typography style={style} onDoubleClick={activateViewMode}>{title}</Typography>
            }
        </>
    )
})

type Props = {
    disable?: boolean,
    title: string
    onChange: (newTitle: string) => void
    style?: CSSProperties
}