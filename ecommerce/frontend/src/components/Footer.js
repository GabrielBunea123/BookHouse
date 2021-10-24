import React from 'react'
import {Grid,Typography,FormControlTypeMap,Button,FormControl} from '@material-ui/core'
const Footer = () => {
    return (
        <footer style={{marginTop:100}} className="footer-container">
            <Grid container spacing={1}>
                <Grid style={{display:'inline-block',paddingTop:50}} item xs ={12}>
                    <Typography style={{fontWeight:'bold'}} className="title" variant='h2'>Book House</Typography>
                    <Typography style={{paddingLeft:50}} className="contact-support" variant="p" component="p">
                        <FormControl>  
                            <a style={{textDecoration:'none'}} href="/contact-support"><Button variant="contained" color="secondary">Contact and support</Button></a>
                        </FormControl>
                    </Typography>
                </Grid>
                
            </Grid>
        </footer>
    )
}

export default Footer
