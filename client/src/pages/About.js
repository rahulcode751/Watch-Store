import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title={"About us - BuyNow.com"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/aboutus.jpeg"
                        alt="aboutus"
                        className='about-img'
                        style={{ width: "100%", boxShadow: "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify" style={{ fontFamily: "'Poppins', sans-serif", marginTop: "70px", fontWeight: "500" }}>
                        Welcome to <b>BuyNow</b>, your ultimate destination for stylish and sophisticated timepieces. We are proud to offer a wide selection of watches that combine elegance, functionality, and craftsmanship to suit your personal style and enhance your everyday life.
                        <hr />
                        At <b>BuyNow</b>, we understand the significance of a watch as a timeless accessory that reflects your personality and complements your attire. Whether you're searching for a classic timepiece, a sports watch for an active lifestyle, or a fashion-forward statement piece, our curated collection has something for everyone.
                    </p>

                </div >
            </div >
        </Layout >
    )
}

export default About
