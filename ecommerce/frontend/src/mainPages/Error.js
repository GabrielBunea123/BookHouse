import React from 'react'
import MainButton from '../components/MainButton'

const Error = () => {
    return (
        <div className="d-flex justify-content-center" style={{ paddingTop: 80 }}>
            <div className="text-center">
                <h3 style={{ color: "#24305e" }} className="text-center fw-bold">An error has occurred <i style={{ color: "#f7636c" }} class="fa-solid fa-circle-exclamation"></i></h3>
                <MainButton style={{ color: "white" }} href='/' className="m-5" variant="contained">Return home</MainButton>
            </div>
        </div>
    )
}

export default Error