import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { BsWatch } from 'react-icons/bs'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`, { name, email, password, phone, address, answer });
            // const res = await axios.post('/auth/register', { name, email, password, phone, address });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login');
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title="Register - TimeMachine.com">
            <div className='register-box'>
                <div
                    className='form-banner'>
                    <img src='/images/register.gif' alt='registerimg' />
                </div>
                <div className='register'>
                    <h4>Register with <BsWatch />Time Machine</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label
                                htmlFor="exampleInputName"
                                className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputName"
                                placeholder='Enter Name'
                                required
                                autoFocus
                            />
                        </div>

                        <div className="mb-1">
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
                            />
                        </div>

                        <div className="mb-1">
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

                        <div className="mb-1">
                            <label
                                htmlFor="exampleInputPhone"
                                className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder='+91 **********'
                                required
                            />
                        </div>

                        <div className="mb-1">
                            <label
                                htmlFor="exampleInputAddress"
                                className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder='Enter Address'
                                required
                            />
                        </div>

                        <div className="mb-1">
                            <label
                                htmlFor="exampleInputAnswer"
                                className="form-label">
                                What's Your Favourite Watch brand
                            </label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputAnswer"
                                placeholder='Enter Answer'
                                required
                            />
                        </div>
                        <h6
                            type="submit"
                            className='goto-login'
                            onClick={() => { navigate('/login') }}
                        >
                            Already Registered ?
                        </h6>
                        <button
                            type="submit"
                            class="button-29" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register
