import { useEffect, useState } from "react"
import API from "../../services/api"
import socket from "../../socket"

import orderSound from "/public/notifi.wav"

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [search, setSearch] = useState("")

    const statusFlow = [
        "Placed",
        "Confirmed",
        "In_Transit",
        "Out_For_Delivery",
        "Delivered"
    ]

    const playSound = () => {
        const audio = new Audio(orderSound)
        audio.play()
    }

    const loadOrders = async () => {
        try {
            const res = await API.get("/orders/admin/orders")
            setOrders(res.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/admin/update/${id}`, { status })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        loadOrders()

        socket.on("orderUpdate", () => {
            playSound()
            loadOrders()
        })

        return () => {
            socket.off("orderUpdate")
        }

    }, [])

    const getBadgeColor = (status) => {

        switch (status) {

            case "Placed": return "secondary"
            case "Confirmed": return "info"
            case "In_Transit": return "primary"
            case "Out_For_Delivery": return "warning"
            case "Delivered": return "success"
            case "Cancelled": return "danger"
            case "Returned": return "dark"
            default: return "secondary"

        }

    }

    const filteredOrders = orders
        .filter(o => activeTab === "all" || o.status === activeTab)
        .filter(o =>
            o.userId?.email?.toLowerCase().includes(search.toLowerCase())
        )

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h4>Loading orders...</h4>
            </div>
        )
    }

    return (

        <div className="container mt-4">

            {/* SEARCH */}

            <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by user email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* DESKTOP TABS */}

            <div className="d-none d-md-block mb-4">

                <ul className="nav nav-tabs">

                    {[
                        "all",
                        "Placed",
                        "Confirmed",
                        "In_Transit",
                        "Out_For_Delivery",
                        "Delivered",
                        "Cancelled",
                        "Returned"
                    ].map(tab => (

                        <li className="nav-item" key={tab}>

                            <button
                                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "all" ? "All" : tab.replaceAll("_", " ")}
                            </button>

                        </li>

                    ))}

                </ul>

            </div>

            {/* MOBILE FILTER */}

            <div className="d-md-none mb-4">

                <select
                    className="form-select"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                >

                    <option value="all">All</option>
                    <option value="Placed">Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In_Transit">In Transit</option>
                    <option value="Out_For_Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>

                </select>

            </div>

            {/* TABLE */}

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>Product</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredOrders.map(order => {

                            const currentIndex = statusFlow.indexOf(order.status)

                            const allowedStatuses = statusFlow.filter(
                                (status, index) => index >= currentIndex
                            )

                            return (

                                <tr key={order._id}>

                                    <td>

                                        <div className="d-flex align-items-center">

                                            <img
                                                src={order.productImage}
                                                alt=""
                                                width="50"
                                                height="50"
                                                style={{ objectFit: "cover" }}
                                                className="me-2"
                                            />

                                            {order.productName}

                                        </div>

                                    </td>

                                    <td>{order.userId?.name}</td>

                                    <td>{order.userId?.email}</td>

                                    <td>₹ {order.productPrice}</td>

                                    <td>{order.quantity}</td>

                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                                    <td>

                                        <span className={`badge bg-${getBadgeColor(order.status)}`}>
                                            {order.status.replaceAll("_", " ")}
                                        </span>

                                    </td>

                                    <td>

                                        <select
                                            className="form-select"
                                            value={order.status}
                                            disabled={
                                                order.status === "Delivered" ||
                                                order.status === "Cancelled" ||
                                                order.status === "Returned"
                                            }
                                            onChange={(e) =>
                                                updateStatus(order._id, e.target.value)
                                            }
                                        >

                                            {allowedStatuses.map(status => (

                                                <option key={status} value={status}>
                                                    {status.replaceAll("_", " ")}
                                                </option>

                                            ))}

                                        </select>

                                    </td>

                                </tr>

                            )

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    )

}