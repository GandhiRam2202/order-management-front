# Order Management System - Frontend

# Project Live Link [Netlify](https://grp-order-management.netlify.app/)

# Admin Login
# Admin : Admin@shop.com
# Password : adminadmin

A modern **React.js frontend application** for an **Order Management System** where users can browse products, place orders, and track their order status while admins can manage products and orders.

This frontend communicates with the backend built using **Node.js, Express, MongoDB, and Socket.IO**.

---

# 🚀 Features

## 👤 User Features

* User Registration
* User Login
* Browse Products
* View Product Categories
* Place Orders
* Cancel Orders
* Return Orders
* View Order History
* Track Order Status
* Real-time order updates

---

## 🛠 Admin Features

* Admin Dashboard
* View All Orders
* Manage Order Status
* Create Products
* Edit Products
* Delete Products
* Order Statistics Dashboard
* Today's Orders Chart

---

# 📸 Screenshots

## Login Page

![Login](./src/screenshots/login.png)

## Register Page

![Login](./src/screenshots/register.png)

## Forgot Password Page

![Forgot Password](./src/screenshots/forgotpassword.png)

## Reset Password

![Reset Password](./src/screenshots/resetpassword.png)

## Admin Home page

![Admin](./src/screenshots/allorders.png)

## Placed order list

![Admin](./src/screenshots/placed.png)

## Confirmed order list

![Admin](./src/screenshots/confirmed.png)

## IN Transit order list

![Admin](./src/screenshots/intransit.png)

## Out For Deliver order list

![Admin](./src/screenshots/outfordelivery.png)

## Delivered order list

![Admin](./src/screenshots/delivered.png)

## Cancelled order list

![Admin](./src/screenshots/cancelled.png)

## Returned order list

![Admin](./src/screenshots/returned.png)

## Add Product order list

![Admin](./src/screenshots/addproduct.png)

## Orders Chart

![Admin](./src/screenshots/orderschart.png)

## Product Chart

![Admin](./src/screenshots/productschart.png)

## Today Orders Chart

![Admin](./src/screenshots/todaychart.png)

## Today Orders Graph

![Admin](./src/screenshots/todaygraph.png)

## User Home page

![User](./src/screenshots/usersidesite.png)

## User Profile page

![User](./src/screenshots/userprofile.png)

## User Orders page

![User](./src/screenshots/myorders.png)

# 🏗 Tech Stack

### Frontend

* **React.js**
* **React Router DOM**

### API Communication

* **Axios**

### Real-time Updates

* **Socket.IO Client**

### Charts

* **Chart.js**

### Styling

* **CSS**

---

# 📁 Project Structure

```
src
│
├── components
│   │
│   ├── admin
│   │   └── AdminNavbar.jsx
│   │
│   ├── user
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   └── ProtectedRoute.jsx
│
├── pages
│   │
│   ├── admin
│   │   ├── Chart.jsx
│   │   ├── Orders.jsx
│   │   ├── Products.jsx
│   │   └── TodayOrdersChart.jsx
│   │
│   ├── auth
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   └── user
│       ├── Home.jsx
│       ├── Category.jsx
│       ├── MyOrders.jsx
│       └── Profile.jsx
│
├── services
│   └── api.js
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/GandhiRam2202/your-repo-name.git
```

## 2️⃣ Navigate to Project

```
cd frontend
```

## 3️⃣ Install Dependencies

```
npm install
```

## 4️⃣ Run Development Server

```
npm run dev
```

Application will run at:

```
http://localhost:5173
```

---

# 🔗 Backend API

Make sure the backend server is running:

```
http://localhost:3000
```

API configuration file:

```
src/services/api.js
```

Example configuration:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api"
});

export default API;
```

---

# 📊 Order Status Flow

Orders move through the following stages:

```
Placed
Confirmed
In Transit
Out For Delivery
Delivered
```

Additional statuses:

```
Cancelled
Returned
```

Admins update the order status from the admin dashboard.

---

# ⚡ Real-Time Order Updates

This project uses **Socket.IO** to provide real-time updates.

Examples:

* Admin confirms an order → User sees the update instantly
* Order moves to **Out For Delivery** → User dashboard updates automatically
* Delivered orders update in real-time

---

# 🔐 Authentication

Authentication uses **JWT tokens**.

After login:

* Token is stored in **localStorage**
* Token is sent in API request headers

Example:

```
Authorization: Bearer <token>
```

Protected routes are handled using:

```
components/ProtectedRoute.jsx
```

---

# 📊 Admin Dashboard

The admin dashboard includes:

### 📦 Orders Management

Tabs for order statuses:

* Placed
* Confirmed
* In Transit
* Out For Delivery
* Delivered
* Cancelled
* Returned

### 🛍 Product Management

Admins can:

* Add products
* Update products
* Delete products

### 📈 Analytics

Charts available:

* Total Orders
* Delivered Orders
* Cancelled Orders
* Today's Orders

---

# 📦 Future Improvements

Possible enhancements:

* Online Payment Integration
* Delivery Tracking
* Push Notifications
* Product Search
* Filters
* Wishlist
* Mobile App Version (React Native)

---

# 👨‍💻 Author

Developed by **Parthi**

GitHub:
https://github.com/GandhiRam2202

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the repository
🚀 Contribute improvements
