import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating, Button, FormControl, Grid, Typography, CardMedia, CardContent, CardActions, CardActionArea, Card } from '@mui/material';
import { makeStyles } from "@mui/styles"
import ProductCard from '../components/ProductCard';
import MainButton from '../components/MainButton';
import CoffeeMachine from '../components/CoffeeMachine';


const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
    margin: 5
  },
}))
const FavouriteProducts = (props) => {

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({})

  const getFavouriteProducts = () => {
    fetch('/api/favourite-products' + '?author=' + user.id)
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          item.id = item.product_id //POSSIIBLE BUG IN THE FUTURE BECAUSE THE FAVOURITE PRODUCT ID IS DIFFERENT FROM THE ACTUAL PRODUCT ID
        })
        setProducts(data)
      })
  }

  function getUser() {
    var authToken = localStorage.getItem('tokenAuth')
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`
      }
    }
    fetch("/users/get-user", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data.username)
          setUser(data)
        else setUser({id:'Anonymous'})
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getFavouriteProducts();
  }, [user])


  function renderProducts() {
    return (

      products.map((item, index) => (
        <ProductCard item={item} />
      )))
  }



  return (
    <div className="container">
      <h3 className="py-3" style={{ color: "#24305E" }}>Favourite products</h3>
      {products.length > 0 ?
        <div class="container bg-trasparent my-4 p-3" style={{ position: 'relative' }}>
          <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            {renderProducts()}
          </div>
        </div>
        :
        null
      }

      <div className="d-flex justify-content-center my-5 mx-2">
        <div className="card shadow rounded p-5 w-100" style={{ border: 0 }}>

          <div className="d-flex justify-content-center text-center">
            <h5 className="w-50">Grab a coffee and start looking for products that you are interested in. Press the heart button to add them to your wishlist</h5>
          </div>

          <CoffeeMachine />

          <div className="text-center mt-5">
            <a style={{ textDecoration: "none" }} href="/"><MainButton variant="contained">Discover more</MainButton></a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FavouriteProducts
