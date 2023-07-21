import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import '../../index.css';


const Footer = () => {
    return (
        // <div className='footer'>
        //     <h4 className='text-center'>
        //         All Rights Reserved &copy; BuyNow
        //     </h4>
        //     <ul class="social-icon">
        //         <li class="social-icon__item"><Link class="social-icon__link" to='/not-found'>
        //             <FaFacebook />
        //         </Link></li>
        //         <li class="social-icon__item"><Link class="social-icon__link" to='/not-found'>
        //             <FaTwitter />
        //         </Link></li>
        //         <li class="social-icon__item"><Link class="social-icon__link" to='/not-found'>
        //             <FaLinkedinIn />
        //         </Link></li>
        //         <li class="social-icon__item"><Link class="social-icon__link" to='/not-found'>
        //             <FaInstagram />
        //         </Link></li>
        //     </ul>
        //     <p className='text-center mt-3'>
        //         <Link to="/about">About</Link>
        //         <Link to="/contact">Contact</Link>
        //         <Link to="/policy">Privacy Policy</Link>
        //     </p>
        // </div>
        <footer class="footer">
            <h4 className='text-center'>
                2023  All Rights Reserved &copy; BuyNow
            </h4>
            <ul class="social-icon">
                <li class="social-icon__item"><Link class="social-icon__link" to="/not-found">
                    <ion-icon name="logo-facebook"><FaFacebook /></ion-icon>
                </Link></li>
                <li class="social-icon__item"><Link class="social-icon__link" to="/not-found">
                    <ion-icon name="logo-twitter"><FaTwitter /></ion-icon>
                </Link></li>
                <li class="social-icon__item"><Link class="social-icon__link" to="/not-found">
                    <ion-icon name="logo-linkedin"><FaLinkedinIn /></ion-icon>
                </Link></li>
                <li class="social-icon__item"><Link class="social-icon__link" to="/not-found">
                    <ion-icon name="logo-instagram"><FaInstagram /></ion-icon>
                </Link></li>
            </ul>
            <ul class="menu">
                <li class="menu__item"><Link class="menu__link" to="/">Home</Link></li>
                <li class="menu__item"><Link class="menu__link" to="/about">About</Link></li>
                <li class="menu__item"><Link class="menu__link" to="/contact">Contact</Link></li>
                <li class="menu__item"><Link class="menu__link" to="/policy">Privacy Policy</Link></li>

            </ul>
        </footer >
    )
}

export default Footer;