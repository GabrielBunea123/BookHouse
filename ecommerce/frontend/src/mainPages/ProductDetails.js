import React, { useState, useEffect } from 'react'
import { Grid, Button, FormControl, Alert, Rating, Box, Collapse } from '@mui/material'
import MainButton from '../components/MainButton';
import ProductCard from '../components/ProductCard';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = (props) => {
    const [product, handleProduct] = useState({})
    const [productImage, setProductImage] = useState([])
    const [sameCategoryProducts, setSameCategoryProducts] = useState([])
    let { id } = useParams()
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showDescription, setShowDescription] = useState(true)
    const [showReviews, setShowReviews] = useState(true)
    const [starRating, setStarRating] = useState(4);//stars value
    const [reviewInput, setReviewInput] = useState('')
    const [reviews, setReviews] = useState([])
    const [currentImage, setCurrentImage] = useState(0)
    const [favouriteProduct, setFavouriteProduct] = useState(false)
    const [shuffledArray, setShuffledArray] = useState([])
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [user, setUser] = useState({})



    function getProduct() {
        fetch('/api/product-details' + '?id=' + id)
            .then((res) => res.json())
            .then((data) => {
                handleProduct(data);
                setProductImage(data.image);
                getSameCategoryProducts(data)
            })
    }
    function getSameCategoryProducts(e) {//get items with the same category
        fetch("/api/product-details-category" + "?category=" + e.category)
            .then((res) => res.json())
            .then((data) => {
                var toDeleteIndex = null
                data.map((item, index) => {
                    if (item.id == e.id) {
                        toDeleteIndex = index
                    }
                })
                data.splice(toDeleteIndex, 1)
                setSameCategoryProducts(data);
                setShuffledArray(data.sort(() => 0.5 - Math.random()))
            })
    } //RENDER THE DATA ON THE PAGE 08.09.2021!!!!!!
    function renderSameCategoryProducts() {
        return (
            <>
                {shuffledArray.slice(0, 4).map((item, index) => (
                    <ProductCard item={item} />
                ))}
            </>
        )
    }
    function checkForFav(userAuth) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: id,
                author: userAuth
            })
        }
        fetch('/api/check-for-fav', requestOptions)
            .then((res) => {
                if (res.ok) setFavouriteProduct(true)
                else setFavouriteProduct(false)
            })
            .then((data) => {
                null
            })
    }

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
                setUser(data)
                console.log(data)
            })
    }

    function handleDescriptionButton() {
        setShowDescription(!showDescription)
    }
    function showReviewsButton() {
        setShowReviews(!showReviews)
    }
    function reviewInputChange(e) {
        setReviewInput(e.target.value)
    }
    function handleReviewSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creator: user.id ? user.id : "Anonymous",
                rating: starRating,
                comment: reviewInput,
                product_id: id
            })
        }
        fetch('/api/add-review', requestOptions)
            .then((res) => {
                if (res.ok) {
                    setSuccessMsg("The review has been added ! Thank you")
                }
                else {
                    setErrorMsg("There has been an error. Try again later")
                }
                return res.json()
            })
            .then((data) => {
                const updatedArray = [...reviews, data];//append to the existing array of useState
                setReviews(updatedArray)
            })
        setValue(2)
        setReviewInput('')
        setShowReviews(false)
    }
    function getReviews() {
        fetch('/api/get-reviews' + '?product_id=' + id)
            .then((res) => res.json())
            .then((data) => setReviews(data))
    }
    function addToFavourite() {
        setFavouriteProduct(true)
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                name: product.name,
                description: product.description,
                price: product.price,
                currency: product.currency,
                category: product.category,
                image: product.image,
                product_id: id,
                rating: product.rating,
                author: user.id ? user.id : "Anonymous"
            })
        }
        fetch('/api/add-to-favourite', requestOptions)
            .then((res) => {
                if (res.ok) {
                    setSuccessMsg("Success")
                    setFavouriteProduct(!favouriteProduct)
                }
                else {
                    setErrorMsg("Error")
                }
            })
            .then((data) => { })
    }

    function addToCart() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                name: product.name,
                buyer: user.id ? user.id : 'Anonymous',
                price: product.price,
                currency: product.currency,
                stock: product.stock,
                rating: product.rating,
                quantity: 1,
                product_id: product.id,
                stock: product.stock,
                image: product.image
            })
        }
        fetch('/api/cart', requestOptions)
            .then((res) => {
                if (res.ok) {
                    setSuccessMsg("Produsul a fost adaugat in cosul de cumparaturi")
                }
                else {
                    setErrorMsg("S-a ivit o eroare. Reincercati !")
                }
            })
            .then((data) => {

            })
    }

    //window dimenssions
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    function getWindowDimensions() {
        const {
            innerWidth: width,
            innerHeight: height
        } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    //end window dimenssions

    useEffect(() => {
        getUser()
        getProduct()
        getReviews()
    }, [])

    useEffect(() => {
        checkForFav(user.id ? user.id : "Anonymous")
    }, [id, user])

    return (
        <div className="container mb-5">
            <Grid item xs={12} align="center" className="pt-3">
                <Collapse in={errorMsg != "" || successMsg != ""}>
                    {successMsg != "" ? (<Alert severity="success">{successMsg}</Alert>) : (<Alert severity="error">{errorMsg}</Alert>)}
                </Collapse>
            </Grid>
            {/* NAME */}
            <h3 className="pt-5 pb-3 fw-bold" style={{ color: "#24305E", textAlign: windowDimensions.width < 992 ? "center" : "start" }}>{product.name}</h3>

            <div className={windowDimensions.width < 992 ? `d-flex justify-content-center flex-wrap` : `d-flex justify-content-between flex-wrap`}>
                {/* IMAGE */}
                <div className='image-container'>
                    <img src={`${product.image}`} style={{ width: '100%', maxWidth: 400 }}></img>
                </div>
                <div className='p-2 mt-5'>
                    <div class="card text-center add-to-cart-card">
                        <div className="position-absolute">
                            <button class="btn" onClick={addToFavourite}>
                                <i style={{ color: favouriteProduct != true ? null : "red" }} class={favouriteProduct != true ? "fa-regular fa-heart" : "fa-solid fa-heart"}></i>
                            </button>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title fw-bold" style={{ color: "#F7636C" }}>{product.price} lei</h3>
                            {product.stock > 0 ?
                                <div>
                                    <div className="p-2">
                                        <MainButton variant="contained" onClick={addToCart}>Add to cart</MainButton>
                                    </div>
                                </div>
                                :
                                <Button variant="contained" disabled>Out of stock</Button>
                            }
                            <p class="card-text p-5 py-4">
                                Preț valabil exclusiv online!
                                Împachetare cadou gratuită!
                                Transport gratuit peste 150 de lei.
                                Retur gratuit în 15 zile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-grid gap-2" style={{ paddingTop: 50 }}>
                <hr></hr>
                {/* DESCRIPTION */}
                <button style={{ outline: "none", boxShadow: "none", border: 0, color: "" }} onClick={handleDescriptionButton} class="btn" type="button">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">
                            <h3 style={{ textAlign: "left", color: '#24305E' }}>Description</h3>
                        </div>
                        <div className="p-2">
                            <h3 style={{ textAlign: "right" }}>{showDescription == false ? <i style={{ textAlign: "right" }} class="fas fa-chevron-right"></i> : <i class="fas fa-chevron-down"></i>}</h3>
                        </div>
                    </div>
                </button>
                <div style={{ display: showDescription == true ? "block" : "none" }} className="p-4">
                    {product.description}
                </div>
                <hr></hr>
                {/* REVIEWS */}
                <button style={{ outline: "none", boxShadow: "none", border: 0 }} onClick={showReviewsButton} class="btn" type="button">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">
                            <h3 style={{ textAlign: "left", color: "#24305E" }}>Reviews</h3>
                        </div>
                        <div className="p-2">
                            <h3 style={{ textAlign: "right" }}>{showReviews == false ? <i style={{ textAlign: "right" }} class="fas fa-chevron-right"></i> : <i class="fas fa-chevron-down"></i>}</h3>
                        </div>
                    </div>
                </button>
                <div style={{ display: showReviews == true ? "block" : "none" }} className="d-flex justify-content-between flex-wrap">
                    {reviews.length > 0 && showReviews == true ?
                        <>
                            {showAllReviews == false ?
                                <>
                                    {reviews.slice(0, 10).map((index) => {
                                        return (
                                            <div className="card m-3 shadow rounded card-review">
                                                <div className="card-body">
                                                    <div className="review-username">Reader</div>
                                                    <Box fullWidth component="fieldset" mb={3} borderColor="transparent">
                                                        <Rating name="read-only" value={index.rating} readOnly />
                                                    </Box>
                                                    <div className='review-comment'>
                                                        {index.comment.slice(0, 70)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {reviews.map((index) => {
                                        return (
                                            <div className="card m-3 shadow rounded card-review">
                                                <div className="card-body">
                                                    <div className="review-username">Reader</div>
                                                    <Box fullWidth component="fieldset" mb={3} borderColor="transparent">
                                                        <Rating name="read-only" value={index.rating} readOnly />
                                                    </Box>
                                                    <div className='review-comment'>
                                                        {index.comment.slice(0, 70)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>

                            }
                        </>
                        : null}
                </div>
            </div>
            {reviews.length > 10 ?
                <div className="d-flex justify-content-center m-4">
                    {showAllReviews === false ?
                        <button style={{ border: 0 }} onClick={() => setShowAllReviews(true)} className="btn">Show all...</button>
                        :
                        <button style={{ border: 0 }} onClick={() => setShowAllReviews(false)} className="btn">Show less...</button>
                    }
                </div>
                : null}

            <hr></hr>


            <h3 className="p-3" style={{ color: "#24305E" }}>Write your own review</h3>

            {/* RATING FORM */}

            <div className="p-3">
                <div>
                    <Rating
                        name="simple-controlled"
                        value={starRating}
                        onChange={(event, newValue) => {
                            setStarRating(newValue);
                        }}
                    />
                </div>
                <div className="pt-3">
                    <textarea className="form-control review-input" onChange={reviewInputChange} placeholder="Review" />
                </div>
                <div className="pt-3">
                    <MainButton variant="contained" onClick={handleReviewSubmit}>Submit</MainButton>
                </div>
            </div>
            <hr></hr>

            <Grid item xs={12} align="center" className="pt-3">
                <FormControl style={{ width: '100%' }}>
                    <Collapse in={errorMsg != "" || successMsg != ""}>
                        {successMsg != "" ? (<Alert severity="success">{successMsg}</Alert>) : (<Alert severity="error">{errorMsg}</Alert>)}
                    </Collapse>
                </FormControl>

            </Grid>
            <h3 className="p-3" style={{ color: "#24305E" }}>Other books that you might be interested in</h3>

            <div class="container bg-trasparent my-4 p-3" style={{ position: 'relative' }}>
                <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {renderSameCategoryProducts()}
                </div>
            </div>

        </div>
    )
}

export default ProductDetails
