import React, { useState,useEffect } from 'react'
import {Elements,CardElement,useElements,useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {Grid,Button,Typography,FormControl} from "@material-ui/core"
import { useHistory } from "react-router";
import {Container} from 'semantic-ui-react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AiOutlineConsoleSql } from 'react-icons/ai';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_live_51JQpMJBL4rqcbP3Bb26TMtgyX1ya6yFNxbmml6ZPuWjiWAY9adFlsEat3DAXwXjPBIS5LKoRwBgwiaI7BJIrLnSr00gmozuGVd");
// import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}
const CheckoutForm =(props)=> {
  const history = useHistory();
  const stripe=useStripe()
  var clicked = false
  const elements = useElements()
  const [cart,setCart] = useState([])
  const [totalMoney,setTotalMoney] = useState(0)
  const [funcRunning,setFuncRunning]=useState(false)
  var price = 0;

  useEffect(() => {
    getCart()
    window.scrollTo(0, 0);
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    clicked = true
    const {error,paymentMethod} = stripe.createPaymentMethod({
      type:'card',
      card:elements.getElement(CardElement)
    })
    //get the cart data
    if(!error){
      const payment_id=paymentMethod.id
        try{
          // const {data} = axios.post("/api/checkout",{
          //   payment_id,
          // })
          const requestOptions={
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
              payment_id:payment_id,
            })
          }
          fetch("/api/checkout",requestOptions)
          .then((res)=>res.json())
          .then((data)=>{})
          history.push('/payment-confirmation')
      }
      catch (error){
        history.push('/payment-confirmation-error')
      }
    }
  };

    return (
      <form onSubmit={handleSubmit} className="payment-page" style={{paddingBottom:250}}>
        <Grid style={{paddingBottom:20}} item xs={12} align="center">
          <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
            Pret produse: {totalMoney} RON
          </Typography>
          <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
            Pret transport: 15 RON
          </Typography>
          <hr></hr>
          <Typography style={{fontWeight:'bold'}} variant='h5' component="h5">
            Subtotal: {totalMoney+15} RON
          </Typography>
        </Grid>
        <Grid container spacing="1" className='payment-card-container'>
          <Grid item xs={12} align="center" style={{marginBottom:30,marginTop:30}}>
            <FormControl>
              <Typography variant='h4'>
                Final step! Payment
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS}/>
              </div>
            </fieldset>
          </Grid>
          <button onClick={()=>{setFuncRunning(true)}} style={{display:funcRunning==true?'none':null}} className="button-pay" type="submit" disabled={!stripe}>
          {funcRunning===true?<CircularProgress size={25}></CircularProgress>:'Pay'}
        </button>
          <Grid item xs={12} align="center">
            {funcRunning===true?
              <CircularProgress size={25}></CircularProgress>
            :null}
          </Grid>
        </Grid>
       </form>
    );
  }

const Wrapper = () => {
    return (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
    );
  };

export default Wrapper;
