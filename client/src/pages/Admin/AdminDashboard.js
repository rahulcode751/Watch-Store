import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth';
import '../../styles/AdminMenu.css';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 admin-menu-class'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 admin-menu-class-2'>
                        <div className="w-80 p-1 card-dash">
                            <h6> Admin Name : {auth?.user?.name}</h6>
                            <h6> Admin Email : {auth?.user?.email}</h6>
                            <h6> Admin Contact : {auth?.user?.phone}</h6>
                            <h6> Admin Address : {auth?.user?.address}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;
