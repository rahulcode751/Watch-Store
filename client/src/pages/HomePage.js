import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart.js'
import { toast } from 'react-hot-toast';
import '../styles/home.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart([]);
    const [products, setProducts] = useState([auth]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    // GET ALL CATEGORY
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // get products
    const getAllProducts = async (req, res) => {
        try {
            setLoading(true);
            // const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product`);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // get Total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    // laod more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);


    // get filtered product
    const filterProduct = async (req, res) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/product-filters`, { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={"All Products - Best offers"}>
            {   /*  <h1>Home Page</h1>
    <pre>{JSON.stringify(radio, null, 4)}</pre> */}
            <div className='row'>
                <div className='col-md-3'>
                    <div className='home-cat'>
                        <h3
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }} className='text-center'>
                            Filter By Category
                        </h3>
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                className='checkbox'
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/*Price Filter */}
                    <div className='home-cat'>
                        <h3
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }} className='text-center'>
                            Filter By Price
                        </h3>
                        <Radio.Group
                            onChange={e => setRadio(e.target.value)}
                            className='radio'
                        >
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <button
                        className="button-89"
                        onClick={() => window.location.reload()}
                    >
                        RESET FILTERS
                    </button>
                </div>
                <div className='col-md-9'>

                    <div className='d-flex flex-wrap'>
                        {products && products.map((p) => (
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

                    <div className="m-2 p-3 load-more-home">
                        {products && products.length < total && (
                            <button
                                className="button-92"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div >
            </div>
        </Layout >
    )
}

export default HomePage
