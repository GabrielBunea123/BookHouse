import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'



const SearchedResults = (props) => {

    let query = props.match.params.query

    const [searched_items, setItems] = useState([])

    function getResults() {
        fetch("/api/searched-results" + '?searched=' + query)
            .then((res) => res.json())
            .then((data) => setItems(data))
    }

    useEffect(() => {
        getResults()
    }, []);

    function renderResults() {
        if (searched_items.length > 0 && query !== '') {
            return (
                <>
                    {searched_items.map((item, index) => (
                        <ProductCard item={item} />
                    ))}
                </>
            )
        }
    }

    return (
        <div>
            <div class="container bg-trasparent my-4 p-3" style={{ position: 'relative' }}>
                <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {renderResults()}
                </div>
            </div>
        </div>
    )
}

export default SearchedResults
