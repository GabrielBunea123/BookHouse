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
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import Success from "./Success";
import Error from "./Error";
import Profile from "./Profile";
import Login from "./Login";


const HomePage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={Home}></Route>
                <Route path="/add-product" element={AddProductPage}></Route>
                <Route path="/product-details/:id" element={ProductDetails} />
                <Route path="/cart" element={Cart} />
                <Route path="/favourite-products/:buyer" element={FavouriteProducts} />
                <Route path="/checkout/:buyer" element={Checkout}></Route>
                <Route path="/profile" element={Profile} />
                <Route path="/fill-in-personal-data" element={PersonalData} />
                <Route path="/success" element={Success} />
                <Route path="/error" element={Error} />
                <Route path='/searched-results/:query' elementt={SearchedResults} />
                <Route path="/contact-support" element={Contact} />
                <Route path="/register" element={Register} />
                <Route path="/login" element={Login} />
                <Route path="*" element={NotFound}></Route>

            </Routes>
        </Router>
    )
}

export default HomePage

