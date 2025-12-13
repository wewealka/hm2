import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc'  // неправильный URL
                : 'https://samurai.it-incubator.io/api/3.0/homework/test'

        // Очистка
        setCode('')
        setText('')
        setImage('')
        setInfo('...loading')

        axios
            .post(url, {success: x})
            .then((res) => {
                setCode('Код 200!')
                setText('...всё ок!')
                setImage(success200)
                setInfo('success')
            })
            .catch((e) => {
                if (e.response) {
                    const status = e.response.status

                    if (status === 400) {
                        setCode('Ошибка 400!')
                        setText('Вы отправили success = false.\nНекорректный запрос.')
                        setImage(error400)
                        setInfo('error')
                    } else if (status === 500) {
                        setCode('Ошибка 500!')
                        setText('Сервер сломался.\nПопробуйте позже.')
                        setImage(error500)
                        setInfo('error')
                    } else {
                        setCode(`Ошибка ${status}!`)
                        setText(`Неизвестная ошибка сервера.\nСтатус: ${status}`)
                        setImage(errorUnknown)
                        setInfo('error')
                    }
                } else {
                    setCode('Ошибка!')
                    setText('AxiosError: Network Error')
                    setImage(errorUnknown)
                    setInfo('error')
                }
            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        disabled={info === '...loading'}
                    >
                        Send true
                    </SuperButton>

                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={info === '...loading'}
                    >
                        Send false
                    </SuperButton>

                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={info === '...loading'}
                    >
                        Send undefined
                    </SuperButton>

                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)}
                        xType={'secondary'}
                        disabled={info === '...loading'}
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
