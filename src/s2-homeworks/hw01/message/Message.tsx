import React from 'react'
import s from './Message.module.css'

export type MessagePropsType = {
    message: {
        id: number
        user: { avatar: string; name: string }
        message: { text: string; time: string }
    }
}

const Message = (props: MessagePropsType) => {
    return (
        <div id={'hw1-message-' + props.message.id} className={s.message}>
            <div className={s.imageAndText}>
                <img
                    src={props.message.user.avatar}
                    alt="avatar"
                    id={'hw1-avatar-' + props.message.id}
                />
                <div className={s.text}>
                    <div id={'hw1-name-' + props.message.id} className={s.name}>
                        {props.message.user.name}
                    </div>
                    <pre
                        id={'hw1-text-' + props.message.id}
                        className={s.messageText}
                    >
                        {props.message.message.text}
                    </pre>
                </div>
            </div>
            <div id={'hw1-time-' + props.message.id} className={s.time}>
                {props.message.message.time}
            </div>
        </div>
    )
}

export default Message