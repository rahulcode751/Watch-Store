import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminMenu.css';

const AdminMenu = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="admin-menu">
                <div className="list-group dashboard-menu">
                    <div className='admin-head' onClick={() => navigate("/dashboard/admin")} style={{ cursor: "pointer" }}>
                        <h3  > Admin Pannel</h3>
                    </div>
                    <div className='menu-heads'>
                        <NavLink
                            to="/dashboard/admin/create-category"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Create Category
                        </NavLink>

                        <NavLink
                            to="/dashboard/admin/create-product"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Create Product
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/products"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/orders"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Orders
                        </NavLink>
                        <NavLink
                            to="/dashboard/admin/users"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Users
                        </NavLink>
                    </div>

                </div >
            </div >
        </>
    )
}

export default AdminMenu
