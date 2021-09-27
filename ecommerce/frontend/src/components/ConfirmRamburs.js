import React,{useState,useEffect} from 'react'
import {Grid,Typography,FormControl,Button} from '@material-ui/core'
import { FaCommentsDollar } from 'react-icons/fa'
import { useHistory } from "react-router";

const ConfirmRamburs = () => {

    const [cart,setCart] = useState([])
    const [totalMoney,setTotalMoney] = useState(0)
    const history = useHistory()
    var price=0

    useEffect(()=>{
        getCart()
        window.scrollTo(0, 0);
    },[])
    function ConfirmOrder(){
        fetch("/api/confirm-ramburs")
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            history.push('/ramburs-success')
        })
    }

    

    function getCart(){
        fetch('/api/get-cart')
        .then((res)=>res.json())
        .then((data)=>{
          setCart(data);
          data.map((item,key)=>{
            price+=item.price
            setTotalMoney(price)
          })
        })
      }
    return (
        <div style={{paddingBottom:250}}>
            <Grid style={{paddingBottom:50}} item xs={12} align="center">
                {/* <FormControl style={{width:'60%'}}> */}
                    <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
                        Pret produse: {totalMoney} RON
                    </Typography>
                    <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
                        Pret transport: 15 RON
                    </Typography>
                    <hr style={{width:'60%'}}></hr>
                    <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
                        Subtotal: {totalMoney+15} RON
                    </Typography>
                {/* </FormControl> */}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography style={{fontWeight:'bold',paddingBottom:40}} variant='h3' component="h3">
                    Vrei sa confirmi comanda?
                </Typography>
                <Button onClick={ConfirmOrder} variant='contained' style={{backgroundColor:"#00e676",color:'white',margin:5}}>Confirm</Button>
                <Button onClick={()=>history.push('/')} variant='contained' color="secondary">Cancel</Button>
            </Grid>

        </div>
    )
}

export default ConfirmRamburs
