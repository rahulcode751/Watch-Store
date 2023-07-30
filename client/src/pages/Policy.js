import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/policy.jpeg"
                        alt="policy"
                        className='policy-img'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 " >
                    <h1 className="bg-dark p-2 text-white text-center title title-policy">Privacy Policy</h1>
                    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                        <p>------------------------------------------------------</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Policy;
