import React,{useState,useEffect} from 'react'
import {Paper,Button,Grid,Typography,TextField,FormHelperText,FormControl,Radio,RadioGroup,FormControlLabel} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/'
import { FaCreativeCommonsNcJp } from 'react-icons/fa';
import { useHistory } from "react-router";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ProductDetails from './ProductDetails';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    // card:{
    //   maxWidth:345,
    //   width:320,
    // },
    media:{
      height:200,
    },
    searchBtn:{
      marginTop:7,
      marginLeft:20,
    },
    root1:{
      flexGrow: 1,
      margin:5
    },
    paper:{
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
   
  }));

const Home = (props) => {
    const [products,handleProducts] = useState([])
    const [searched,setSearched] = useState('')
    const [searched_items,setItems] = useState([])
    const [categories,setCategories] = useState([])
    const [reviews,setReviews] = useState([])
    const [averageRating,setAverageRating] = useState(0)
    const category = props.history.location.state
    const history = useHistory();
    const classes = useStyles()

    // if (category) {
    //   handleSearchButton()
    //   history.replace('', null);
    // }



    function getProducts(){
      fetch("/api/home",)
      .then((res)=>res.json())
      .then((data)=>{
        handleProducts(data)
      })
    }
    function getReviews(){
      fetch('/api/get-reviews')
      .then((res)=>res.json())
      .then((data)=>setReviews(data))//CHANGE HERE
      
    }
    function getCategories() {
      fetch("/api/category")
      .then((res)=>res.json())
      .then((data)=>setCategories(data));
    }
    useEffect(() => {
      getProducts();
      getCategories();
      getReviews();
      window.scrollTo(0, 0);
    }, []);//CALL THE FUNCTION SO IT DOESN'T ENTER INFINITE LOOP
    function handleOnChangeSearch(event){
      setSearched(event.target.value);
    }

    function renderCategories(){
      return( 
        <Grid spacing={1} align="center">
        {categories.slice(0,4).map((item, index) => (
          <Grid style={{marginRight:40,marginBottom:40}} className="home-categories-container" item xs={12} align='center'>
            <Typography style={{paddingTop:'40%'}} component="h4" variant="h6">
                {item.category}
            </Typography>
          </Grid> 
      ))}
      </Grid>
      )
      
    }
    function renderTask(){
      if (searched_items.length==0){
          return( 
            <Grid className={`home`} container spacing={1} alignContent="center">
            {products.map((item, index) => (
              <div className={classes.root1}>
                <div className="card-container" item xs={12} align="center">
                  <Link className="link" to={`/product-details/${item.id}`}>
                    <div className='card'>
                      <img className="card-img" src={item.image ? item.image :'/static/images/noImage.png'} alt="Avatar"></img>
                      <div className="card-data">
                        <Typography component="h6" variant="h6"> {item.name.slice(0,30)} </Typography> 
                      </div>
                        {item.rating==0?<small>Evalueaza produsul</small>:<Rating name="read-only" value={item.rating} readOnly />}
                      <h2 className="card-price"><b>{item.price} Lei</b></h2>
                    </div>
                  </Link>
                </div>
              </div>
          ))}
          </Grid>
          )



      }
      else{
        return(
          <Grid item xs={12} align="center">
            <Typography >
              <h1>Nu s-au gasit produse</h1>
            </Typography>
          </Grid>
        )
      }
      }
    return (
        <div style={{paddingBottom:150}}>
           
          <div class='banner'>
              <div class='banner-text'>
                  <Typography component="h1" variant="h1">Book House</Typography>
                  <Typography component="p" variant="h6">Best book buying website</Typography>
              </div>
          </div>
          {/* {renderCategories()} */}
          
          
            {renderTask()}
        </div> 
    )
}

export default Home
