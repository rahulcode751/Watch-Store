import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className='layoutdiv'>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "85vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "TimeMachine.com",
    description: "TimeMachine is an Ecommerce website for watches",
    keywords: "mern,react,node,mongodb",
    author: "Rahul Bairagi",
};
export default Layout
