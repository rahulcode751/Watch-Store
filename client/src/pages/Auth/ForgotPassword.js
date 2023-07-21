import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsWatch } from 'react-icons/bs'
import toast from "react-hot-toast";
import "../../styles/forgotpassword.css";

const ForgotPasssword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`, {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout >
            <div className='forgot-password-box'>
                <div className='form-banner'>
                    <img src='/images/forgot-password.gif' alt='forgotpasswordImage' />
                </div>
                <div className='forgotpassword'>
                    <h2><BsWatch />BuyNow</h2>
                    <h4>Forgot Password</h4>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail"
                                className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder='Enter Email'
                                required
                                autoFocus
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword"
                                className="form-label">
                                newPassword
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder='**********'
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputAnswer"
                                className="form-label">
                                What's your fovourite Watch Brand
                            </label>
                            <input
                                type="password"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputAnswer"
                                placeholder='Answer'
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            class="button-29-login">
                            Reset
                        </button>

                    </form>
                </div>
            </div>
        </Layout >
    );
};

export default ForgotPasssword;