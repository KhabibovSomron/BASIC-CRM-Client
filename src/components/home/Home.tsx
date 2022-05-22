import React, { FC, useEffect, useState } from 'react';
import './Home.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { CUSTOMER_URL, DELETE_CUSTOMER_URL } from '../../endpoints';
import UpdateCustomer from './update-customer/UpdateCustomer';
import SendEmail from '../modal/send-email/SendEmail';

export interface ICustomer {
    id: number,
    fullName: string,
    companyName: string,
    country: string,
    position: string,
    email: string
}

interface IHomeProps {
    onDataChanged: boolean,
    SetOnDataChanged: Function,
    onDataCountryChanged: boolean
}

const Home: FC<IHomeProps> = ({onDataChanged, SetOnDataChanged, onDataCountryChanged}) => {

    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [modalSendEmaiShow, setModalSendEmailShow] = useState<boolean>(false);
    const [modalUpdateCustomerShow, setModalUpdateCustomerShow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")

    const [selectedCustomer, SetSelectedCustomer] = useState<ICustomer>({
        id: 0,
        fullName: "",
        companyName: "",
        country: "",
        position: "",
        email: ""
    })

    const modalUpdateCustomerToggle = (index: number) => {
        SetSelectedCustomer(customers[index])
        setModalUpdateCustomerShow(!modalUpdateCustomerShow)
    }

    const modalSendEmailToggle = (value: string) => {
        setModalSendEmailShow(!modalSendEmaiShow)
        setEmail(value)
    }

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await axios.get(CUSTOMER_URL)
                console.log(res.data)
                setCustomers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCustomerData()
    }, [onDataChanged])

    const onDeleteClick = async (id: number) => {
        try {
            const res = await axios.delete(DELETE_CUSTOMER_URL + `${id}/`)
            SetOnDataChanged()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='home'>
            <div className='table-con'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Company Name</th>
                            <th>Position</th>
                            <th>Country</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Send Email</th>
                        </tr>
                    </thead>
                    <tbody>

                        {customers.map((customer, index) =>
                            <tr key={customer.id}>
                                <td>{customer.fullName}</td>
                                <td>{customer.companyName}</td>
                                <td>{customer.position}</td>
                                <td>{customer.country}</td>
                                <td>{customer.email}</td>
                                <td><button onClick={() => modalUpdateCustomerToggle(index)}>Edit</button></td>
                                <td><button onClick={() => onDeleteClick(customer.id)}>Delete</button></td>
                                <td><button onClick={() => modalSendEmailToggle(customer.email)}>Send Email</button></td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
            <UpdateCustomer show={modalUpdateCustomerShow} onHide={setModalUpdateCustomerShow} dataChanged={onDataCountryChanged} customer={selectedCustomer} SetOnDataChanged={SetOnDataChanged} />
            <SendEmail show={modalSendEmaiShow} onHide={setModalSendEmailShow} email={email} />
        </div>
    );
};

export default Home;
