import React, { useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import AddProductPage from './AddProductPage';
import { useHistory } from "react-router";
import Home from './Home';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField,Grid,Button,Typography,CardActions,FormControl} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Card,CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchBtn:{
    marginTop:7,
    marginLeft:20,
  },
}));


function Navbar(props) {

  const [categories,setCategories] = useState([])
  const [buyer,setBuyer] = useState('')
  const [searched,setSearched] = useState('')
  const [products,handleProducts] = useState([])
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [userEl,setUserEl] = useState(null)

  // const [displayed_form,setDisplayed_form] = useState("")
  function getProducts(){
    fetch("/api/home",)
      .then((res)=>res.json())
      .then((data)=>{
        handleProducts(data)
      })
  }

  function getCategories() {
    fetch("/api/category")
    .then((res)=>res.json())
    .then((data)=>setCategories(data))
  }
  function getFavouriteItems(){
    fetch('/api/favourite-products')
    .then((res)=>res.json())
    .then((data)=>{
      data.map((index)=>{
        setBuyer(index.author)
      })
    })
  }
  useEffect(()=>{
    getProducts();
    getCategories();
    getFavouriteItems();
  },[])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const category = event.nativeEvent.target.outerText
    history.push({
      pathname: '/searched-results',
      state:category
    })
    setAnchorEl(null);

  };

  function handleSearchButton(){
    history.push({
      pathname: '/searched-results',
      state:searched
    })
  }
  function handleOnChangeSearch(event){
    setSearched(event.target.value);

  }



  const [sidebar, setSidebar] = useState(false);

  const history = useHistory();
  return (
    <div>
      <div className={sidebar==false ? "topnav" : "topnav responsive"} class="topnav" id="myTopnav">
        <a className="topnav-links logo" href="/">Home</a>
        <a className="topnav-links" href={buyer!=''?`/favourite-products/${buyer}`:`/favourite-products/1`}>Produse Favorite <i class="fas fa-star"></i></a>
        <a className="topnav-links categories" onClick={handleMenu}>Categorii <i class="fas fa-book"></i></a>
        <a className="topnav-links cart" href="/cart">Cos de cumparaturi <i class="fas fa-shopping-cart"></i></a>
        {/* <div className="topnav-links cart">{props.logged_in ? logged_in_nav : logged_out_nav}</div>; */}
        <a className="topnav-links icon" onClick={()=>{setSidebar(!sidebar)}} href="javascript:void(0);" class="icon">
          <i class="fa fa-bars"></i>
        </a>
        <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxHeight:48 * 4.5,
            width: '20ch',
          },
        }}
        open={open}
        onClose={handleClose}
      >
        {categories.map((name)=>{
          return(
            <MenuItem onClick={handleClose}>{name.category}</MenuItem>
          )
        })}
      </Menu>
        
        {/* <div className={sidebar==false ? "search-container show-search" : "search-container"}>
        <form>
          <input onChange={handleOnChangeSearch} type="text" placeholder="Search" name="search"></input>
          <Button onClick={handleSearchButton}> <i class="fa fa-search"></i> </Button>
        </form>
      </div> */}
    </div>

    {/* searchbar */}

    <Grid className="searchbar-container" align="center" style={{paddingTop:'7px',paddingBottom:'7px'}} item xs={12}>
            <FormControl style={{display:'inline-block',width:"70%"}}>
            <Autocomplete
                className="searchbar"
                options={products.map((option) => option.name)}
                onChange={(event, value) => setSearched(value)}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                style={{ width: '60%',verticalAlign:'top'}}
                renderInput={(params) => <TextField InputProps={{ ...params.InputProps, type: 'search' }} {...params} style={{width:'100%',background:'white'}} fullWidth onChange={handleOnChangeSearch} id="outlined-search" label="Cauta produs" type="search" variant="outlined" />}
              />
              {/* <TextField style={{width:'60%',background:'white'}} className="searchbar" fullWidth onChange={handleOnChangeSearch} id="outlined-search" label="Search product" type="search" variant="outlined" /> */}
              <Button style={{width:'10%',background:"rgb(26, 3, 80)",color:'white',display:"inline-block"}} className={classes.searchBtn} onClick={handleSearchButton}>Cauta</Button>
            </FormControl>
            
          </Grid>
    </div>
  );
}

export default Navbar;




