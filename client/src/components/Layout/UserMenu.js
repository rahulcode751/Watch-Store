import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Dashboard from './../../pages/user/Dashboard';

const UserMenu = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="user-menu">
                <div className="list-group dashboard-menu">
                    <div className='user-head' onClick={() => navigate("/dashboard/user")} style={{ cursor: "pointer" }}>
                        <h3> User Dashboard</h3>
                    </div>
                    <NavLink
                        to="/dashboard/user/profile"
                        className="list-group-item list-group-item-action"
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Oders
                    </NavLink>
                </div >
            </div >
        </>
    )
}

export default UserMenu
