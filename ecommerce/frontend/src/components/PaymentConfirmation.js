import React,{useEffect} from 'react'
import { Grid,Typography,Button } from '@material-ui/core'
import {Link} from 'react-router-dom'

const PaymentConfirmation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    return (
        <div>
            <Grid container spacing="1">
                <Grid item xs={12} align="center" style={{paddingTop:130}}>
                    <Typography variant="h4" component="h4">
                        Plata ta a fost confirmata.	&#9989;
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Iti multumim pentru ca ai ales serviciile noastre !
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" style={{paddingBottom:150}}>
                    <Link className="link" to="/"><Button color="primary" variant="contained">Intoarce-te acasa</Button></Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default PaymentConfirmation
