import {FC} from 'react';
import './Header.css'

interface IHeaderProps {
  username: string | undefined
}

const Header: FC<IHeaderProps> = ({username}) => {
  return (
      <div className='header'>
          <h1>CRM BASIC</h1>
          <h1>{username}</h1>
      </div>
  );
};

export default Header;
