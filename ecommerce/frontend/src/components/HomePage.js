import React, { Component,useState,useEffect } from "react";
import AddProductPage from "./AddProductPage";
import Home from "./Home";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PersonalData from "./PersonalData";
import PaymentConfirmation from "./PaymentConfirmation";
import PaymentConfirmationError from "./PaymentConfirmationError";
import FavouriteProducts from "./FavouriteProducts";
import RambursSuccessfull from "./RambursSuccessfull";
import RambursError from "./RambursError";
import NotFound from "./NotFound";
import SearchedResults from "./SearchedResults"
import Footer from "./Footer";
import Contact from "./Contact";
import ConfirmRamburs from "./ConfirmRamburs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const HomePage = (props) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <Router>   
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/add-product" component={AddProductPage} />
                <Route path="/product-details/:id" component={ProductDetails} />
                <Route path="/cart" component={Cart} />
                <Route path="/favourite-products/:buyer" component={FavouriteProducts}/>
                <Route path="/checkout/:buyer" component={Checkout}></Route>
                <Route path="/fill-in-personal-data" component={PersonalData} />
                <Route path="/payment-confirmation" component={PaymentConfirmation} />
                <Route path="/payment-confirmation-error" component={PaymentConfirmationError} />
                <Route path="/ramburs-success" component={RambursSuccessfull} />
                <Route path="/ramburs-error" component={RambursError} />
                <Route path='/searched-results' component={SearchedResults} />
                <Route path="/contact-support" component={Contact} />
                <Route path="/confirm-ramburs/:buyer_id" component={ConfirmRamburs}/>

            </Switch>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <Footer></Footer>
        </Router>
    )
}

export default HomePage
