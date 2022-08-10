import React,{ useRef,useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import {Grid,Typography,FormControl,TextField,Button} from '@mui/material'
import emailjs from 'emailjs-com'
import { FaCreativeCommonsNcJp } from 'react-icons/fa'

const Contact = () => {
    const form= useRef()
    const [toEmail,setToEmail] = useState('')
    const [message,setMessage] = useState('')
    // const history = useHistory()


    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const sendEmail = () => {
        const requestOptions ={
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                email:toEmail,
                body:message
            })

        }
        fetch('/api/contact',requestOptions)
        .then((res)=>res.json())
        .then((data) =>{})

        // history.push('/')
      };

      function currentEmail(e){
        setToEmail(e.currentTarget.value)
      }
      function currentMessage(e){
        setMessage(e.currentTarget.value)
      }

    return (
        <form ref={form} onSubmit={sendEmail} style={{paddingBottom:120}}>
            <Grid container spacing={1}>
                <Grid style={{paddingTop:20}} item xs={12} align="center">
                    <Typography style={{fontWeight:'bold'}} bold variant="h2" component="h2">
                        Spune-ne cum te putem ajuta
                    </Typography>
                </Grid>
                <Grid style={{paddingTop:30}} item xs={12} align="center">
                    <FormControl className="email-contact-container">
                    <TextField 
                        onChange={currentEmail}
                        name="email"
                        fullWidth 
                        inputLabelProps={{ required: false,style:{color:"orange"} }} 
                        id="outlined-basic" label="Email"
                        type="email" 
                        variant="outlined"  
                        inputProps={{min:1,style:{textAlign:'center',color:"black"}}} />
                    <Typography>
                        <small>*Emailul de pe care se va trimite recenzia*</small>
                    </Typography>

                    </FormControl>
                </Grid>
                <Grid style={{paddingTop:60}} item xs={12} align="center">
                    <FormControl className="body-contact-container">
                        <TextField 
                            onChange ={currentMessage}
                            name="message"
                            multiline rows={4} 
                            style={{width:"100%"}} 
                            inputLabelProps={{ required: false,style:{color:"orange"} }}
                            id="outlined-basic" 
                            label="Problema ta/Feedback-ul tau" 
                            variant="outlined"  
                            inputProps={{min:1,style:{textAlign:'center',color:"black"}}} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{paddingTop:30}}>
                    <Button type="submit" className="feedback-button" variant="contained" color="primary">Trimite</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Contact
