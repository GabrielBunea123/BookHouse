import React from 'react'
import {Grid,Typography,FormControlTypeMap,Button,FormControl} from '@material-ui/core'
const Footer = () => {
    return (
        <footer style={{marginTop:100}} className="footer-container">
            <Grid container spacing={1}>
                <Grid style={{display:'inline-block',paddingTop:50}} item xs ={12}>
                    {/* <img className="title" height={100} width={100} src="/static/images/101 toBuy (2).png"></img> */}

                        <Typography style={{fontWeight:'bold'}} className="title" variant='h2'>Book House</Typography>
                        {/* <div className="media-links-container" align="center">
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-facebook"></i></a>
                            </Typography>
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </Typography>
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                            </Typography>
                        </div> */}
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
