import React,{useState,useEffect} from 'react'
import {Button,Grid,Typography,TextField,FormControl} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/'
import {Collapse} from '@material-ui/core'
import {Alert} from "@material-ui/lab"
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
          color: 'orange',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'orange',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'orange',
          },
          '&:hover fieldset': {
            borderColor: 'orange',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'orange',
          },
        },
      },
      mar:{
        // display:'none'
      },
      formControl: {
        margin: 3,
        minWidth: 120,
      },

})


const currencies = [
    {
      value: 'RON',
      label: 'RON',
    },
  ];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


const AddProductPage = (props) => {
    const classes=useStyles()
    const [currency, setCurrency] = React.useState('EUR');
    const [name,setName] = React.useState('');
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState(0)
    const [image,setImage]=useState([])
    const [successMsg,setSuccessMsg] = useState('')
    const [errorMsg,setErrorMsg]=useState('')
    const [category,setCategory]=useState('')
    const [categories,getAllCategories]=useState([])
    const [stock,setStock]=useState(0)

    useEffect(() => {
      getCategories();
    }, [])

    const handleChange = (event) => {
        setCurrency(event.target.value);
      };
    const nameChange=(event)=>{
        setName(event.target.value)
    }
    const descriptionChange=(event)=>{
        setDescription(event.target.value)
    }
    const priceChange=(event)=>{
        setPrice(event.target.value)
    }
    const imageChange=(event)=>{
        setImage(event.target.files)
    }
    const handleCategoryChange=(event)=>{
      setCategory(event.target.value)
    }
    const handleStockChange=(event)=>{
      setStock(event.target.value)
    }

    function getCategories(){
      fetch("api/category")
      .then((res)=>res.json())
      .then((data)=>{
        getAllCategories(data)
      })
    }
    function handleSubmitButtonPressed(){
        let data = new FormData(); // creates a new FormData object
        [...image].map((index,key)=>{
          data.append("image",index)
        })
        // data.append("images[]",[...image].map((index,key)=>{index})); // add your file to form data
        data.append("currency",currency); 
        data.append("price",price)
        data.append("description",description)
        data.append("name",name)
        data.append("category",category)
        data.append("stock",stock)

        console.log(currency,price,description,name,category,stock)

    
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/add-product",
          headers: {
          
            Authorization: "Bearer 6tEg0RinS5rxyZ8TX84Vc6qXuR2Xxw"
          },
          data
        })
          .then((res) => {
              if(!res.ok){
                setSuccessMsg("The product has been added.")
              }
              else{setErrorMsg("Error occurred. Please try again.")}
          })
          .catch((err) => console.log(err));
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs = {12} align="center">
                <Collapse in={errorMsg !="" || successMsg!=""}>
                    {successMsg !="" ?(<Alert severity="success">{successMsg}</Alert>):(<Alert severity="error">{errorMsg}</Alert>)}
                </Collapse>

            </Grid>
            <Grid item xs = {12} align="center">
                <Typography>
                    <h1>Add a new product</h1>
                </Typography>
            </Grid>
            <Grid item xs = {12} align="center">
                <FormControl style={{width:"70%"}}>
                    <TextField 
                        onChange={nameChange} 
                        style={{width:"100%"}} 
                        className={classes.root} 
                        inputLabelProps={{ required: false,style:{color:"orange"} }} 
                        id="outlined-basic" label="Name" 
                        variant="outlined"  
                        inputProps={{min:1,style:{textAlign:'center',color:"black"}}} />
                </FormControl>
            </Grid>
            <Grid item xs = {12} align="center">
                <FormControl style={{width:"70%"}}>
                    <TextField
                        onChange={descriptionChange} 
                        multiline rows={4} 
                        style={{width:"100%"}} 
                        className={classes.root} 
                        inputLabelProps={{ required: false,style:{color:"orange"} }}
                        id="outlined-basic" 
                        label="Describe the product" 
                        variant="outlined"  
                        inputProps={{min:1,style:{textAlign:'center',color:"black"}}} />
                </FormControl>
            </Grid>
            <Grid item xs = {12} align="center">
                <FormControl style={{width:"70%"}}>
                    <input onChange={imageChange} type='file' multiple></input>
                </FormControl>
            </Grid>
            <Grid item xs = {12} align="center">
                    <TextField onChange={priceChange} style={{width:"65%",margin:"2px"}} 
                        className={classes.root} 
                        inputLabelProps={{ required: false,style:{color:"orange"} }} 
                        id="outlined-basic" 
                        label="Price" 
                        variant="outlined"  
                        inputProps={{min:1,style:{textAlign:'center',color:"black"}}} 
                        type="number" 
                        />
                    <TextField style={{width:"5%"}}
                        id="standard-select-currency-native"
                        select
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Currency"
                        >
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
            </Grid>
            <Grid item xs = {12} align="center">
                <FormControl style={{width:"70%"}}>
                    <TextField 
                        onChange={handleStockChange} 
                        style={{width:"100%"}} 
                        className={classes.root} 
                        inputLabelProps={{ required: false,style:{color:"orange"} }} 
                        id="outlined-basic" label="Avaliable products" 
                        variant="outlined"  
                        inputProps={{min:1,style:{textAlign:'center',color:"black"}}} />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={category}
                onChange={handleCategoryChange}
                >
                <MenuItem value="">
                <em>None</em>
              </MenuItem>
                {categories.map((name)=>{
                  return (
                  <MenuItem value={name.category}>{name.category}</MenuItem>)
                })}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs = {12} align="center">
                <Button onClick={handleSubmitButtonPressed} color="secondary" variant="contained">
                    Submit
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddProductPage
