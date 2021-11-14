import React,{useState} from 'react'
import {Typography,Grid,Button,TextField,FormControlLabel,FormControl} from '@material-ui/core'
import { useHistory } from "react-router";
import {Card,CardActions,CardContent} from '@material-ui/core';
const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [incorrectCredentials,setIncorrectCredentials] = useState(false)
    const history = useHistory()

    function usernameChange(e){
        setUsername(e.target.value)
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
                password:password,
            })
        }
        fetch("/users/login",requestOptions)
        .then((res)=>res.json())
        .then((data)=>{
            if(data){
                localStorage.setItem("tokenAuth",data.key)
                history.push('/')
            }
            else{
                setIncorrectCredentials(true)
            }
        })
    }

    return (
            <Grid container spacing={1} style={{paddingBottom:150}}>
                <Grid item xs={12} align="center" style={{paddingTop:20}}>
                    <Card className="card-auth" align="center">
                        <Grid item xs={12} align="center" style={{paddingTop:20}}>
                            <Typography variant="h4" component="h4" color="textSecondary">
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <FormControl className="register-container">
                                <Grid className="register-username" item xs={12} align="center">
                                    <TextField onChange={usernameChange} fullWidth variant="outlined" label="Username"/>
                                </Grid>
                                <Grid className="register-password" item xs={12} align="center">
                                    <TextField onChange={passwordChange} type="password" fullWidth variant="outlined" label="Password"/>
                                </Grid>
                                {incorrectCredentials==true?
                                <Grid item xs={12} align="center">
                                    <Typography variant="body2" color="secondary">
                                        Your username or password is incorrect
                                    </Typography>
                                </Grid>:null}
                            </FormControl>
                            <Grid item xs={12} align="center" style={{paddingTop:30,paddingBottom:20}}>
                                <Button onClick={submit} type="submit" color="primary" variant="contained">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
    )
}

export default Login
