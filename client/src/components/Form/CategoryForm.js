import React from 'react'
import '../../styles/Form.css'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className='category-form'>

                <div className="form-inputs">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder='Enter New Category'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                >
                    Create
                </button>

            </form>
        </>
    )
}

export default CategoryForm;
