import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserMenu'
import '../../styles/UserManu.css'

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 admin-menu-class'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 admin-menu-class-2'>
                        <div className="card w-80 p-1 card-dash">
                            <h6> User Name : {auth?.user?.name}</h6>
                            <h6> User Email : {auth?.user?.email}</h6>
                            <h6> User Contact : {auth?.user?.phone}</h6>
                            <h6> User Address : {auth?.user?.address}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Dashboard
