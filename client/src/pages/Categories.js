import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import '../styles/Categories.css'

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div className="container">
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-md-10 mt-3 " key={c._id}>

                            <button className="button-54"><Link to={`/category/${c.slug}`} className="link-cat">{c.name}</Link></button>

                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;