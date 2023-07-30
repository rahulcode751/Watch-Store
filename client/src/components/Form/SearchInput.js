import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values, setValues] = useSearch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='search-input' >
            <form className="d-flex search-input-form" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Product"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}

                />
                {/*<button className="btn btn-outline-success" type="submit">
                    Search
    </button>*/ }
                <img src='/images/search.png' alt='logo' style={{
                    height: "40px",
                    width: "60px",
                    marginTop: "0px",
                    marginLeft: "-60px",
                    borderRadius: "10px",
                }} type="submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default SearchInput
