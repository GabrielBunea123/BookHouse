import React,{useEffect,useState} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid,Button, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles({
table: {
    minWidth: 700,
},
});

const Cart = () => {

    const classes = useStyles()

    const [products,setProducts]=useState([])
    const [buyer,setBuyer] = useState("")
    const [finalPrice,setFinalPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
    var price=0
    useEffect(()=>{
        getCart();
        window.scrollTo(0, 0);
    },[])


    const getCart = () =>{
        fetch('/api/get-cart')
        .then((res)=>res.json())
        .then((data)=>{
          setProducts(data)
          data.map((index)=>{
            setBuyer(index.buyer)
            price+=index.price
            setFinalPrice(price)
          })
        })
      }
    return (
      <Grid style={{paddingBottom:250}} className="cart-grid" container spacing={1}>
        <Grid className="table-grid" item xs={12} align="center">
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                  <TableRow>
                      <StyledTableCell>Nume</StyledTableCell>
                      <StyledTableCell align="right">Cantitate</StyledTableCell>
                      <StyledTableCell align="right">Pret</StyledTableCell>
                      <StyledTableCell align="right">Flux</StyledTableCell>
                      <StyledTableCell align="right">Sterge</StyledTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {products.length>0?products.map((product) => (
                      <StyledTableRow key={product.name}>
                      <Link to={`product-details/${product.product_id}`}>
                        <StyledTableCell component="th" scope="row">
                            {product.name}
                        </StyledTableCell>
                      </Link>
                      <StyledTableCell align="right">
                        <div className="value-button" id="decrease" onClick={()=>{
                          const requestOptions={
                            method: 'POST',
                            headers:{"Content-Type": "application/json"},
                            body: JSON.stringify({
                              quantity:product.quantity-1,
                              product_id:product.product_id
                            })
                          }
                          fetch("/api/change-cart-quantity",requestOptions)
                          .then((res)=>res.json())
                          .then((data)=>{
                            setProducts(data);
                            if(product.quantity-1>0)
                              {setFinalPrice(finalPrice-(product.price/product.quantity))}
                          })
                        }} value="Decrease Value">-</div>
                        <input  className="quantity-input" type="number" id="number" value={product.quantity} />
                        <div className="value-button" id="increase" onClick={()=>{
                          if (product.quantity<product.stock){
                          const requestOptions={
                            method: 'POST',
                            headers:{"Content-Type": "application/json"},
                            body: JSON.stringify({
                              quantity:product.quantity+1,
                              product_id:product.product_id
                            })
                          }
                          fetch("/api/change-cart-quantity",requestOptions)
                          .then((res)=>res.json())
                          .then((data)=>{setProducts(data);setFinalPrice(finalPrice+(product.price/product.quantity))})

                        }
                        }} value="Increase Value">+</div>
                      </StyledTableCell>
                      <StyledTableCell align="right">{product.price}</StyledTableCell>
                      <StyledTableCell align="right">{product.currency}</StyledTableCell>
                      <StyledTableCell align="right"><Button onClick={()=>{
                          const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body:JSON.stringify({
                              product_id:product.product_id
                            })
                            
                          }
                          fetch("/api/delete-from-cart",requestOptions)
                          .then((res)=>res.json())
                          .then((data)=>{
                            var array = [...products]//this is how u copy an array
                            var index = array.indexOf(product)
                            if (index !== -1) {
                              array.splice(index, 1);
                              setProducts(array)
                            }
                            array.splice
                            setFinalPrice(finalPrice-product.price)
                          })
                      }} variant="contained" color="secondary"><i class="fas fa-trash-alt"></i></Button></StyledTableCell>
                      </StyledTableRow>
                  )):<Typography>Nu este niciun produs in cos</Typography>}
                  </TableBody>
              </Table>
          </TableContainer>
        </Grid>
        <Grid className="price-container" item xs={12}>
          <Typography style={{display: "inline-block"}} variant="h4" component="h4">
            Preț produs/e: {finalPrice} RON
          </Typography>
        </Grid>
        <Grid className="price-container" item xs={12}>
        </Grid>
        <Grid item xs={12} align="center">
          {products.length>0?<Link className="link" to={`fill-in-personal-data`}><Button className="continue-btn" variant="contained" color="primary">Continue</Button></Link>:null}
        </Grid>
    </Grid>
    )
}

export default Cart
