import React,{useState,useEffect} from 'react'
import {ReactDOM} from 'react'
import {Grid,Typography,Button,TextField,FormControl,Paper} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Collapse} from '@material-ui/core'
import {Alert} from "@material-ui/lab"
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 300,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor:'rgb(233, 233, 233)',
        height:300,
        paddingTop:25,
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
        marginLeft: 12,
        marginRight: 12,
      },
      name:{
          marginLeft:'30px',
          color: '#3f51b5'
      },
      description: {
        marginTop:12,
        marginBottom:12,
      },
      root1:{
        flexGrow: 1,
        margin:5
      },
      root2:{
        color:'black',
        maxWidth:"70%",
        marginTop:12,
        marginBottom:12,
        
      },
      showHide:{
          display:'none'
      },
      info:{
          marginTop:5,
          marginBottom:12,
      },
      root3:{
        minWidth: 275,
      }
}))
const ProductDetails = (props) => {
    const classes = useStyles();
    const [product,handleProduct] = useState({})
    const [productImage,setProductImage] = useState([])
    const [sameCategoryProducts,setSameCategoryProducts] = useState([])
    const [id,setId] = useState(props.match.params.id)
    const [successMsg,setSuccessMsg] = useState('')
    const [errorMsg,setErrorMsg]=useState('')
    const [showDescription,setShowDescription] = useState(false)
    const [showReviews,setShowReviews] = useState(false)
    const [value, setValue] = useState(2);//stars value
    const [reviewInput,setReviewInput] = useState('')
    const [reviews,setReviews] = useState([])
    const [currentImage,setCurrentImage]=useState(0)
    const [favouriteProduct,setFavouriteProduct] = useState(false)
    const [shuffledArray,setShuffledArray] = useState([])
    useEffect(()=>{
        getProduct()
        getReviews()
        getProductImage()
        checkForFav()
        window.scrollTo(0, 0);
    },[])

    function getProduct(){
        fetch('/api/product-details'+'?id='+id)
        .then((res)=>res.json())
        .then((data)=>{handleProduct(data);getSameCategoryProducts(data)})
    }
    function getProductImage(){
        fetch('/api/product-details-image'+"?id="+id)
        .then((res)=>res.json())
        .then((data)=>{
            setProductImage(data);
        })
    }
    function getSameCategoryProducts(e){//get items with the same category
        fetch("/api/product-details-category"+"?category="+e.category)
        .then((res)=>res.json())
        .then((data)=>{
            setSameCategoryProducts(data);
            setShuffledArray(data.sort(() => 0.5 - Math.random()))
        })
    } //RENDER THE DATA ON THE PAGE 08.09.2021!!!!!!
    function renderSameCategoryProducts(){
            return(
                <Grid className={`home`} container spacing={1} alignContent="center">
                    {shuffledArray.slice(0,4).map((item, index) => (
                    <div className={classes.root1}>
                        <div className="card-container" item xs={12} align="center">
                        <a className="link" href={`/product-details/${item.id}`}>
                            <div className='card'>
                            <img className="card-img" src={item.image ? item.image :'/static/images/noImage.png'} alt="Avatar"></img>
                            <div className="card-data">
                                <Typography component="h6" variant="h6"> {item.name.slice(0,50)} </Typography> 
                            </div>
                            <h2 className="card-price"><b>{item.price} Lei</b></h2>
                            </div>
                        </a>
                        </div>
                    </div>
                ))}
                </Grid>
            )
    }
    function checkForFav(){
        fetch('/api/check-for-fav'+"?id="+id)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.added_to_favourite){
                setFavouriteProduct(true)
            }
        })
    }
    function handleDescriptionButton(){
        setShowDescription(!showDescription)
    }
    function showReviewsButton(){
        setShowReviews(!showReviews)
    }
    function reviewInputChange(e){
        setReviewInput(e.target.value)
    }
    function handleReviewSubmit(){
        const reviewsNeeded= reviews
        const requestOptions ={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                creator:'1',
                rating:value,
                comment:reviewInput,
                product_id:id
            })
        }
        fetch('/api/add-review',requestOptions)
        .then((res)=>{
            if(res.ok){
                setSuccessMsg("Review-ul a fost adaugat. Multumim !")
            }
            else{
                setErrorMsg("S-a ivit o eroare. Reincercati !")
            }
            return res.json()
        })
        .then((data)=>{
            const updatedArray = [...reviews, data];//append to the existing array of useState
            setReviews(updatedArray)
        })
        setValue(2)
        setReviewInput('')
        setShowReviews(false)
    }
    function getReviews(){
        fetch('/api/get-reviews'+'?product_id='+id)
        .then((res)=>res.json())
        .then((data)=>setReviews(data))
    }
    function addToFavourite(){
        setFavouriteProduct(true)
        const requestOptions={
            method: "POST",
            headers:{'Content-Type': "application/json"},
            body:JSON.stringify({
                name:product.name,
                description:product.description,
                price:product.price,
                currency:product.currency,
                category:product.category,
                // image:product.image,
                product_id:id,
                rating:product.rating,
                author:product.author,
                added_to_favourite:true
            })
        }
        fetch('/api/add-to-favourite',requestOptions)
        .then((res)=>{
            if(res.ok){
                setSuccessMsg("Produsul a fost adaugat la produse favorite.")
            }
            else{
                setErrorMsg("S-a ivit o eroare. Reincercati !")
            }
        })
        .then((data)=>{})
    }

    function addToCart(){
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
                name:product.name,
                // buyer:product.author,
                price:product.price,
                currency:product.currency,
                stock:product.stock,
                rating:product.rating,
                quantity:1,
                product_id:product.id,
                stock:product.stock,
                // image:product.image`
            })
        }
        fetch('/api/cart',requestOptions)
        .then((res)=>{
            if(res.ok){
                setSuccessMsg("Produsul a fost adaugat in cosul de cumparaturi")
            }
            else{
                setErrorMsg("S-a ivit o eroare. Reincercati !")
            }
        })
        .then((data)=>{
            
        })
    }
    function next(){
        if(currentImage<productImage.length-1){
            setCurrentImage(currentImage+1)
        }
    }
    function prev(){
        if(currentImage>0){
            setCurrentImage(currentImage-1)
        }
    }
    function renderCarousel(){
        
        return(
        <div className="slideshow-container">
                
                {productImage.map((index,key)=>{
                    return(
                    <div className={currentImage==key?"fade": "mySlides fade"}>
                    <img className="img-carousel" src={`${index.image}`} style={{width:'100%',maxWidth:500}}></img>
                    </div>
                    )
                })}

                <a className="prev" onClick={prev}>&#10094;</a>
                <a className="next" onClick={next}>&#10095;</a>

            </div>
        )
    }
    return (
        <Grid style={{paddingBottom:150,overflowY:'scroll'}} className="details-container" container spacing={1} align="center">
            {/* {renderCarousel()} */}
            <Grid item xs = {12} align="center">
                <Collapse in={errorMsg !="" || successMsg!=""}>
                    {successMsg !="" ?(<Alert severity="success">{successMsg}</Alert>):(<Alert severity="error">{errorMsg}</Alert>)}
                </Collapse>

            </Grid>
            <Grid className={classes.name} item xs = {12}>
                <Typography variant="h4" component="h5">{product.name}</Typography>
            </Grid>
            <Grid className='image-container' item xs = {12}>
                <div className='image-container'>
                    {/* <img className="image-product-details" src={product.image?product.image:'/static/images/noImage.png'}></img> */}
                    {renderCarousel()}
                </div>
                <Card className={`${classes.root} add-to-chart`}>
                    <CardContent>
                        <Typography variant="h5" component="h5">
                        Price: {product.price} Lei
                        </Typography>
                    </CardContent>
                    <Grid item xs={12} align="center">
                        {product.stock>0?<Link className="link" to={`/fill-in-personal-data`}><Button onClick={addToCart} className="continue-btn" variant="contained" color="secondary">Cumpara acum</Button></Link>:<Button disabled variant="contained" size="small" color="primary">Nu e pe stoc</Button>}
                    </Grid><br></br>
                    <Grid item xs={12} align="center">
                        
                        {product.stock>0? <Button onClick={addToCart} variant="contained" size="small" color="primary">Adauga in cos</Button>:<Button disabled variant="contained" size="small" color="primary">Nu e pe stoc</Button>}
                    </Grid><br></br>
                    <Grid item xs={12} align="center">
                    {favouriteProduct!=true?
                    
                        <Button style={{backgroundColor:'rgb(120, 240, 96)',color:'white'}} onClick={addToFavourite} variant="contained" size="small">Adauga la favorite</Button>
                    :null
                    }
                    </Grid>
                    <br></br>
                    <Typography className={classes.pos} color="textSecondary">
                        Daca adaugi in cos poti continua cumparaturile
                    </Typography>
                </Card>
                <Typography style={{marginTop:5}} variant="h6" component="h6">
                    Plata cu cardul <i class="fab fa-cc-visa"></i> <i class="fab fa-cc-mastercard"></i> <i class="fab fa-cc-amex"></i> <i class="fab fa-cc-discover"></i>
                </Typography>

            </Grid>
            <Grid className='reviews-description-container' item xs={12} align="center">
                <ul style={{listStyleType: 'none',paddingTop:50}}>
                    <li className={classes.info}>
                        <FormControl style={{width:'98%'}}>
                            <Button style={{height:70,fontSize:18,backgroundColor:"rgb(255, 153, 58)",borderRadius:50,color:'white'}} onClick={handleDescriptionButton} fullWidth>Descriere</Button>
                        </FormControl>
                        {/* {showDescription==false?<i class="fas fa-arrow-right"></i>:<i class="fas fa-arrow-down"></i>} */}
                    </li>
                    <Grid item xs={12} align="center" >
                        <div className={`${showDescription==false? classes.showHide :null} description-details`}>
                            <Typography variant="h6" component="h5">
                                {product.description}
                            </Typography>
                        </div>
                    </Grid>
                    <li className={classes.info}>
                        <FormControl style={{width:'98%'}}>
                            <Button onClick={showReviewsButton} style={{marginTop:20,height:70,fontSize:18,backgroundColor:"rgb(255, 153, 58)",borderRadius:50,color:'white'}} fullWidth>Reviews ({reviews.length})</Button> 
                        </FormControl>
                    </li>
                        {reviews.length>0 ?reviews.map((index)=>{
                            return(
                            <Grid style={{marginTop:12}} item className={`${showReviews==false? classes.showHide :null} review-container`} align='center'>
                                <div className="review-username">User</div>
                                <Box fullWidth component="fieldset" mb={3} borderColor="transparent">
                                    <Rating name="read-only" value={index.rating} readOnly />
                                </Box>
                                <div className='review-comment'>
                                    {index.comment}
                                </div>
                            </Grid>
                            )
                        }):null}
                </ul>
                <Grid item xs={12} align="center">
                    <Box style={{display:'inline-block'}} component="fieldset" mb={3} borderColor="transparent">
                        <Typography variant="h6" component="h5">Evalueaza produsul  </Typography>
                        <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        />
                    </Box>
                    <FormControl style={{width:'70%'}}>
                        <TextField value={reviewInput} onChange={reviewInputChange} fullWidth id="outlined-search" label="Aduga o parere" type="search" variant="outlined" inputLabelProps={{ required: true }} multiline rows={3}></TextField>
                    </FormControl>
                    
                    </Grid>
                    <Grid item xs={12} align="center" style={{marginTop:12}}>
                        {reviewInput.length!=0 ?<Button onClick={handleReviewSubmit} variant='contained' color='secondary'>Submit</Button>:null}
                    </Grid>
                    <Grid item xs = {12} align="center">
                        <Collapse in={errorMsg !="" || successMsg!=""}>
                            {successMsg !="" ?(<Alert severity="success">{successMsg}</Alert>):(<Alert severity="error">{errorMsg}</Alert>)}
                        </Collapse>

                    </Grid>
            </Grid>
                <Typography style={{padding:50}} variant="h4" component="h4">
                    Alte produse de care ai putea fi interesat
                </Typography>
                <Grid item xs = {12} align="center">
                    {renderSameCategoryProducts()}
                </Grid>
        </Grid>
    )
}

export default ProductDetails
