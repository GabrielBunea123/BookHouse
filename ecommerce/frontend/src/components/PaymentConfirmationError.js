import React,{useEffect} from 'react'
import { Grid,Typography,Button,FormControl } from '@material-ui/core'
import {Link} from 'react-router-dom'

const PaymentConfirmationError = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    return (
        <div>
            <Grid container spacing="1">
                <Grid item xs={12} align="center" style={{paddingTop:130}}>
                    <Typography variant="h4" component="h4">
                        A aparut o eroare.&#10060;
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Va rugam reincercati!
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" style={{paddingBottom:150}}>
                    <Link className="link" to="/"><Button color="primary" variant="contained">Intoarce-te acasa</Button></Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default PaymentConfirmationError
