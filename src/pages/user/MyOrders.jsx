import { useEffect, useState } from "react"
import API from "../../services/api"
import socket from "../../socket"
import toast from "react-hot-toast"

export default function MyOrders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)


  const loadOrders = async () => {

    try {

      const res = await API.get("/orders/my-orders")

      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )

      setOrders(sortedOrders)

      setLoading(false)

    } catch (err) {

      console.log(err)
      setLoading(false)

    }

  }


  const cancelOrder = async (id) => {

    try {

      await API.put(`/orders/cancel/${id}`)
      loadOrders()
      toast.success("Order cancelled successfully")

    } catch (err) {

      console.log(err)
      toast.error("Failed to cancel order")


    }

  }


  const returnOrder = async (id) => {

    try {

      await API.put(`/orders/return/${id}`)
      loadOrders()
      toast.success("Order return initiated successfully")

    } catch (err) {

      console.log(err)
      toast.error("Failed to initiate return")

    }

  }


  const confirmAction = async () => {

    if (actionType === "Cancel") {
      await cancelOrder(selectedOrder)
    }

    if (actionType === "return") {
      await returnOrder(selectedOrder)
    }

    setShowModal(false)

  }


  useEffect(() => {

    loadOrders()

    socket.on("orderUpdate", () => {
      loadOrders()
    })

    return () => {
      socket.off("orderUpdate")
    }

  }, [])



  const getBadgeColor = (status) => {

    switch (status) {

      case "Placed":
        return "secondary"

      case "Confirmed":
        return "info"

      case "In_Transit":
        return "primary"

      case "Out_For_Delivery":
        return "warning"

      case "Delivered":
        return "success"

      case "Cancelled":
        return "danger"

      case "Returned":
        return "dark"

      default:
        return "secondary"
    }

  }


  if (loading) {
    return <p className="text-center">Loading orders...</p>
  }


  return (

    <div>

      <h5 className="text-center mb-4">My Orders</h5>

      {orders.length === 0 && (
        <p className="text-center">No orders yet</p>
      )}


      {orders.map(order => (

        <div key={order._id} className="border-bottom pb-3 mb-3">

          <div className="d-flex gap-3">

            <img
              src={order.productImage}
              alt={order.productName}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "5px"
              }}
            />

            <div>

              <p className="mb-1">
                <strong>{order.productName}</strong>
              </p>

              <p className="mb-1">
                Price : ₹ {order.productPrice}
              </p>

              <p className="mb-1">
                Qty : {order.quantity}
              </p>

              <p className="mb-1">
                Status :
                <span className={`badge bg-${getBadgeColor(order.status)} ms-2`}>
                  {order.status
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                  }
                </span>
              </p>


              {/* Cancel Button */}

              {order.status !== "Delivered" &&
                order.status !== "Cancelled" &&
                order.status !== "Returned" && (

                  <button
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => {
                      setSelectedOrder(order._id)
                      setActionType("Cancel")
                      setShowModal(true)
                    }}
                  >
                    Cancel
                  </button>

                )}


              {/* Return Button */}

              {order.status === "Delivered" && (

                <button
                  className="btn btn-sm btn-warning mt-1"
                  onClick={() => {
                    setSelectedOrder(order._id)
                    setActionType("return")
                    setShowModal(true)
                  }}
                >
                  Return
                </button>

              )}

            </div>

          </div>

        </div>

      ))}



      {/* Confirmation Modal */}

      {showModal && (

        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  Confirm {actionType === "Cancel" ? "Cancel Order" : "Return Order"}
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>

              </div>

              <div className="modal-body">

                <p>
                  Are you sure you want to {actionType} this order?
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmAction}
                >
                  Yes
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}