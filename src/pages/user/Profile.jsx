import { Link, useNavigate } from "react-router-dom"

export default function Profile(){

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    navigate("/login")

  }

  return(

    <div className="container mt-5">

      <h3>Profile</h3>

      <div className="mt-3">

        <Link
          className="btn btn-dark me-2"
          to="/my-orders"
        >
          My Orders
        </Link>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  )

}