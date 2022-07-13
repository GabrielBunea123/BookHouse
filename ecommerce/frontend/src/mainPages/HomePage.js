import React, { Component, useState, useEffect } from "react";
import AddProductPage from "./AddProductPage";
import Home from "./Home";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PersonalData from "./PersonalData";
import FavouriteProducts from "./FavouriteProducts";
import NotFound from "./NotFound";
import SearchedResults from "./SearchedResults"
import Footer from "./Footer";
import Contact from "./Contact";
import Register from "./Register"
import Login from "./Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Success from "./Success";
import Error from "./Error";
import Profile from "./Profile";


const HomePage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Router>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/add-product" component={AddProductPage} />
                <Route path="/product-details/:id" component={ProductDetails} />
                <Route path="/cart" component={Cart} />
                <Route path="/favourite-products/:buyer" component={FavouriteProducts} />
                <Route path="/checkout/:buyer" component={Checkout}></Route>
                <Route path="/profile" component={Profile} />
                <Route path="/fill-in-personal-data" component={PersonalData} />
                <Route path="/success" component={Success} />
                <Route path="/error" component={Error} />
                <Route path='/searched-results/:query' component={SearchedResults} />
                <Route path="/contact-support" component={Contact} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="*" component={NotFound}></Route>

            </Switch>
        </Router>
    )
}

export default HomePage

