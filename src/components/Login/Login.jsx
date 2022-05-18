import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import {useDispatch} from "react-redux";
import {login, getUsers} from '../../actions/user';
import { getLogs } from "../../actions/log";

import styles from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const [loginField, setLoginField] = useState('');
    const [password, setPassword] = useState('');

    const [errorLogin, setErrorLogin] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [error, setError] = useState('');

    const auth = (e) => {
        e.preventDefault();
        const isValidEmail = loginField.replace(/^[\w]{1}[\w-\]*@[\w-]+\.[a-z]{2,4}$/i);
        if (!loginField) {
            setErrorLogin('Поле обязательное')
        }
        if (!password) {
            setErrorPassword('Поле обязательное')
        }
        if (loginField && isValidEmail !== 'undefined') {
            setErrorLogin('Email некорректный')
        }        
        if (!loginField || !password || !(isValidEmail === 'undefined')) {return;}
        setErrorLogin('')
        setErrorPassword('')
        try {
            dispatch(getUsers())
            dispatch(getLogs())
            dispatch(login(loginField, password))
            if (!localStorage.getItem('token')){
                setError('Пользователь не найден')
                return
            }
            setError('')
            setLoginField('');
            setPassword('');
        } catch (e) {
            setError(e);
        }
    };

    return(
        <form className={styles.login} onSubmit={auth}>
            {error && <span className={styles.error}>{error}</span>}
            <h1>Вход в MTwME</h1>
            <Input value={loginField} onChange={e => setLoginField(e.target.value)} type="email" nameField="Логин">
                {errorLogin}
            </Input>
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" nameField="Пароль">
                {errorPassword}
            </Input>
            <NavLink to='/'>
                <Button type="submit" onClick={auth}>Войти</Button>
            </NavLink>
        </form>
    )
}

export default Login;