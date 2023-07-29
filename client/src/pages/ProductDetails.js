import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import '../styles/ProductDetails.css'

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart([]);

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/product/related-product/${pid}/${cid}`
            );
            // console.log(data);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="row container product-container">
                <div className="col-md-4 product-img-card">
                    <img
                        src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                        className="card-img-top product-img-card-st"
                        alt={product.name}

                    />
                </div>
                <div className="col-md-6 detials-card">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button
                        className="button-92"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                            toast.success("Item Added to cart");
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>

                <div className="similar-product">
                    <h1>Similar Products</h1>
                </div>

                <div className='d-flex flex-wrap'>
                    {relatedProducts.length < 1 && <p>No Similar Product found</p>}
                    {relatedProducts && relatedProducts.map((p) => (
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
                                    style={{ marginBottom: "-5px" }}
                                    onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, p])
                                        );
                                        toast.success("Item Added to cart");
                                    }}
                                >
                                    ADD TO CART
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails;
