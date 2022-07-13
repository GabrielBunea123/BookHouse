import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { TextField, Grid, Button, Typography, Card, CardHeader, CardContent, CardActions, FormControl, FormControlLabel, Avatar, IconButton, MenuItem, Menu, red, Autocomplete } from '@mui/material'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: 3,
  },
  formControl: {
    margin: 3,
    minWidth: 120,
  },
  searchBtn: {
    marginTop: 7,
    marginLeft: 20,
  },
}));


function Navbar(props) {

  const classes = useStyles()
  const history = useHistory();

  const [categories, setCategories] = useState([])
  const [buyer, setBuyer] = useState('')
  const [searched, setSearched] = useState('')
  const [products, handleProducts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebar, setSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState([])
  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser)

  // function getUser() {
  //   var authToken = localStorage.getItem('tokenAuth')
  //   const requestOptions = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${authToken}`
  //     }
  //   }
  //   fetch("/users/get-user", requestOptions)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.username) {
  //         setIsAuthenticated(true)
  //         setUser(data)
  //       }
  //       else {
  //         setIsAuthenticated(false)
  //       }
  //     })
  // }

  function getProducts() {
    fetch("/api/home",)
      .then((res) => res.json())
      .then((data) => {
        handleProducts(data)
      })
  }

  function getCategories() {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }
  function getFavouriteItems() {
    fetch('/api/favourite-products')
      .then((res) => res.json())
      .then((data) => {
        data.map((index) => {
          setBuyer(index.author)
        })
      })
  }

  const handleUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
    // getUser();
  }
  const handleUserClose = (event) => {
    setAnchorElUser(null);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };


  function handleSearchButton() {
    if (searched != '') {
      history.push({
        pathname: `/searched-results/${searched}`
      })
    }
  }
  function handleOnChangeSearch(event) {
    setSearched(event.target.value);

  }

  
  useEffect(() => {
    getProducts();
    getCategories();
    getFavouriteItems();
    // getUser();
  }, [])

  return (

    <nav class="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#24305E" }}>
      <div class="container">
        <a class="navbar-brand fw-bold topnav-links" href="/">BookHouse</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link navbar-brand active fw-semibold topnav-links" aria-current="page" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link navbar-brand active fw-semibold topnav-links" aria-current="page" href={buyer != '' ? `/favourite-products/${buyer}` : `/favourite-products/1`}>Favourite</a>
            </li>
            <li class="nav-item">
              <a class="nav-link navbar-brand active fw-semibold topnav-links" aria-current="page" href="/cart">Shopping cart</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input className="form-control" onChange={handleOnChangeSearch} id="outlined-search" placeholder="Name, author, editure" type="search" />
            <a href={searched!=''? `http://127.0.0.1:8000/searched-results/${searched}`:null} class="btn btn-outline-light ms-2" type="submit">Search</a>
          </form>
        </div>
      </div>
    </nav>
  );
}

//aCCOUNT/USER

{/* <a className="topnav-links cart" onClick={handleUserMenu}><i class="far fa-user"></i></a> */ }


//SEARCHBAR

export default Navbar;




