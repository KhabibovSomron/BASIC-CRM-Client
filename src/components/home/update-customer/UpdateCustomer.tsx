import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Modal, } from 'react-bootstrap'
import { COUNTRIES_URL, POSITIONS_URL, UPDATE_CUSTOMER_URL } from '../../../endpoints';
import { ICustomer } from '../Home';
import "./UpdateCustomer.css"

interface ICountry {
    id: number,
    title: string
}

interface IPosition {
    id: number,
    title: string
}

interface IUpdateCustomerProps {
    show: boolean,
    onHide: Function,
    dataChanged: boolean,
    customer: ICustomer,
    SetOnDataChanged: Function
}

const UpdateCustomer: FC<IUpdateCustomerProps> = ({ show, onHide, dataChanged, customer, SetOnDataChanged }) => {

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


    useEffect(() => {
        setFullName(customer.fullName)
        setCompanyName(customer.companyName)
        setEmail(customer.email)
        countries.forEach(country => {
            if (customer.country === country.title) {
                setCountry(country.id)
            }
        })

        positions.forEach(item => {
            if (item.title === customer.position) {
                setPosition(item.id)
            }
        })
    }, [customer])

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

    const onUpdateClick = async () => {
        try {
            const res = await axios.put(UPDATE_CUSTOMER_URL + `${customer.id}/`, 
                {
                    "fullName": fullName,
                    "companyName": companyName,
                    "country": country,
                    "email": email,
                    "position": position
                }
            )
            SetOnDataChanged()
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
                    Add Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-con'>
                    <input type="text" placeholder='Full Name' onChange={onChangeFullNameHandler} value={fullName} />
                    <input type="text" placeholder='Company Name' onChange={onChangeCompanyNameHandler} value={companyName} />
                    <input type='mail' placeholder='Email' onChange={onChangeEmailHandler} value={email} />

                    <div className='option-con'>
                        <div className="box">
                            <select value={country} onChange={onChangeCountryHandler} >
                                {countries.map(country =>
                                    <option value={country.id} key={country.id}>{country.title}</option>
                                )}
                            </select>
                        </div>
                        <div className="box">
                            <select value={position} onChange={onChangePositonHandler} >
                                {positions.map(item =>
                                    <option value={item.id} key={item.id}>{item.title}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={onUpdateClick} >Update customer</button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateCustomer;
