import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/ProductDetails.css'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row container product-container">
                <div className="col-md-6 product-img-card">
                    <img
                        src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                        className="card-img-top product-img-card-st"
                        alt={product.name}
                        height="600"
                        width="350px"
                    />
                </div>
                <div className="col-md-6 detials-card">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button className="button-92">ADD TO CART</button>
                </div>
                <div className="row">Similar Products</div>
            </div>
        </Layout>
    )
}

export default ProductDetails;
