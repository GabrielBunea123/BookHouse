import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MainButton from '../components/MainButton';
import { useHistory } from "react-router";
import CoffeeMachine from '../components/CoffeeMachine';

const Profile = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [favouriteBooks, setFavouriteBooks] = useState(0) // favourite books number
    const [reviewsNumber, setReviewsNumber] = useState(0)
    const history = useHistory();

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
                    // createProfile(data.id)
                }
                else {
                    setIsAuthenticated(false)
                    history.push("/login")
                }
            })
    }

    const getProfile = (userAuth) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: userAuth,
            })
        }
        fetch("/users/get-profile" + "?user=" + userAuth)
            .then(res => res.json())
            .then(data => {
                setProfile(data)
            })
            .catch(err => console.error(err))
    }

    const getFavouriteProducts = (userAuth) => {
        fetch('/api/favourite-products' + '?buyer=' + userAuth)
            .then((res) => res.json())
            .then((data) => {
                var num = 0
                data.map((item) => {
                    num++;
                })
                setFavouriteBooks(num)
            })
    }

    const getUserReviews = (userAuth) => {
        fetch('/api/get-user-reviews' + '?user=' + userAuth)
            .then(res => res.json())
            .then(data => {
                var num = 0
                data.map(item=>{
                    num++;
                })
                setReviewsNumber(num)
            })
            .catch(err => console.error(err))
    }

    // const createProfile = (userAuth) =>{
    // const requestOptions = {
    //     method:"POST",
    //     headers: { "Content-Type": "application/json" },
    //     body:JSON.stringify({
    //         user:userAuth,
    //         description:'None', 
    //         orderedBooks:0
    //     })
    // }
    //     fetch('/users/create-profile', requestOptions)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
    //     .catch(err=>console.error(err))
    // }

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
                history.push("/login")
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="container">
            {isAuthenticated === true &&
                <div className="mt-5">
                    <div className="d-flex justify-content-center my-5 mx-2">
                        <div className="card shadow rounded p-5 w-100 pt-4" style={{ border: 0 }}>

                            <div className="d-flex justify-content-evenly flex-wrap">

                                <div>
                                    <div>
                                        <img src="https://ecommerce-101.s3.amazonaws.com/images/SapiensRosu_3VsL7Al.jpg" className="profile-img image-thumbnail" alt="..."></img>
                                    </div>
                                    <div className="d-flex justify-content-start pt-4 pb-4 ps-3">
                                        <div>
                                            <h3 className="fw-bold text-center" style={{ color: "#24305E" }}>
                                                {user.username}
                                            </h3>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><button class="dropdown-item" onClick={handleLogout}>Log out</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3">
                                    <div className="card ps-2 pe-2">
                                        <div className="card-body text-center">
                                            <div className="row">
                                                <div className="col">Orders</div>
                                                <div className="col">Reviews</div>
                                                <div className="col">Favourite</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <h5>{profile.orderedBooks}</h5>
                                                </div>
                                                <div className="col">
                                                    <h5>{reviewsNumber}</h5>
                                                </div>
                                                <div className="col">
                                                    <h5>{favouriteBooks}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {profile.orderedBooks == 0 ?
                                <div className="pb-5">
                                    <div className="d-flex justify-content-center text-center pt-5 mt-5">
                                        <h5 className="w-50" style={{ color: "#c7c7c7" }}>There are no ordered books yet</h5>
                                    </div>
                                    <div className="text-center pt-2">
                                        <i style={{ fontSize: 50, color: "#c7c7c7" }} class="fa-solid fa-book-open"></i>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile