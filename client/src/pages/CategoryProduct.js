import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import axios from 'axios';
import '../styles/search.css';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart([]);

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug]);

    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-category/${params.slug}`);
            setProducts(data?.product);
            setCategory(data?.category);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found </h6>
                <div className="container">
                    <div >
                        <div className='d-flex flex-wrap search-card'>
                            {products?.map((p) => (
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
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
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
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
