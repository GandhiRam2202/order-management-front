import { Link } from "react-router-dom";

export default function AdminNavbar() {

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (

    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/admin/orders">
          Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminMenu">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/chart">
                Chart
              </Link>
            </li>
           

            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>

  );

}