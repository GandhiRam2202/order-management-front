import { Link } from "react-router-dom"
import { useState } from "react"
import MyOrders from "../../pages/user/MyOrders"

export default function Navbar() {

  const [view, setView] = useState("profile")

  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("user")

    window.location.href = "/login"

  }

  return (

    <>
     <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

<div className="container">

{/* LOGO */}
<Link className="navbar-brand" to="/">Shop</Link>


{/* RIGHT SIDE ICONS */}
<div className="d-flex align-items-center gap-3">


{/* PROFILE IMAGE */}
<li className="nav-item d-block d-lg-none">
<button
className="btn p-0 border-0"
data-bs-toggle="offcanvas"
data-bs-target="#profileDrawer"
onClick={()=>setView("profile")}
>
<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
alt="profile"
style={{
width:"35px",
height:"35px",
borderRadius:"50%",
objectFit:"cover"
}}
/>
</button>
</li>



{/* HAMBURGER */}
<button
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#menu"
>
<span className="navbar-toggler-icon"></span>
</button>

</div>


{/* COLLAPSE MENU */}
<div className="collapse navbar-collapse" id="menu">

<ul className="navbar-nav ms-auto">

<li className="nav-item">
<Link className="nav-link" to="/">All</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/category/mobile">Mobile</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to="/category/smartwatch">Smart Watch</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/category/charger">Charger</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/category/airpods">Airpods</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/category/headphones">Headphones</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/category/neckband">Neckband</Link>
</li>

<li className="nav-item d-none d-lg-block">
<button
className="btn p-0 border-0"
data-bs-toggle="offcanvas"
data-bs-target="#profileDrawer"
onClick={()=>setView("profile")}
>
<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
alt="profile"
style={{
width:"35px",
height:"35px",
borderRadius:"50%",
objectFit:"cover"
}}
/>
</button>
</li>

</ul>

</div>

</div>

</nav>


      {/* Drawer */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="profileDrawer"
      >

        <div className="offcanvas-header">

          <h5 className="offcanvas-title">My Account</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        <div className="offcanvas-body">


          {/* PROFILE VIEW */}

          {view === "profile" && (

            <div className="text-center">

              <i className="bi bi-person-circle fs-1 mb-3"></i>

              <h4 className="mb-2">Profile</h4>

              <p className="mb-1 fw-bold">{user?.name}</p>
              <p className="text-muted mb-4">{user?.email}</p>

              <div className="d-grid gap-3">

                <button
                  className="btn btn-outline-dark"
                  onClick={() => setView("orders")}
                >
                  My Orders
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            </div>

          )}


          {/* ORDERS VIEW */}

          {view === "orders" && (

            <div>

              <button
                className="btn btn-sm btn-dark mb-3"
                onClick={() => setView("profile")}
              >
                ← Back
              </button>

              <MyOrders />

            </div>

          )}

        </div>

      </div>

    </>
  )
}