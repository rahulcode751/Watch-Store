import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Dashboard from './../../pages/user/Dashboard';
import '../../styles/AdminMenu.css';

const UserMenu = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="admin-menu">
                <div className="list-group dashboard-menu">
                    <div className='user-head' onClick={() => navigate("/dashboard/user")} style={{ cursor: "pointer" }}>
                        <h3> User Dashboard</h3>
                    </div>
                    <div className='menu-heads'>
                        <NavLink
                            to="/dashboard/user/profile"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to="/dashboard/user/orders"
                            className="list-group-item list-group-item-action nav-colors"
                        >
                            Orders
                        </NavLink>
                    </div>
                </div >
            </div >
        </>
    )
}

export default UserMenu
