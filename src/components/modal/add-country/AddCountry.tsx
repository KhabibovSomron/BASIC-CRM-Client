import axios from 'axios';
import React, { FC, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { ADD_COUNTRY_URL, ADD_POSITION_URL } from '../../../endpoints';
import "./AddCountry.css"
interface IAddCountryProps {
    show: boolean,
    onHide: Function,
    isCountry: boolean,
    toggleDataChanged: Function
}

const AddCountry: FC<IAddCountryProps> = ({ show, onHide, isCountry, toggleDataChanged }) => {

    const [countryTitle, setCountryTitle] = useState<string>("")
    const [countryCode, setCountryCode] = useState<number>(0)
    const [position, setPosition] = useState<string>("")

    const onChangePositonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value)
    }

    const onChangeCountryTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryTitle(event.target.value)
    }

    const onChangeCountryCodeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryCode(Number(event.target.value))
    }

    const onAddCountryClick = async () => {
        try {
            const res = await axios.post(ADD_COUNTRY_URL, {
                "title": countryTitle,
                "code": countryCode
            })
            onHide(false)
            toggleDataChanged()
        } catch (err) {
            console.log(err)
        }
    }

    const onAddPositionClick = async () => {
        try {
            const res = await axios.post(ADD_POSITION_URL, {
                "title": position
            })
            onHide(false)
            toggleDataChanged()
        } catch (err) {
            console.log(err)
        }
    }

    return isCountry ? (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Country
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-con'>
                    <input type="text" placeholder='Country Name' onChange={onChangeCountryTitleHandler} />
                    <input type="number" placeholder='Country code' onChange={onChangeCountryCodeHandler} />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={onAddCountryClick}>Add Country</button>
            </Modal.Footer>
        </Modal>
    ):
    (
        <Modal
            show={show}
            onHide={() => onHide(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Position
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-con'>
                    <input type="text" placeholder='Country Name' onChange={onChangePositonHandler} />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={onAddPositionClick} >Add Position</button>
            </Modal.Footer>
        </Modal>
    )
    ;
};

export default AddCountry;
