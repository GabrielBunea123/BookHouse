import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button, Typography } from '@mui/material';
import { makeStyles, withStyles } from "@mui/styles"
import { Link } from 'react-router-dom'
import MainButton from '../components/MainButton';

const Cart = () => {

  const [products, setProducts] = useState([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [user, setUser] = useState({})

  const handleQuantityChange = (quantity, id) => {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: quantity,
        product_id: id
      })
    }
    fetch("/api/change-cart-quantity", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        getCart()
      })
  }

  const getCart = () => {
    var price = 0
    setFinalPrice(0)
    fetch('/api/get-cart' + "?user=" + user.id)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        data.length > 0 && data.map((index) => {
          price += index.price
          setFinalPrice(price)
        })
      })
  }

  const removeFromCart = (id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: id
      })

    }
    fetch("/api/delete-from-cart", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        getCart()
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
        if (data.username)
          setUser(data)
        else setUser({ id: 'Anonymous' })
      })
  }


  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getCart();
  }, [user])

  return (
    <div className="container">
      <h3 className="py-3" style={{ color: "#24305E" }}>Shopping cart</h3>
      <div className="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((product) => (
              <tr>
                <th scope="col">
                  <img style={{ objectFit: "contain" }} src={product.image} height="50" width="50" />
                </th>
                <th scope="col"><a href={`product-details/${product.product_id}`}>{product.name}</a></th>
                <th scope="col">{product.quantity}</th>
                <th scope="col">{product.price}</th>
                <th scope="col"><Button onClick={() => removeFromCart(product.product_id)} variant="contained" style={{ backgroundColor: "#f50057" }}><i class="fa-solid fa-trash-can"></i></Button></th>
              </tr>
            ))
              :
              null
            }
          </tbody>
        </table>
      </div>
      <h4 className="pt-1 fw-bold">{finalPrice} RON</h4>
      <a style={{ textDecoration: 'none' }} href={`fill-in-personal-data`}><MainButton variant="contained" className='mt-4'>Continue</MainButton></a>
    </div>

  )
}

export default Cart
