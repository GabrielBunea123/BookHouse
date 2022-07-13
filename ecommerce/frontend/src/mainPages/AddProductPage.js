import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField, FormControl, FormControlLabel, Collapse, Alert, InputLabel, MenuItem, Select, Radio, RadioGroup } from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import MainButton from '../components/MainButton';

const useStyles = makeStyles({
  root: {
  },
  formControl: {
    minWidth: 120,
  },

})

const AddProductPage = (props) => {
  const classes = useStyles()
  const [currency, setCurrency] = useState('RON');
  const [name, setName] = useState('');
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('Tech')
  const [categories, getAllCategories] = useState([])
  const [stock, setStock] = useState(0)
  const [regislat, setRegislat] = useState(false)
  const [regislatString, setRegislatString] = useState('false')

  useEffect(() => {
    getCategories();
  }, [])

  const nameChange = (event) => {
    setName(event.target.value)
  }
  const descriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const priceChange = (event) => {
    setPrice(event.target.value)
  }
  const imageChange = (event) => {
    setImage(event.target.files[0])
  }
  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }
  const handleStockChange = (event) => {
    setStock(event.target.value)
  }
  const handleChangeRegislat = (event) => {
    setRegislatString(event.target.value)
    if (event.target.value == "true") {
      setRegislat(true)
    }
    else {
      setRegislat(false)
    }
  }

  function getCategories() {
    fetch("api/category")
      .then((res) => res.json())
      .then((data) => {
        getAllCategories(data)
      })
  }
  function handleSubmitButtonPressed() {
    var data = new FormData(); // creates a new FormData object

    data.append("image", image)
    data.append("currency", currency);
    data.append("price", price)
    data.append("description", description)
    data.append("name", name)
    data.append("category", category)
    data.append("stock", stock)
    data.append("regislat", regislat)

    axios({
      method: "POST",
      url: "/api/add-product/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 6tEg0RinS5rxyZ8TX84Vc6qXuR2Xxw"
      },
      data
    })
      .then((res) => {
        if (!res.ok) {
          setSuccessMsg("The product has been added.")
        }
        else { setErrorMsg("Error occurred. Please try again.") }
      })
      .then((err) => console.log(err));
  }
  return (
    <div className="container">
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse in={errorMsg != "" || successMsg != ""}>
            {successMsg != "" ? (<Alert severity="success">{successMsg}</Alert>) : (<Alert severity="error">{errorMsg}</Alert>)}
          </Collapse>

        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4" className="pt-4 pb-4">
            Add new product
          </Typography>
        </Grid>
        <Grid item xs={12} className="pb-3 pt-3">
          <FormControl style={{ width: "100%" }}>
            <TextField
              onChange={nameChange}
              style={{ width: "100%" }}
              className={`${classes.root}`}
              inputLabelProps={{ required: false, style: { color: "orange" } }}
              id="outlined-basic" label="Name"
              variant="outlined"
              inputProps={{ style: { color: "black" } }} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-3">
          <FormControl style={{ width: "100%" }}>
            <TextField
              onChange={descriptionChange}
              multiline rows={4}
              style={{ width: "100%" }}
              className={classes.root}
              inputLabelProps={{ required: false, style: { color: "orange" } }}
              id="outlined-basic"
              label="Describe the product"
              variant="outlined"
              inputProps={{ style: { color: "black" } }} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-3">
          <FormControl style={{ width: "100%" }}>
            <input className="form-control" onChange={imageChange} type='file'></input>
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-2">
          <TextField onChange={priceChange} style={{ width: "100%" }}
            className={classes.root}
            inputLabelProps={{ required: false, style: { color: "orange" } }}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            inputProps={{ style: { color: "black" } }}
            type="number"
          />
        </Grid>
        <Grid item xs={12} className="py-3">
          <FormControl style={{ width: "100%" }}>
            <TextField
              onChange={handleStockChange}
              style={{ width: "100%" }}
              className={classes.root}
              inputLabelProps={{ required: false, style: { color: "orange" } }}
              id="outlined-basic" label="Avaliable products"
              variant="outlined"
              inputProps={{ style: { color: "black" } }} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-3">
          <FormControl style={{ width: "100%" }}>
            <RadioGroup aria-label="gender" name="gender1" value={regislatString} onChange={handleChangeRegislat}>
              <FormControlLabel value="true" control={<Radio />} label="Regislat" />
              <FormControlLabel value="false" control={<Radio />} label="Nou" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-3">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((name) => {
                return (
                  <MenuItem value={name.category}>{name.category}</MenuItem>)
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className="py-3">
          <MainButton onClick={handleSubmitButtonPressed} variant="contained">
            Submit
          </MainButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddProductPage
