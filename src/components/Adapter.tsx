import {FC} from 'react';
import {Routes, Route} from 'react-router-dom'
import App from '../App';
import Login from './login/Login';
import Register from './register/Register';
interface IAdapterProps {
}

const Adapter: FC<IAdapterProps> = (props) => {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/:username/" element={<App />} />
      </Routes>
  );
};

export default Adapter;
