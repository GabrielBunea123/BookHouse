import React from 'react'
import {Grid,Typography,FormControl} from '@material-ui/core'
const Footer = () => {
    return (
        <footer style={{marginTop:100}} className="footer-container">
            <Grid container spacing={1}>
                <Grid style={{paddingLeft:50,display:'inline-block',paddingTop:50}} item xs ={12}>
                    {/* <img className="title" height={100} width={100} src="/static/images/101 toBuy (2).png"></img> */}
                        
                        <Typography style={{fontWeight:'bold'}} className="title" variant='h2'>101 toBuy</Typography>
                        
                        <div className="media-links-container" align="center">
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-facebook"></i></a>
                            </Typography>
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </Typography>
                            <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                            </Typography>
                        </div>

                        <Typography className="contact-support" variant="p" component="p">
                            <a href="/contact-support">Contact and support</a>
                        </Typography>
                </Grid>
                {/* <Grid style={{display:'inline-block'}} item xs={12} align="center">
                    <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                        <i class="fab fa-facebook"></i>
                    </Typography>
                    <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                        <i class="fab fa-instagram"></i>
                    </Typography>
                    <Typography variant="h4" style={{display:'inline-block',paddingRight:40}}>
                        <i class="fab fa-twitter"></i>
                    </Typography>
                </Grid>
                <Grid style={{display:'inline-block'}} item xs={12} align="center">
                    <Typography variant="p" component="p">
                        <a href="/contact-support">Contact and support</a>
                    </Typography>
                </Grid> */}
                
            </Grid>
        </footer>
    )
}

export default Footer
