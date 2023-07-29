import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import '../../styles/profile.css'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/auth/profile`, {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.errro) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={"Dashboard - Profile"}>
            <div className="container-fluid  p-1">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className='profile'>
                        <img src='/images/logo7.png' alt='registerimg' className='profile-banner' />
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

                            <button
                                type="submit"
                                class="button-29" >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default Profile
