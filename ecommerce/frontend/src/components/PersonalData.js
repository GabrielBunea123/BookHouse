import React,{useState,useEffect,useRef} from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Button,TextField,FormHelperText } from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useHistory } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }));

const PersonalData = () => {

    const history = useHistory();

    const classes = useStyles();
    const [buyer,setBuyer]=useState('')
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [street,setStreet]=useState("")
    const [number,setNumber]=useState("")
    const [county,setCounty]=useState("")
    const [city,setCity] = useState("")
    const [phone,setPhone] = useState("")
    const [block,setBlock] = useState("")
    const [scara,setScara]=useState("")
    const [apartment,setApartment] = useState("")
    const [valueRadio, setValueRadio] = React.useState('card de credit');
    const [funcRunning,setFunctionRunning]=useState(false)
    const [postalCode,setPostalCode]=useState('')
    const form = useRef()

    const handleChangePayment = (event) => {
        setValueRadio(event.target.value);
    };
    var error=""

    useEffect(()=>{
        getCart();
        window.scrollTo(0, 0);
    },[])
    function handleSubmitBtn(e){
        e.preventDefault();
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                firstName:firstName,
                lastName:lastName,
                email:email,
                street:street,
                number:number,
                county:county,
                city:city,
                phone:phone,
                block:block,
                scara:scara,
                apartment:apartment,
                payment_method:valueRadio,
                postal_code:postalCode
            })
        }
        fetch("/api/fill-in-personal-data",requestOptions)
        .then((res)=>{
            if(res.ok){
                // if (valueRadio=='ramburs'){
                //     history.push(`/confirm-ramburs/${buyer}`)
                // }
                if (valueRadio=='card de credit'){
                    history.push(`/checkout/${buyer}/`)
                }
            }
            else{
                history.push('/ramburs-error')
            }
        })
        .then((data)=>{
            console.log(data)
        })
        setFunctionRunning(true)

    }

    const getCart = () =>{
        fetch('/api/get-cart')
        .then((res)=>res.json())
        .then((data)=>{
          data.map((index)=>{
              setBuyer(index.buyer)
          })
        })
    }
    const handleFirstNameChange=(event)=>{
        setFirstName(event.target.value)
    }
    const handleLastNameChange=(event)=>{
        setLastName(event.target.value)
    }
    const handleEmailChange=(event)=>{
        setEmail(event.target.value)
    }
    const handleStreetChange=(event)=>{
        setStreet(event.target.value)
    }
    const handleNumberChange=(event)=>{
        setNumber(event.target.value)
    }
    const handleCountyChange=(event)=>{
        setCounty(event.target.value)
    }
    const handleCityChange=(event)=>{
        setCity(event.target.value)
    }
    const handlePhoneChange=(event)=>{
        setPhone(event.target.value)
    }
    const handleBlockedChange=(event)=>{
        setBlock(event.target.value)
    }
    const handleScaraChange=(event)=>{
        setScara(event.target.value)
    }
    const handleApartmentChange=(event)=>{
        setApartment(event.target.value)
    }
    const handlePostalCodeChange=(event)=>{
        setPostalCode(event.target.value)
    }

    return (
        <form ref={form} style={{paddingBottom:150}} onSubmit={handleSubmitBtn}>
            <Grid container spacing='1'>
                <Grid item xs={12} align="center" style={{margin:20}}>
                    <Typography variant='h5' component='h5'>
                        Completeaza cu datele tale
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:20}}>
                    <FormControl style={{width:"53.5%",float:'left'}}>
                        <Typography className={classes.root} fullWidth variant='h1' component='h3'>Nume</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:20}}>
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handleFirstNameChange} fullWidth id="standard-basic" label="Prenume" />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handleLastNameChange} fullWidth id="standard-basic" label="Nume" />
                        <FormHelperText>
                            <div align="center">
                                *Introduceti numele complet*
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:40,marginBottom:20}}>
                    <FormControl style={{width:"50%"}}>
                        <TextField inputLabelProps={{ required: true }} type='email' helperText={error} error={error} required onChange={handleEmailChange} fullWidth id="standard-basic" label="Email" />
                        <FormHelperText>
                            <div align="center">
                                *Completeaza cu un email valid pentru a putea primi informatii despre colet*
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:40,marginBottom:20}}>
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handlePhoneChange} fullWidth id="standard-basic" label="Număr de telefon" />
                        <FormHelperText>
                            <div align="center">
                                *Introdu un număr de telefon valabil*
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:20}}>
                    <FormControl style={{width:"53.5%",float:'left'}}>
                        <Typography className={classes.root} fullWidth variant='h5' component='h5'>Adresa</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField helperText={error} error={error} required onChange={handleStreetChange} style={{width:"45%"}} 
                        fullWidth label="Strada"
                        />
                    <TextField helperText={error} error={error} required onChange={handleNumberChange} style={{width:"5%",marginLeft:'4px'}} label="Nr">
                    </TextField>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField required={scara!==''} helperText={error} error={error} onChange={handleBlockedChange} style={{width:"16.5%"}} 
                        fullWidth label="Bloc"
                        />
                    <TextField helperText={error} error={error} onChange={handleScaraChange} style={{width:"16.5%",marginLeft:'4px'}} label="Scară">
                    
                    </TextField>
                    <TextField helperText={error} error={error} onChange={handleApartmentChange} style={{width:"16.5%",marginLeft:'4px'}} label="Apartament"></TextField>
                    <FormHelperText style={{width:'50%'}}>
                            <div align="center">
                                *Blocul, scara si apartamentul sunt campuri optionale daca locuiti la casa*
                            </div>
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{width:"50%"}}>
                        <TextField disabled label="Romania" helperText={error} error={error} fullWidth id="standard-basic" />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handleCountyChange} fullWidth id="standard-basic" label="Judet" />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginBottom:30}}>
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handleCityChange} fullWidth id="standard-basic" label="Oras" />
                        <FormHelperText>
                            <div align="center">
                                *Acest camp este obligatoriu astfel incat produsul va fi livrat corespunzator*
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginBottom:30}}>
                    <FormControl style={{width:"50%"}}>
                        <TextField helperText={error} error={error} required onChange={handlePostalCodeChange} fullWidth id="standard-basic" label="Cod postal" />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginTop:20}}>
                    <FormControl style={{width:"53.5%",float:'left'}}>
                        <Typography className={classes.root} fullWidth variant='h1' component='h3'>Metoda de plata</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl style={{width:"50%"}}>
                        <RadioGroup aria-label="gender" name="gender1" value={valueRadio} onChange={handleChangePayment}>
                            <FormControlLabel value="card de credit" control={<Radio />} label="Card de credit" />
                            {/* <FormControlLabel value="ramburs" control={<Radio />} label="Ramburs" /> */}
                        </RadioGroup>
                        <FormHelperText>
                            <div>
                                Din pacate, metoda de ramburs nu este inca disponibila
                            </div>
                        </FormHelperText><br></br>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" style={{marginBottom:30}}>
                    <Button type="submit" variant="contained" color="secondary">{funcRunning==true?<CircularProgress></CircularProgress>:'Continua cu plata'}</Button>
                </Grid>
                
            </Grid>
        </form>
    )
}
//REFA PAGINA ASTA!!!!
export default PersonalData
