import React,{useState} from 'react'
import {Typography,Grid,Button,TextField,FormControlLabel,FormControl} from '@material-ui/core'
import { useHistory } from "react-router";
import {Card,CardActions,CardContent} from '@material-ui/core';
const Register = () => {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [incorrectCredentials,setIncorrectCredentials] = useState(false)
    const history = useHistory()

    function usernameChange(e){
        setUsername(e.target.value)
    }
    function emailChange(e){
        setEmail(e.target.value)
    }
    function passwordChange(e){
        setPassword(e.target.value)
    }
    function submit(){
        const requestOptions={
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username:username,
                email:email,
                password:password,
            })
        }
        fetch("/users/register",requestOptions)
        .then((res)=>{
            if(res.ok){
                history.push('/')
            }
            else{
                setIncorrectCredentials(true)
            }
        })
        .then((data)=>{})
    }

    return (
        <Grid container spacing={1} style={{paddingBottom:150}}>
            <Grid item xs={12} align="center" style={{paddingTop:20}}>
                <Card className="card-auth" align="center">
                    <Grid item xs={12} align="center" style={{paddingTop:20}}>
                        <Typography variant="h4" component="h4" color="textSecondary">
                            Sign up
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl className="register-container">
                            <Grid className="register-username" item xs={12} align="center">
                                <TextField onChange={usernameChange} fullWidth variant="outlined" label="Username"/>
                            </Grid>
                            <Grid className="register-email" item xs={12} align="center">
                                <TextField onChange={emailChange} type="email" fullWidth variant="outlined" label="Email"/>
                            </Grid>
                            <Grid className="register-password" item xs={12} align="center">
                                <TextField onChange={passwordChange} type="password" fullWidth variant="outlined" label="Password"/>
                            </Grid>
                            {incorrectCredentials==true?
                                <Grid item xs={12} align="center">
                                    <Typography variant="body2" color="secondary">
                                        An account with this username already exists.
                                    </Typography>
                                </Grid>:null}
                        </FormControl>
                        <Grid item xs={12} align="center" style={{paddingTop:30,paddingBottom:20}}>
                            <Button onClick={submit} type="submit" color="primary" variant="contained">
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Register
