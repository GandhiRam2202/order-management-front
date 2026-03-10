import { useEffect, useState } from "react"
import API from "../../services/api"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

import { Line, Doughnut } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
)

export default function TodayOrdersChart() {

    const [stats, setStats] = useState(null)
    const [total, setTotal] = useState(0)

    const loadTodayOrders = async () => {

        try {

            const res = await API.get("/orders/admin/orders-today")

            setStats(res.data.stats)
            setTotal(res.data.total)

        } catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {
        loadTodayOrders()
    }, [])


    if (!stats) {
        return <div className="text-center mt-3">Loading...</div>
    }


    const labels = [
        "Placed",
        "Confirmed",
        "In Transit",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
        "Returned"
    ]

    const values = [
        stats.Placed || 0,
        stats.Confirmed || 0,
        stats.In_Transit || 0,
        stats.Out_For_Delivery || 0,
        stats.Delivered || 0,
        stats.Cancelled || 0,
        stats.Returned || 0
    ]


    /* ---------- ROUND CHART ---------- */

    const doughnutData = {
        labels: labels,
        datasets: [
            {
                data: values,
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


    /* ---------- LINE CHART ---------- */

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: "Today's Orders",
                data: values,
                borderColor: "#0d6efd",
                backgroundColor: "rgba(13,110,253,0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 5
            }
        ]
    }


    return (

        <div className="container mb-4">


            {/* TOP SECTION */}

            <div className="card shadow-sm p-3 mb-4">

                <h6 className="mb-3">📊 Today Orders Distribution</h6>

                <div className="row align-items-center">


                    {/* LEFT ROUND CHART */}

                    <div className="col-md-5 text-center">

                        <div style={{ height: "250px" }}>

                            <Doughnut
                                data={doughnutData}
                                options={{ maintainAspectRatio: false }}
                            />

                        </div>

                    </div>


                    {/* RIGHT COUNTS */}

                    <div className="col-md-7">

                        <div className="row">


                            <div className="col-6 mb-2">
                                <div className="card shadow-sm text-center">
                                    <div className="card-body py-2">
                                        <h6>Total</h6>
                                        <h5>{total}</h5>
                                    </div>
                                </div>
                            </div>


                            {[
                                ["Placed", stats.Placed],
                                ["Confirmed", stats.Confirmed],
                                ["In Transit", stats.In_Transit],
                                ["Out For Delivery", stats.Out_For_Delivery],
                                ["Delivered", stats.Delivered],
                                ["Cancelled", stats.Cancelled],
                                ["Returned", stats.Returned]
                            ].map((item, i) => (

                                <div key={i} className="col-6 mb-2">

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

            </div>



            {/* LINE GRAPH */}

            <div className="card shadow-sm p-3">

                <h6 className="mb-3">📈 Today Orders Trend</h6>

                <div style={{ height: "260px" }}>

                    <Line
                        data={lineData}
                        options={{ maintainAspectRatio: false }}
                    />

                </div>

            </div>


        </div>

    )

}