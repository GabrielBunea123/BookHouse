import React,{useEffect} from 'react'
import { useHistory } from "react-router";
import { Grid,Typography,Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
const RambursSuccessfull = () => {
    const history = useHistory();
    //MAKE IT LOOK BETTER
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div>
            <Grid container spacing="1">
                <Grid item xs={12} align="center" style={{paddingTop:130}}>
                    <Typography variant="h4" component="h4">
                        Comanda a fost plasata. Veti primi un email de confirmare.	&#9989;
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Mai mult informatii in email
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Multumim ca ati ales seriviciile noastre !
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" style={{paddingBottom:150}}>
                    <Link className="link" to="/"><Button color="primary" variant="contained">Intoarce-te acasa</Button></Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default RambursSuccessfull
