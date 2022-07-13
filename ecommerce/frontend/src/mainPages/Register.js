import React, { useState } from 'react'
import { Typography, Grid, Button, TextField, FormControlLabel, FormControl, Card, CardActions, CardContent } from '@mui/material'
import { useHistory } from "react-router";
import MainButton from '../components/MainButton';
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)
    const history = useHistory()

    function usernameChange(e) {
        setUsername(e.target.value)
    }
    function emailChange(e) {
        setEmail(e.target.value)
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
                email: email,
                password: password,
            })
        }
        fetch("/users/register", requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    setIncorrectCredentials(true)
                }
            })
            .then((data) => {
                history.push('/login')
            })
    }

    return (
        // <Grid container spacing={1} style={{paddingBottom:150}}>
        //     <Grid item xs={12} align="center" style={{paddingTop:20}}>
        //         <Card className="card-auth" align="center">
        //             <Grid item xs={12} align="center" style={{paddingTop:20}}>
        //                 <Typography variant="h4" component="h4" color="textSecondary">
        //                     Sign up
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12} align="center">
        //                 <FormControl className="register-container">
        //                     <Grid className="register-username" item xs={12} align="center">
        //                         <TextField onChange={usernameChange} fullWidth variant="outlined" label="Username"/>
        //                     </Grid>
        //                     <Grid className="register-email" item xs={12} align="center">
        //                         <TextField onChange={emailChange} type="email" fullWidth variant="outlined" label="Email"/>
        //                     </Grid>
        //                     <Grid className="register-password" item xs={12} align="center">
        //                         <TextField onChange={passwordChange} type="password" fullWidth variant="outlined" label="Password"/>
        //                     </Grid>
        //                     {incorrectCredentials==true?
        //                         <Grid item xs={12} align="center">
        //                             <Typography variant="body2" color="secondary">
        //                                 An account with this username already exists.
        //                             </Typography>
        //                         </Grid>:null}
        //                 </FormControl>
        //                 <Grid item xs={12} align="center" style={{paddingTop:30,paddingBottom:20}}>
        //                     <Button onClick={submit} type="submit" color="primary" variant="contained">
        //                         Sign up
        //                     </Button>
        //                 </Grid>
        //             </Grid>
        //         </Card>
        //     </Grid>
        // </Grid>
        <form className="container checkout" onSubmit={submit}>
            <div className="card card-auth shadow rounded p-5">
                <h3 className="pt-3 pb-3 fw-bold" style={{ color: "#24305E" }}>Sign up</h3>
                {incorrectCredentials == true ?
                    <label className="fw-bold" style={{ color: "#f7636c" }}>Your username or password is incorrect</label>
                    :
                    null
                }
                <input onChange={usernameChange} className="form-control m-2 ms-0 mt-3" placeholder="Username" type="username" />
                <input onChange={emailChange} className="form-control m-2 ms-0 mt-3" placeholder="Email" type="email" />
                <input onChange={passwordChange} className="form-control m-2 ms-0 mt-3" placeholder="Password" type="password" />
                <MainButton variant="contained" className="mt-5" type="submit">Sign up</MainButton>
            </div>
        </form>
    )
}

export default Register
