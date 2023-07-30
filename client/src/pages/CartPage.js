import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from "react-hot-toast";
import '../styles/cart.css'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientToken, setClientToken] = useState("");

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart && cart.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    ///get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center  p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row"
                >
                    < div className="col-md-8" >
                        {cart?.map((p) => (
                            <div className="mb-3 p-3 card flex-row cart-page" >
                                <div className="col-md-6">
                                    <img
                                        src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                                        className="card-img-top cart-img"

                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                    />
                                </div>
                                <div className="col-md-9 cart-details">
                                    <p>{p.name}</p>
                                    <p>{p.description}</p>
                                    <p>Price: {p.price}</p>
                                    <button
                                        className="button-54"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="payment-cart">
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <div className="payment-option">
                                        < DropIn

                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                    </div>

                                    <button
                                        className="button-92"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default CartPage
