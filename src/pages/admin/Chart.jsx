import { useEffect, useState } from "react"
import API from "../../services/api"
import socket from "../../socket"

import TodayOrdersChart from "./TodayOrdersChart"

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Chart() {

    const [stats, setStats] = useState(null)
    const [productStats, setProductStats] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [activeTab, setActiveTab] = useState("orders")
    const [revenue, setRevenue] = useState(0)



    /* ---------------- LOAD FUNCTIONS ---------------- */

    const loadStats = async () => {

        try {

            const res = await API.get("/orders/admin/stats")
            setStats(res.data)

        } catch (err) {

            console.log(err)

        }

    }


    const loadProductStats = async () => {

        try {

            const res = await API.get("/orders/admin/product-stats")
            setProductStats(res.data)

        } catch (err) {

            console.log(err)

        }

    }


    const loadRevenue = async () => {

        try {

            const res = await API.get("/orders/admin/revenue")
            setRevenue(res.data.totalRevenue)

        } catch (err) {

            console.log(err)

        }

    }


    const loadTopProducts = async () => {

        try {

            const res = await API.get("/products/admin/top-products")
            setTopProducts(res.data)

        } catch (err) {

            console.log(err)

        }

    }



    /* ---------------- INITIAL LOAD + REALTIME ---------------- */

    useEffect(() => {

        loadStats()
        loadProductStats()
        loadRevenue()
        loadTopProducts()

        socket.on("orderUpdate", () => {

            loadStats()
            loadProductStats()
            loadRevenue()
            loadTopProducts()

        })

        return () => {

            socket.off("orderUpdate")

        }

    }, [])



    if (!stats) {
        return <div className="text-center mt-5">Loading Dashboard...</div>
    }



    /* ---------------- ORDER CHART ---------------- */

    const orderChartData = {

        labels: [
            "Placed",
            "Confirmed",
            "In Transit",
            "Out For Delivery",
            "Delivered",
            "Cancelled",
            "Returned"
        ],

        datasets: [

            {

                data: [
                    stats.placed || 0,
                    stats.confirmed || 0,
                    stats.in_transit || 0,
                    stats.out_for_delivery || 0,
                    stats.delivered || 0,
                    stats.cancelled || 0,
                    stats.returned || 0
                ],

                backgroundColor: [
                    "#0d6efd",
                    "#17a2b8",
                    "#6610f2",
                    "#ffc107",
                    "#198754",
                    "#dc3545",
                    "#6c757d"
                ]

            }

        ]

    }



    /* ---------------- MERGE PRODUCT STATS ---------------- */

    const mergedProducts = Object.values(

        productStats.reduce((acc, item) => {

            const key = item._id.toLowerCase().trim()

            if (!acc[key]) {
                acc[key] = { _id: item._id, totalOrders: 0 }
            }

            acc[key].totalOrders += item.totalOrders

            return acc

        }, {})

    )



    /* ---------------- PRODUCT CHART ---------------- */

    const productChartData = {

        labels: mergedProducts.map(p => p._id),

        datasets: [

            {

                data: mergedProducts.map(p => p.totalOrders),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                    "#fd7e14"
                ]

            }

        ]

    }



    const totalProductOrders = mergedProducts.reduce(
        (sum, p) => sum + p.totalOrders, 0
    )



    /* ---------------- UI ---------------- */

    return (

        <div className="container mt-4">

            <h4 className="mb-3">Analytics Dashboard</h4>



            {/* ---------------- TOP CARDS ---------------- */}

            <div className="row mb-4">

                {/* Revenue */}

                <div className="col-6 col-md-3 mb-3">

                    <div className="card shadow-sm text-center">

                        <div className="card-body py-3">

                            <h6 className="mb-1">Revenue</h6>

                            <h4 className="text-success mb-0">₹{revenue}</h4>

                        </div>

                    </div>

                </div>


                {/* Top Products */}

                {topProducts && topProducts.length > 0 && topProducts.slice(0, 2).map((p, i) => (

                    <div key={i} className="col-6 col-md-3 mb-3">

                        <div className="card shadow-sm text-center">

                            <div className="card-body py-3">

                                <h6 className="mb-1">🏆 {p._id}</h6>

                                <h4 className="mb-0">{p.totalSold}</h4>

                                <small className="text-muted">Top Selling</small>

                            </div>

                        </div>

                    </div>

                ))}

            </div>



            {/* ---------------- TABS ---------------- */}

            <ul className="nav nav-tabs mb-4">

                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >

                        Orders

                    </button>

                </li>


                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "products" ? "active" : ""}`}
                        onClick={() => setActiveTab("products")}
                    >

                        Product Wise

                    </button>

                </li>


                <li className="nav-item">

                    <button
                        className={`nav-link ${activeTab === "today" ? "active" : ""}`}
                        onClick={() => setActiveTab("today")}
                    >

                        Today Orders

                    </button>

                </li>

            </ul>



            {/* ---------------- ORDERS TAB ---------------- */}

            {activeTab === "orders" && (

                <div className="row">

                    <div className="col-lg-6 mb-4">

                        <div className="card shadow-sm p-3 text-center">

                            <h6 className="mb-3">Order Status Distribution</h6>

                            <div style={{ width: "250px", height: "250px" }} className="mx-auto">

                                <Doughnut
                                    data={orderChartData}
                                    options={{ maintainAspectRatio: false }}
                                />

                            </div>

                        </div>

                    </div>



                    <div className="col-lg-6">

                        <div className="row">

                            {[
                                ["Total Orders", stats.totalOrders],
                                ["Placed", stats.placed],
                                ["Confirmed", stats.confirmed],
                                ["In Transit", stats.in_transit],
                                ["Out For Delivery", stats.out_for_delivery],
                                ["Delivered", stats.delivered],
                                ["Cancelled", stats.cancelled],
                                ["Returned", stats.returned]
                            ].map((item, i) => (

                                <div key={i} className="col-6 mb-3">

                                    <div className="card shadow-sm text-center">

                                        <div className="card-body py-2">

                                            <h6 className="mb-1">{item[0]}</h6>

                                            <h5 className="mb-0">{item[1] || 0}</h5>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            )}



            {/* ---------------- PRODUCT TAB ---------------- */}

            {activeTab === "products" && (

                <div className="row">

                    <div className="col-lg-6 mb-4">

                        <div className="card shadow-sm p-3 text-center">

                            <h6 className="mb-3">Product Wise Orders</h6>

                            <div style={{ height: "250px" }}>

                                <Doughnut
                                    data={productChartData}
                                    options={{ maintainAspectRatio: false }}
                                />

                            </div>

                        </div>

                    </div>



                    <div className="col-lg-6">

                        <div className="row">

                            <div className="col-12 mb-3">

                                <div className="card shadow-sm text-center">

                                    <div className="card-body py-2">

                                        <h6>Total Product Orders</h6>

                                        <h5>{totalProductOrders}</h5>

                                    </div>

                                </div>

                            </div>



                            {mergedProducts.map(p => (

                                <div key={p._id} className="col-6 mb-3">

                                    <div className="card shadow-sm text-center">

                                        <div className="card-body py-2">

                                            <h6 className="mb-1">{p._id}</h6>

                                            <h5 className="mb-0">{p.totalOrders}</h5>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            )}



            {/* ---------------- TODAY ORDERS TAB ---------------- */}

            {activeTab === "today" && (

                <TodayOrdersChart />

            )}

        </div>

    )

}