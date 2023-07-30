import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import '../../styles/userorders.css'
import { useFetcher } from "react-router-dom";
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    // get order
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])
    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>All Orders</h1>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className='border shadow'>
                                    <table className="table create-order-table">
                                        <thead className='order-table-head'>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>

                                        <tbody className='create-order-table-body'>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                        className="select-status"
                                                        style={{ width: "100%" }}
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s} className="select-status">
                                                                <h6>{s}</h6>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='container'>
                                        {o?.products?.map((p, i) => (
                                            <div className="mb-3 p-3 card flex-row order-page" >
                                                <div className="col-md-6">
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                                                        className="order-img-top order-img"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-9 order-details">
                                                    <p>{p.name}</p>
                                                    <p>{p.description}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
