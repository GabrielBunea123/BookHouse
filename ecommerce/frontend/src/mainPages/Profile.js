import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Profile = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [favouriteBooks, setFavouriteBooks] = useState(0) // favourite books number
    const [reviewsNumber, setReviewsNumber] = useState(0)
    const [ordersNumber, setOrdersNumber] = useState(0)
    const [orderedProducts, setOrderedProducts] = useState([])
    const navigate = useNavigate()
    // const history = useHistory();

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }//csrftoken
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

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
                if (data.username) {
                    setIsAuthenticated(true)
                    setUser(data)
                    getProfile(data.id)
                    getFavouriteProducts(data.id)
                    getUserReviews(data.id)
                    getUserOrders(data.id)
                }
                else {
                    setIsAuthenticated(false)
                    navigate("/login")
                }
            })
    }

    const getProfile = (userAuth) => {
        fetch("/users/get-profile" + "?user=" + userAuth)
            .then(res => res.json())
            .then(data => {
                setProfile(data)
            })
            .catch(err => console.error(err))
    }

    const getFavouriteProducts = (userAuth) => {
        fetch('/api/favourite-products' + '?author=' + userAuth)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0)
                    setFavouriteBooks(data.length)
                else setFavouriteBooks(0)
            })
    }

    const getUserReviews = (userAuth) => {
        fetch('/api/get-user-reviews' + '?user=' + userAuth)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0)
                    setReviewsNumber(data.length)
                else setReviewsNumber(0)
            })
            .catch(err => console.error(err))
    }

    const getUserOrders = (userAuth) => {
        fetch("/api/get-user-orders" + '?user=' + userAuth)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setOrdersNumber(data.length)
                    data.map((item) => {
                        item.products_id = JSON.parse(item.products_id)
                        for (var index = 0; index < item.products_id.length; index++) {
                            getOrderedProduct(item.products_id[index])
                        }
                    })
                }
                else setOrdersNumber(0)
            })
            .catch(err => console.error(err))
    }

    function getOrderedProduct(productId) {
        fetch('/api/product-details' + '?id=' + productId)
            .then((res) => res.json())
            .then((data) => {
                setOrderedProducts(prev => [...prev, data])
            })
    }


    const handleLogout = () => {
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                logout_user: isAuthenticated
            })
        }
        fetch("/users/logout", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("tokenAuth", "")
                setIsAuthenticated(false)
                navigate("/login")

            })
    }

    const handleProfilePicChange = (e) => {
        var formData = new FormData(); // creates a new FormData object

        formData.append("user", user.id)
        formData.append("image", e.target.files[0])

        axios.post("/users/update-profile-image/", formData, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        })
            .then(res => {
                setIsAuthenticated(false)
                setUser({})
                setProfile({})
                setFavouriteBooks(0)
                setReviewsNumber(0)
                setOrdersNumber(0)
                setOrderedProducts([])

                getUser()

            })
            .then((err) => console.log(err));


    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="container">
            {isAuthenticated === true &&
                <div className="mt-5">
                    {/* <div className="d-flex justify-content-start my-5 mx-2"> */}
                    <div className="" style={{ border: 0 }}>

                        <div className="d-flex flex-wrap profile-change">

                            <div className="p-2 pt-3">
                                <img src={profile.image} className="profile-img image-thumbnail" alt="..."></img>
                            </div>

                            <div class="p-2 pt-3 profile-container">
                                <div className=" d-flex profile-name-container">
                                    <div class="pt-1">
                                        <h4 className="text-center profile-name">
                                            {user.username}
                                        </h4>
                                    </div>
                                    <div class="dropend">
                                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><input onChange={(e) => handleProfilePicChange(e)} type="file" class="dropdown-item custom-file-input" /></li>
                                            <li><button class="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="card profile-stats">
                                    <div className="card-body d-flex justify-content-center p-2 flex-wrap">
                                        <div className="p-2 text-center">
                                            <div>Orders</div>
                                            <div>{ordersNumber}</div>
                                        </div>
                                        <div className="p-2 text-center">
                                            <div>Reviews</div>
                                            <div>{reviewsNumber}</div>
                                        </div>
                                        <div className="p-2 text-center">
                                            <div>Favourites</div>
                                            <div>{favouriteBooks}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {ordersNumber == 0 &&
                            <div className="pb-5">
                                <div className="d-flex justify-content-center text-center pt-5 mt-5">
                                    <h5 className="w-50" style={{ color: "#c7c7c7" }}>There are no ordered books yet</h5>
                                </div>
                                <div className="text-center pt-2">
                                    <i style={{ fontSize: 50, color: "#c7c7c7" }} class="fa-solid fa-book-open"></i>
                                </div>
                            </div>
                        }
                    </div>
                    {/* </div> */}
                    {ordersNumber > 0 &&
                        <div className="pt-5">
                            <div className="p-3 fw-bold" style={{ color: "#24305E" }}>My bookshelf</div>
                            <div class="container bg-trasparent my-2 p-3" style={{ position: 'relative' }}>
                                <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                                    {orderedProducts.map((item, index) => (
                                        <ProductCard item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Profile