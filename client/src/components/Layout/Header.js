import React from 'react'
import { NavLink, Link } from 'react-router-dom'
// import { BsWatch } from 'react-icons/bs'
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import "../../index.css";
import SearchInput from '../Form/SearchInput';
import useCategory from './../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

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
                        <Link
                            to="/"
                            className="navbar-brand"
                            style={{ fontSize: "30px", fontFamily: "inherit" }}
                        >
                            {/* <BsWatch className='watch-logo' /> */}
                            <img src='/images/logo6.png' alt='logo' style={{ height: "55px", width: "170px", marginLeft: "10px", border: "0.2px solid black", borderRadius: "10px" }} />

                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    <button className='btn btn-outline-success'>
                                        HOME
                                    </button>
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link nav-link dropdown-toggle"
                                    to={"/categories"}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    style={{ border: "none" }}
                                >
                                    <button className='btn btn-outline-success'>
                                        All CATEGORIES
                                    </button>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
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
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link">
                                        <button className='btn btn-outline-success'>
                                            CART
                                        </button>
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header
