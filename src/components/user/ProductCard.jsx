import API from "../../services/api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProductCard({ product }){

  const navigate = useNavigate()

  const [showModal,setShowModal] = useState(false)

  const token = localStorage.getItem("token")


  const placeOrder = async()=>{

    try{

      await API.post("/orders/place",{
        productId:product._id,
        quantity:1
      })

      setShowModal(false)

      toast.success("Order placed successfully")

    }catch(err){

      console.log(err)
      toast.error("Failed to place order")

    }

  }


  const handleOrderClick = ()=>{

    if(!token){

      alert("Please login first")
      navigate("/login")
      return

    }

    setShowModal(true)

  }


  return(

    <>
    <div className="col-lg-2 col-md-4 mb-4">

      <div className="card h-100">

        <img
        src={product.image}
        className="card-img-top"
        style={{height:"200px",objectFit:"cover"}}
        alt={product.name}
        />

        <div className="card-body">

          <h5>{product.name}</h5>

          <p>₹ {product.price}</p>

          <button
          className="btn btn-primary w-100"
          onClick={handleOrderClick}
          >
          Place Order
          </button>

        </div>

      </div>

    </div>



    {/* Confirm Order Modal */}

    {showModal && (

      <div
      className="modal fade show"
      style={{display:"block",background:"rgba(0,0,0,0.5)"}}
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">Confirm Order</h5>

              <button
              className="btn-close"
              onClick={()=>setShowModal(false)}
              ></button>

            </div>

            <div className="modal-body">

              <p>Do you want to place this order?</p>

              <strong>{product.name}</strong>

              <p>Price : ₹ {product.price}</p>

            </div>

            <div className="modal-footer">

              <button
              className="btn btn-secondary"
              onClick={()=>setShowModal(false)}
              >
              Cancel
              </button>

              <button
              className="btn btn-primary"
              onClick={placeOrder}
              >
              Confirm Order
              </button>

            </div>

          </div>

        </div>

      </div>

    )}

    </>
  )

}