import { Link } from "react-router-dom";

export default function AdminNavbar() {

  // Function to handle admin logout
  // It removes authentication data from localStorage
  // and redirects the user to the login page
  const logout = () => {
    localStorage.removeItem("token"); // remove saved login token
    localStorage.removeItem("role");  // remove saved user role
    window.location.href = "/login";  // redirect to login page
  };

  // Admin navigation bar component
  return (

    // Bootstrap dark navbar with sticky top behavior
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        {/* Admin panel brand/logo that redirects to orders page */}
        <Link className="navbar-brand" to="/admin/orders">
          Admin Panel
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible navigation menu */}
        <div className="collapse navbar-collapse" id="adminMenu">

          {/* Navigation links aligned to right */}
          <ul className="navbar-nav ms-auto">

            {/* Orders page link */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">
                Orders
              </Link>
            </li>

            {/* Products management page link */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>

            {/* Admin analytics chart page */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/chart">
                Chart
              </Link>
            </li>
           
            {/* Logout button */}
            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={logout} // call logout function when clicked
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