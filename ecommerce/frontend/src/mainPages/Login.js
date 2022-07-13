import React, { useState } from 'react'
import { Typography, Grid, Button, TextField, FormControlLabel, FormControl, Card, CardActions, CardContent } from '@mui/material'
import { useHistory } from "react-router";
import MainButton from '../components/MainButton';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)
    const history = useHistory()

    function usernameChange(e) {
        setUsername(e.target.value)
    }
    function passwordChange(e) {
        setPassword(e.target.value)
    }
    function submit(e) {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }
        fetch("/users/login", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    setIncorrectCredentials(true)
                }
            })
            .then((data) => {
                localStorage.setItem("tokenAuth", data.key)
                history.push('/')
            })
    }

    return (
        <form className="container checkout" onSubmit={submit}>
            <div className="card card-auth shadow rounded p-5">
                <h3 className="pt-3 pb-3 fw-bold" style={{ color: "#24305E" }}>Sign in</h3>
                {incorrectCredentials == true ?
                    <label className="fw-bold" style={{ color: "#f7636c" }}>Your username or password is incorrect</label>
                    :
                    null
                }
                <input onChange={usernameChange} className="form-control m-2 ms-0 mt-3" placeholder="Username" type="username" />
                <input onChange={passwordChange} className="form-control m-2 ms-0 mt-3" placeholder="Password" type="password" />
                <MainButton variant="contained" className="mt-5" type="submit">Sign in</MainButton>
                <div className="pt-5">
                    <small>
                        <a style={{textDecoration:"none"}} href="/register">Don't have an account? Create one here</a>
                    </small>
                </div>
            </div>
        </form>
    )
}

export default Login
