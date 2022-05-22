import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { ADD_CUSTOMER_URL, COUNTRIES_URL, POSITIONS_URL } from '../../endpoints';
import "./AddModal.css"

interface ICountry {
    id: number,
    title: string
}

interface IPosition {
    id: number,
    title: string
}

interface ICustomer {
    fullName: string,
    companyName: string,
    country: number,
    positon: number,
    email: string
}

interface IAddModalProps {
    show: boolean,
    onHide: Function,
    setOnDataGanged: Function,
    dataChanged: boolean
}

const AddModal: FC<IAddModalProps> = ({ show, onHide, setOnDataGanged, dataChanged }) => {

    const [countries, setCountries] = useState<ICountry[]>([])
    const [positions, setPositions] = useState<IPosition[]>([])

    const [email, setEmail] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")
    const [position, setPosition] = useState<number>(1)
    const [country, setCountry] = useState<number>(1)
    const [companyName, setCompanyName] = useState<string>("")

    useEffect(() => {
        const fetchCountriesData = async () => {
            try {
                const res = await axios.get(COUNTRIES_URL)
                setCountries(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchPositionsData = async () => {
            try {
                const res = await axios.get(POSITIONS_URL)
                setPositions(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchCountriesData()
        fetchPositionsData()

    }, [dataChanged])

    const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangeCompanyNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value)
    }

    const onChangeFullNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value)
    }

    const onChangeCountryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(Number(event.target.value))
    }

    const onChangePositonHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(Number(event.target.value))
    }

    const sendDataToServer = async () => {
        try {
            console.log(position)
            const res = await axios.post(ADD_CUSTOMER_URL, {
                "fullName": fullName,
                "companyName": companyName,
                "country": country,
                "email": email,
                "position": position
            })
            onHide(false)
            setOnDataGanged()
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
                    Add Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-con'>
                    <input type="text" placeholder='Full Name' onChange={onChangeFullNameHandler} />
                    <input type="text" placeholder='Company Name' onChange={onChangeCompanyNameHandler} />
                    <input type='mail' placeholder='Email' onChange={onChangeEmailHandler} />

                    <div className='option-con'>
                        <div className="box">
                            <select onChange={onChangeCountryHandler}>
                                {countries.map(country =>
                                    <option value={country.id} key={country.id}>{country.title}</option>
                                )}
                            </select>
                        </div>
                        <div className="box">
                            <select onChange={onChangePositonHandler}>
                                {positions.map(position =>
                                    <option value={position.id} key={position.id}>{position.title}</option>
                                )}

                            </select>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={sendDataToServer}>Add customer</button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;
