import {ChangeEvent, KeyboardEvent, useState} from "react";
import '../styles/styles.css'

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
            <input
                onChange={onNewTitleChangeHandler}
                value={text}
                onKeyDown={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={callBackHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}

type Props = {
    callback: (text: string) => void
}