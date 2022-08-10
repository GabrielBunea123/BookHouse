import React, { useState, useEffect } from 'react'
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { Grid, CircularProgress } from "@mui/material"
import MainButton from '../components/MainButton'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router';

const stripePromise = loadStripe("pk_test_51JQpMJBL4rqcbP3BPR5jnnDPPlpiAGIjyurgrNELzYAOKlN7j0apcxrz4RC33ZEVyYF8NZDjUeHaCxoeZcBrF9hI00QnV61k9c");
const options = {
  style: {
    base: {
      fontSize: 18,
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
}

// Pass the appearance object to the Elements instance

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe()
  const elements = useElements()
  const [cart, setCart] = useState([])
  const [totalMoney, setTotalMoney] = useState(0)
  const [funcRunning, setFuncRunning] = useState(false)
  const [user, setUser] = useState({})
  var price = 0;
  var clicked = false


  function getCart() {
    fetch('/api/get-cart' + "?user=" + user.id)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        data.map((item) => {
          price += item.price
          setTotalMoney(price)
        })
      })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    clicked = true
    //get the cart data
    if (!stripe || !elements) {
      navigate('/error')
    }
    try {

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement)
      });
      const payment_id = paymentMethod.id

      console.log(location.state.Info)

      const { data: clientSecret } = await axios.post("/api/checkout", {
        payment_id: payment_id,
        user: user.id ? user.id : "Anonymous",
        userInfo: location.state.userInfo
      })
      navigate('/success')
    }
    catch (error) {
    }
  };

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
    getCart()
    getUser()
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className="container checkout" onSubmit={handleSubmit}>

      <div className="card card-payment shadow rounded p-5">

        <h3 className="pt-3 pb-3 fw-bold" style={{ color: "#24305E" }}>Credit card payment</h3>

        <div>
          <div className="pt-2 pb-2">
            <label className="label-checkout">Card number</label>
            <CardNumberElement
              options={options}
              className="form-control"
            />
          </div>
          <div className="pt-2 pb-2">
            <label className="label-checkout">Expiration date</label>
            <CardExpiryElement
              options={options}
              className="form-control"
            />
          </div>
          <div className="pt-2 pb-2">
            <label className="label-checkout">CVC</label>
            <CardCvcElement
              options={options}
              className="form-control"
            />
          </div>
        </div>

        <Grid item xs={12}>
          <MainButton className="mt-5" varian="contained" onClick={() => { setFuncRunning(true) }} style={{ display: funcRunning == true ? 'none' : null }} type="submit" disabled={!stripe}>
            {funcRunning === true ? <CircularProgress size={25}></CircularProgress> : 'Pay'}
          </MainButton>
        </Grid>

        <Grid item xs={12}>
          {funcRunning === true ?
            <CircularProgress className="mt-5" size={25}></CircularProgress>
            : null}
        </Grid>

      </div>
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
