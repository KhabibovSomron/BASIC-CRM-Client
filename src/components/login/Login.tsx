import React, { FC, useEffect, useState } from 'react';
import './Login.css'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { LOGIN_URL, REGISTER_URL } from '../../endpoints';

interface ILoginProps {
}

const Login: FC<ILoginProps> = (props) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [token, setToken] = useState<string>("")
    const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            const res = await axios.post(LOGIN_URL, {
                "username": username,
                "password": password
            })
            setToken(res.data)
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const register = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            const res = await axios.post(REGISTER_URL, {
                "username": username,
                "email": email,
                "password": password
            })
            setToken(res.data)
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }


    const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    
    return token ? (<Navigate to={`home/${username}/`}/>): (
        <div className='body'>
            <div className='main'>
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" onChange={usernameInputHandler} />
                        <input type="email" name="email" placeholder="Email" onChange={emailInputHandler} />
                        <input type="password" name="pswd" placeholder="Password" onChange={passwordInputHandler} />
                        <button onClick={register}>Sign up</button>
                    </form>
                </div>


                <div className="login">
				<form>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="text" name="email" placeholder="User name" onChange={usernameInputHandler} />
					<input type="password" name="pswd" placeholder="Password" onChange={passwordInputHandler} />
					<button onClick={login}>Login</button>
				</form>
			</div>

            </div>
        </div>
    );
};

export default Login;
