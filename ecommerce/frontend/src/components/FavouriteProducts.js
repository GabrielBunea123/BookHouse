import React,{useEffect,useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button,FormControl,Grid,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/'
import { Rating } from '@material-ui/lab';
import Footer from './Footer'
const useStyles=makeStyles((theme)=>({
  root1:{
    flexGrow: 1,
    margin:5
  },
}))
const FavouriteProducts = (props) => {
    const classes = useStyles()
    const [buyer,setBuyer]=useState(props.match.params.buyer)
    const [products,setProducts] = useState([])
    const getFavouriteProducts = () =>{
        fetch('/api/favourite-products'+'?buyer='+buyer)
        .then((res)=>res.json())
        .then((data)=>{
            setProducts(data)
            })
        }
      useEffect(()=>{
        getFavouriteProducts();
        window.scrollTo(0, 0);
    },[])
    function renderProducts(){
        return(
           
            products.map((item, index) => (
              <div className={classes.root1}>
              <div className="card-container" item xs={12} align="center">
                  <div className='card'>
                    
                    <img className="card-img" src={item.image ? item.image :'/static/images/noImage.png'} alt="Avatar"></img>
                    
                    <Button onClick={()=>{
                      const requestOptions={
                        method: 'POST',
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify({
                          author: item.author,
                          product_id:item.product_id,
                        })
                      }
                      fetch("/api/delete-favourite",requestOptions)
                      .then((res)=>res.json())
                      .then((data)=>getFavouriteProducts())
                    }} title="Delete" variant='contained' style={{float:'right'}} color="secondary"><i class="far fa-trash-alt"></i></Button>
                    <Link style={{paddingBottom:5}} className="link" to={`/product-details/${item.product_id}`}>
                    <div className="card-data">
                      <Typography component="h6" variant="h6"> {item.name.slice(0,30)}... </Typography> 
                    </div>
                    </Link>
                    {item.rating==0?<small>Evalueaza produsul</small>:<Rating name="read-only" value={item.rating} readOnly />}
                    <h2 className="card-price"><b>{item.price} RON</b></h2>
                  </div>
              </div>
            </div>
        )))
    }
    return( 
        <Grid container spacing="1" style={{paddingBottom:150}}>
            <Grid style={{color:"white"}} item xs={12} align="center">
              <FormControl style={{width:"70%",backgroundColor:"rgb(26, 3, 80)",padding:10,borderRadius:30,marginTop:10}}>
                <div className="fav-title-products">Produsele tale favorite</div>
              </FormControl>
            </Grid>
            <Grid className="home card-container" container spacing={1} alignContent="center">
                {products.length>0? 
                renderProducts():
                
                <Grid item xs={12} align="center">
                <Typography >
                  <h1>Nu s-au gasit produse</h1>
                </Typography>
              </Grid>
              }
            </Grid>
            
        </Grid>
    )
}

export default FavouriteProducts
