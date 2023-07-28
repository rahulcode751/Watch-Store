import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsWatch } from 'react-icons/bs'
import { useAuth } from '../../context/auth';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { GiShoppingBag } from 'react-icons/gi'
import "../../index.css";
import SearchInput from '../Form/SearchInput';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");

    }
    var role = "user";
    if (auth?.user?.role !== 1) {
        role = "admin";
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand" ><BsWatch className='watch-logo' />BuyNow</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    <button className='btn btn-outline-success'>
                                        HOME
                                    </button>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">
                                    <button className='btn btn-outline-success'>
                                        CATEGORY
                                    </button>
                                </NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" href="#">
                                            <button className='btn btn-outline-success'>
                                                REGISTER
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" href="#">
                                            <button className='btn btn-outline-success'>
                                                LOGIN
                                            </button>
                                        </NavLink>
                                    </li>
                                </>) : (
                                    <>
                                        <li className="nav-item dropdown">

                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                style={{ border: "none" }}
                                            >
                                                <button className="btn btn-outline-success">
                                                    {auth?.user?.name}
                                                </button>

                                            </NavLink>


                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                        // to={`/dashboard/${role}`}
                                                        className="dropdown-item"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>

                                        </li>
                                    </>
                                )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">
                                    <button className='btn btn-outline-success'>
                                        CART(0)
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header
