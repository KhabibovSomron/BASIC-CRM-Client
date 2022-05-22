import { FC, useState } from 'react';
import Header from './components/header/Header';
import Home from './components/home/Home';
import {useParams} from 'react-router-dom'
import Footer from './components/footer/Footer';
import "./App.css"
interface IAppProps {
}

const App: FC<IAppProps> = (props) => {
  const param = useParams()
  const [onDataChanged, setOnDataChanged] = useState<boolean>(false)
  const [onDataCountryChanged, setOnDataCountryChanged] = useState<boolean>(false)

  const toggleDataCountry = () => {
    setOnDataCountryChanged(!onDataCountryChanged)
  }

  const toggleChange = () => {
    setOnDataChanged(!onDataChanged)
  }

  return (
    <div className='con'>
      <Header username={param.username} />
      <Home onDataChanged={onDataChanged} SetOnDataChanged={toggleChange} onDataCountryChanged={onDataCountryChanged} />
      <Footer setOnDataChanged={toggleChange} toggleDataChanged={toggleDataCountry} onDataCountryChanged={onDataCountryChanged} />
    </div>
  );
};

export default App;

