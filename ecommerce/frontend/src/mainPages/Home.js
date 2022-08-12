import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles"
import ProductCard from '../components/ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 2,
      width: '25ch',
    },
  },
  media: {
    height: 200,
  },
  searchBtn: {
    marginTop: 7,
    marginLeft: 20,
  },
  root1: {
    flexGrow: 1,
    margin: 5
  },
  paper: {
    padding: 1,
    textAlign: 'center',
    color: "black",
  }

}));

const Home = (props) => {
  const [products, handleProducts] = useState([])
  const [searched, setSearched] = useState('')
  const [searched_items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [reviews, setReviews] = useState([])
  const classes = useStyles()


  function getProducts() {
    fetch("/api/home",)
      .then((res) => res.json())
      .then((data) => {
        handleProducts(data)
      })
  }
  function getReviews() {
    fetch('/api/get-reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))

  }
  function getCategories() {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }
  useEffect(() => {
    getProducts();
    getCategories();
    getReviews();
    window.scrollTo(0, 0);
  }, []);//CALL THE FUNCTION SO IT DOESN'T ENTER INFINITE LOOP
  function handleOnChangeSearch(event) {
    setSearched(event.target.value);
  }

  function renderCategories() {
    return (
      <Grid spacing={1} align="center">
        {categories.slice(0, 4).map((item, index) => (
          <Grid style={{ marginRight: 40, marginBottom: 40 }} className="home-categories-container" item xs={12} align='center'>
            <Typography style={{ paddingTop: '40%' }} component="h4" variant="h6">
              {item.category}
            </Typography>
          </Grid>
        ))}
      </Grid>
    )

  }
  function renderProducts() {
    if (searched_items.length == 0) {
      return (
        <>
          {products.map((item, index) => (
            <ProductCard item={item} />
          ))}
        </>
      )



    }
    else {
      return (
        <Grid item xs={12} align="center">
          <Typography >
            <h1>Nu s-au gasit produse</h1>
          </Typography>
        </Grid>
      )
    }
  }
  return (
    <div className="container">
      <div className="bh-img">
        <div className="bh-img-text">
          <div className="bh-img-quote">"It is not that we have a short time to live, but that we waste a lot of it"</div>
          {/* <div className="bh-img-author">Seneca</div> */}
        </div>
      </div>
      <div class="container bg-trasparent my-4 p-3" style={{ position: 'relative' }}>
        <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {renderProducts()}
        </div>
      </div>

    </div>
  )
}

export default Home
