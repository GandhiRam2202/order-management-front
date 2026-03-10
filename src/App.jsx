import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* USER */
import Navbar from "./components/user/Navbar";
import Home from "./pages/user/Home";
import Category from "./pages/user/Category";
import Profile from "./pages/user/Profile";
import MyOrders from "./pages/user/MyOrders";

/* ADMIN */
import AdminNavbar from "./components/admin/AdminNavbar";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Chart from "./pages/admin/Chart";
import { Toaster } from "react-hot-toast"

import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />

      <Routes>

        {/* AUTH */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER ROUTES */}

        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:category"
          element={
            <ProtectedRoute role="user">
              <>
                <Navbar />
                <Category />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <>
                <Navbar />
                <Profile />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute role="user">
              <>
                <Navbar />
                <MyOrders />
              </>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <>
                <AdminNavbar />
                <Orders />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <>
                <AdminNavbar />
                <Products />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chart"
          element={
            <ProtectedRoute role="admin">
              <>
                <AdminNavbar />
                <Chart />
              </>
            </ProtectedRoute>
          }
        />
   

      </Routes>

    </BrowserRouter>
  );
}

export default App;