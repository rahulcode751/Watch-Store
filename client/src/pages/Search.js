import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useSearch } from '../context/search'
import '../styles/search.css'

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
                    <div className='d-flex flex-wrap search-card'>
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                                    className="card-img-top home-card-img"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">Price  ₹{p.price}</p>
                                    <p className="card-text">{p.description}</p>
                                    <button
                                        className="button-83"
                                        style={{ marginBottom: "5px" }}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="button-83"
                                        style={{ marginBottom: "-5px" }}
                                    >
                                        ADD TO CART
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout >

    )

}

export default Search;
