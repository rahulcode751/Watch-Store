import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
    return (
        <Layout title={"Contact us"}>
            <div className="row contactus ">
                <div className="col-md-6 con-img">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center title">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        <h5 className='con-desc'>For any query and info about prodduct feel free to contact us anytime we 24X7
                            avaialible</h5>
                    </p>
                    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <p className="mt-3">
                            <BiMailSend /> : help@buynow.com
                        </p>
                        <p className="mt-3">
                            <BiPhoneCall /> : +91 **********
                        </p>
                        <p className="mt-3">
                            <BiSupport /> : 1800-0000-0000 (toll free)
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
