import axios from 'axios';
import React, { FC, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { ADD_COUNTRY_URL, ADD_POSITION_URL, SEND_MESSAGE_URL } from '../../../endpoints';
import "./SendEmail.css"
interface ISendEmailProps {
    show: boolean,
    onHide: Function,
    email: string
}

const SendEmail: FC<ISendEmailProps> = ({ show, onHide, email}) => {

    const [header, setHeader] = useState<string>("")
    const [text, setText] = useState<string>("")

    const onChangeHeaderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(event.target.value)
    }

    const onChangeTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    const onSendClick = async () => {
        try {
            const res = await axios.post(SEND_MESSAGE_URL, {
                "header": header,
                "text": text,
                "email": email
            })
            onHide(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Send Email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-con'>
                    <input type="text" placeholder='Заголовок' onChange={onChangeHeaderHandler} />
                    <textarea placeholder='Напишите письмо...' onChange={onChangeTextHandler} />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={onSendClick}>Send Email</button>
            </Modal.Footer>
        </Modal>
    );
};

export default SendEmail;
