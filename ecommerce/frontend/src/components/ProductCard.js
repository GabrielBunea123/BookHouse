import React from 'react'
import {Rating} from "@mui/material"

const ProductCard = ({item}) => {//the item is the actual product
    return (
        <div class="col my-4">
            <div class="card h-100 shadow rounded card-product">
                <a href={`/product-details/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <img src={item.image ? item.image : '/static/images/noImage.png'} className="card-img-top" alt="..."></img>
                    <div class="card-body">
                        <div class="clearfix mb-3"> <h5 class="float-start fw-bold" style={{ color: "#F7636C" }}>{item.price} lei</h5>
                            <span class="float-end">
                                {item.rating == 0 ? <div class="text-muted small">No reviews</div> : <Rating name="read-only" value={item.rating} readOnly />}
                            </span>
                        </div>
                        <h5 class="card-title">{item.name.slice(0, 60)}</h5>
                        <p>{item.description.slice(0, 50)}...</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default ProductCard