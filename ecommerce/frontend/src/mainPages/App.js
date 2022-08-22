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
import Contact from "./Contact";
import Register from "./Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./Success";
import Error from "./Error";
import Profile from "./Profile";
import Login from "./Login";


const App = (props) => {
    return (
        <Router>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/add-product" element={<AddProductPage></AddProductPage>}></Route>
                <Route path="/product-details/:id" element={<ProductDetails></ProductDetails>} />
                <Route path="/cart" element={<Cart></Cart>} />
                <Route path="/favourite-products/:buyer" element={<FavouriteProducts></FavouriteProducts>} />
                <Route path="/checkout/:buyer" element={<Checkout></Checkout>}></Route>
                <Route path="/profile" element={<Profile></Profile>} />
                <Route path="/fill-in-personal-data" element={<PersonalData></PersonalData>} />
                <Route path="/success" element={<Success></Success>} />
                <Route path="/error" element={<Error></Error>} />
                <Route path='/searched-results/:query' element={<SearchedResults></SearchedResults>} />
                <Route path="/contact-support" element={<Contact></Contact>} />
                <Route path="/register" element={<Register></Register>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="*" element={<NotFound></NotFound>}></Route>

            </Routes>
        </Router>
    )
}

export default App