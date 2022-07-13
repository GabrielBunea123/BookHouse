import React from 'react'
import MainButton from '../components/MainButton'

const Success = () => {
    return (
        <div className="d-flex justify-content-center" style={{ paddingTop: 80 }}>
            <div className="text-center">
                <h3 style={{ color: "#24305e" }} className="text-center fw-bold">Everything turns out to be successfull <i style={{color:"#98c983"}} class="fa-solid fa-circle-check"></i></h3>
                <MainButton style={{ color: "white" }} href='/' className="m-5" variant="contained">Return home</MainButton>
            </div>
        </div>
    )
}

export default Success