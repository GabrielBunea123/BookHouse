import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField,Grid,Button,Typography,Card,CardHeader,CardContent,CardActions,FormControl,FormControlLabel,Avatar,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { red } from '@material-ui/core/colors';

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

  const classes = useStyles()
  const history = useHistory();

  var authToken = localStorage.getItem('tokenAuth')

  const [categories,setCategories] = useState([])
  const [buyer,setBuyer] = useState('')
  const [searched,setSearched] = useState('')
  const [products,handleProducts] = useState([])
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [sidebar, setSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser,setAnchorElUser] = useState(null);
  const [user,setUser] = useState([])
  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser)

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }//csrftoken
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function getUser(){
    authToken = localStorage.getItem('tokenAuth')
    const requestOptions={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`
      }
    }
    fetch("/users/get-user",requestOptions)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.username){
        setIsAuthenticated(true)
        setUser(data)
      }
      else{
        setIsAuthenticated(false)
      }
    })
  }

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

  const handleUserMenu=(event)=>{
    setAnchorElUser(event.currentTarget)
    getUser();
  }
  const handleUserClose = (event) => {
    setAnchorElUser(null);
  };

  const authenticated=()=>{
    if(isAuthenticated==true){
      return(

        <div>
          <Card style={{marginBottom:5}}>
            <Grid item xs={12} align="center">
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    User
                  </Avatar>
                }
                title={`Logged in as: ${user.username}`}
                subheader={`${user.email}`}
              />
            </Grid>
          </Card>
          <MenuItem fullWidth onClick={handleLogout}>Logout</MenuItem>
        </div>
      )
    }
    else{
      return(
          <>
            <a style={{textDecoration:'none',color:"black"}} href="/login"><MenuItem>Sign in</MenuItem></a>
            <a style={{textDecoration:'none',color:"black"}} href="/register"><MenuItem>Create account</MenuItem></a>
          </>
      )
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleClick=(event)=>{
    const category = event.nativeEvent.target.outerText
    history.push({
      pathname: '/searched-results',
      state:category
    })
  }

  function handleSearchButton(){
    if(searched!=''){
      history.push({
        pathname: '/searched-results',
        state:searched
      })
    }
  }
  function handleOnChangeSearch(event){
    setSearched(event.target.value);

  }

  const handleLogout=()=>{
    const requestOptions={
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body:JSON.stringify({
        logout_user:isAuthenticated
      })
    }
    fetch("/users/logout",requestOptions)
    .then((res)=>res.json())
    .then((data)=>{
      localStorage.setItem("tokenAuth","")
      setIsAuthenticated(false)
      setAnchorElUser(false)
    })
  }
  useEffect(()=>{
    getProducts();
    getCategories();
    getFavouriteItems();
    getUser();
  },[])

  return (
    <div>
      <div className={sidebar==false ? "topnav" : "topnav responsive"} class="topnav" id="myTopnav">
        <a className="topnav-links logo" href="/">BookHouse</a>
        <a className="topnav-links" href={buyer!=''?`/favourite-products/${buyer}`:`/favourite-products/1`}>Produse Favorite <i class="fas fa-star"></i></a>
        <a className="topnav-links categories" onClick={handleMenu}>Categorii <i class="fas fa-book"></i></a>
        <a className="topnav-links cart" onClick={handleUserMenu}><i class="far fa-user"></i></a>
        <Menu id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} PaperProps={{style: {maxHeight:48 * 4.5,width: '30ch',},}} open={openUser} onClose={handleUserClose}>
          {authenticated()}
        </Menu>
        <a className="topnav-links cart" href="/cart">Cos de cumparaturi <i class="fas fa-shopping-cart"></i></a>
        <a className="topnav-links icon" onClick={()=>{setSidebar(!sidebar)}} href="javascript:void(0);" class="icon">
          <i class="fa fa-bars"></i>
        </a>
        <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} PaperProps={{style: {maxHeight:48 * 4.5,width: '30ch',},}} open={open} onClose={handleClose}>
        {categories.map((name)=>{
          return(
            <MenuItem onClick={handleClick}>{name.category}</MenuItem>
          )
        })}
      </Menu>
    </div>

    {/* searchbar */}

    <Grid className="searchbar-container" align="center" style={{paddingTop:'7px',paddingBottom:'7px'}} item xs={12}>
            <FormControl className="searchWidth" style={{display:'inline-block'}}>
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




