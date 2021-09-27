import React,{useEffect} from 'react'
import { Grid,Typography,Button,FormControl } from '@material-ui/core'
import {Link} from 'react-router-dom'

const RambursError = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div>
            <Grid container spacing="1">
                <Grid item xs={12} align="center" style={{paddingTop:130}}>
                    <Typography variant="h4" component="h4">
                        A aparut o eroare.&#10060;
                    </Typography>
                    <FormControl style={{width:'60%'}}>
                        <Typography variant="h4" component="h4">
                            Sugestie: daca ati completat unul dintre campurile bloc, scara sau apartament, toate cele 3 campuri trebuie sa fie completate;
                        </Typography>
                    </FormControl>
                    <Typography variant="h4" component="h4">
                        Reincercati!
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" style={{paddingBottom:150}}>
                    <Link className="link" to="/"><Button color="primary" variant="contained">Return Home</Button></Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default RambursError
