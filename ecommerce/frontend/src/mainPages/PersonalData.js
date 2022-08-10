import React, { useState, useEffect, useRef } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useNavigate } from 'react-router';
import MainButton from '../components/MainButton';


const PersonalData = () => {

    const navigate = useNavigate();

    // const history = useHistory();
    const [buyer, setBuyer] = useState('')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [number, setNumber] = useState("")
    const [county, setCounty] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [block, setBlock] = useState("")
    const [scara, setScara] = useState("")
    const [apartment, setApartment] = useState("")
    const [valueRadio, setValueRadio] = React.useState('credit card');
    const [livrareRadio, setLivrareRadio] = useState("courier")
    const [funcRunning, setFunctionRunning] = useState(false)
    const [postalCode, setPostalCode] = useState('')
    const [user, setUser] = useState({})
    const form = useRef()
    var error = ""

    const handleChangePayment = (event) => {
        setValueRadio(event.target.value);
    };
    const handleDeliveryChange = event => {
        setLivrareRadio(event.target.value)
    }


    function handleSubmitBtn(e) {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            county: county,
            city: city,
            phone: phone,
            block: block,
            scara: scara,
            apartment: apartment,
            payment_method: valueRadio,
            delivery_method: livrareRadio,
            postal_code: postalCode,
            buyer_id: user.id ? user.id : 'Anonymous'
        }
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        fetch("/api/fill-in-personal-data", requestOptions)
            .then((res) => {
                if (res.ok) {
                    //edit here
                    navigate(`/checkout/${user.id ? user.id : buyer}`, { state: { userInfo: data} });
                }
                else {
                    navigate('/ramburs-error')
                }
            })
            .then((data) => {
                console.log(data)
            })
        setFunctionRunning(true)

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
                if (data.username)
                    setUser(data)
                else setUser({ id: 'Anonymous' })
            })
    }

    const getCart = () => {
        fetch('/api/get-cart' + "?user=" + user.id)
            .then((res) => res.json())
            .then((data) => {
                data.map((index) => {
                    setBuyer(index.buyer)
                })
            })
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    const handleCountyChange = (event) => {
        setCounty(event.target.value)
    }
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }
    const handleBlockChange = (event) => {
        setBlock(event.target.value)
    }
    const handleEntranceChange = (event) => {
        setScara(event.target.value)
    }
    const handleApartmentChange = (event) => {
        setApartment(event.target.value)
    }
    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value)
    }
    useEffect(() => {
        getCart();
        getUser()
    }, [])

    return (
        <form className="container" ref={form} style={{ paddingBottom: 150 }} onSubmit={handleSubmitBtn}>
            <h3 className="pt-3 pb-3 fw-bold" style={{ color: "#24305E" }}>Personal information</h3>
            <div className="d-flex justify-content-between">
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleFirstNameChange} className="form-control" id="firstname" placeholder="First name" />
                </div>
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleLastNameChange} className="form-control" id="lastname" placeholder="Last name" />
                </div>
            </div>
            <div className="p-3 ps-0">
                <input onChange={handleEmailChange} className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="p-3 ps-0">
                <input onChange={handlePhoneChange} className="form-control" id="phonenumber" placeholder="Phone number" />
            </div>
            <div className="p-3 ps-0">
                <input onChange={handleAddressChange} className="form-control" id="address" placeholder="Address" />
            </div>
            <div className="d-flex justify-content-between">
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleBlockChange} className="form-control" id="block" placeholder="Block" />
                </div>
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleEntranceChange} className="form-control" id="entrance" placeholder="Entrance" />
                </div>
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleApartmentChange} className="form-control" id="apartment" placeholder="Apartment" />
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="p-3 ps-0 w-100">
                    <input className="form-control" id="country" placeholder="Country" disabled value="Romania" />
                </div>
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleCountyChange} className="form-control" id="county" placeholder="County" />
                </div>
                <div className="p-3 ps-0 w-100">
                    <input onChange={handleCityChange} className="form-control" id="city" placeholder="City" />
                </div>
            </div>
            <div className="p-3 ps-0">
                <input onChnage={handlePostalCodeChange} className="form-control" id="postalcode" placeholder="Postal code" />
            </div>

            <div>
                <h3 className="pt-5 pb-3 fw-bold" style={{ color: "#24305E" }}>Delivery method</h3>
            </div>
            <div>
                <RadioGroup aria-label="gender" name="gender1" value={livrareRadio} onChange={handleDeliveryChange}>
                    <FormControlLabel value="courier" control={<Radio />} label="Courier (14.99 lei)" />
                </RadioGroup>
            </div>

            <div>
                <h3 className="pt-5 pb-3 fw-bold" style={{ color: "#24305E" }}>Payment method</h3>
            </div>

            <div>
                <RadioGroup aria-label="gender" name="gender1" value={valueRadio} onChange={handleChangePayment}>
                    <FormControlLabel value="credit card" control={<Radio />} label="Credit card" />
                </RadioGroup>
            </div>


            <MainButton type="submit" variant="contained" className="my-5">Continue</MainButton>
        </form>
    )
}
//REFA PAGINA ASTA!!!!
export default PersonalData
