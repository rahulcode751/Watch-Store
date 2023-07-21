import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { BsWatch } from 'react-icons/bs'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/login.css'
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
                // navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className='login-box'>
                <div className='form-banner'>
                    <img src='/images/login.gif' alt='registerimg' />
                </div>
                <div className='login'>
                    <h4>Login with <BsWatch />BuyNow</h4>
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
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder='**********'
                                required
                            />
                        </div>

                        <h6
                            type="submit"
                            className='forgot-password'
                            onClick={() => { navigate('/forgot-password') }}
                        >
                            Forgot Password
                        </h6>
                        <h6
                            type="submit"
                            className='goto-register'
                            onClick={() => { navigate('/register') }}
                        >
                            Register First
                        </h6>
                        <button
                            type="submit"
                            class="button-29-login">
                            LogIn
                        </button>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login;
