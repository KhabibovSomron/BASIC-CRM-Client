import { FC, useState } from 'react';
import AddCountry from '../modal/add-country/AddCountry';
import AddModal from '../modal/AddModal';
import './Footer.css'
interface IFooterProps {
    setOnDataChanged: Function,
    toggleDataChanged: Function,
    onDataCountryChanged: boolean
}

const Footer: FC<IFooterProps> = ({setOnDataChanged, toggleDataChanged, onDataCountryChanged}) => {

    const [modalAddCustomerShow, setModalAddCustomerShow] = useState<boolean>(false);

    const modalAddCustomerToggle = () => {
        setModalAddCustomerShow(!modalAddCustomerShow)
    }

    const [modalAddCountryShow, setModalAddCountryShow] = useState<boolean>(false);
    const [isCountry, setIsCountry] = useState<boolean>(false)

   

    const modalAddCountryToggle = () => {
        setIsCountry(true)
        setModalAddCountryShow(!modalAddCountryShow)
    }

    const modalAddPositionToggle = () => {
        setIsCountry(false)
        setModalAddCountryShow(!modalAddCountryShow)
    }

    return (
        <div className='control-buttons'>
            <button onClick={modalAddCustomerToggle}>Add customer</button>
            <button onClick={modalAddCountryToggle}>Add Country</button>
            <button onClick={modalAddPositionToggle}>Add Position</button>
            <button>Delete selected</button>
            <button>Send email</button>
            <AddModal show={modalAddCustomerShow} onHide={setModalAddCustomerShow} setOnDataGanged={setOnDataChanged} dataChanged={onDataCountryChanged} />
            <AddCountry show={modalAddCountryShow} onHide={setModalAddCountryShow} isCountry={isCountry} toggleDataChanged={toggleDataChanged} />
        </div>
    );
};

export default Footer;
