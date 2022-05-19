import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/massage.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {

    const auth = useContext(AuthContext)

    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            console.log(e.message)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)

        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-3">
                <h1>Сократить ссылку</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                    </div>

                    <div className="input-field ">
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value ={form.email}
                            onChange={changeHandler}/>

                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field ">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value ={form.password}
                            onChange={changeHandler}
                        />

                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="input-field col s6">
                        <input placeholder="Placeholder"
                               id="first_name"
                               type="text"/>
                        <label htmlFor="first_name">First Name</label>
                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4" disabled={loading} style={{marginRight: "10px"}}
                                onClick={loginHandler}>Войти
                        </button>
                        <button className="btn grey lighten-1 black-text" disabled={loading}
                                onClick={registerHandler}>Регистрация
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthPage;