import {ChangeEvent, useState} from "react";

export const EditableSpan = (props: Props) => {

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
                ? <input value={text} autoFocus onChange={textHandler} onBlur={onBlurHandler}/>
                : <span onDoubleClick={activateViewMode}>{props.title}</span>
            }
        </>
    )
}

type Props = {
    title: string
    onChange: Function
}