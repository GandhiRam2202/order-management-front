# Order Management System - Frontend

A modern **React.js frontend application** for an **Order Management System**.
This application allows users to browse products, place orders, track order status, and allows admins to manage orders and products.

The frontend communicates with the backend API built using **Node.js, Express, and MongoDB**.

---

# 🚀 Features

## 👤 User Features

* User Registration
* User Login
* Browse Products
* Place Orders
* Cancel Orders
* Return Orders
* View Order History
* Track Order Status

## 🛠 Admin Features

* Admin Dashboard
* View All Orders
* Manage Order Status
* Create Products
* Edit Products
* Delete Products
* View Order Statistics (Charts)

---

# 🏗 Tech Stack

Frontend Framework:

* **React.js**
* **React Router DOM**

HTTP Requests:

* **Axios**

Real-Time Updates:

* **Socket.IO Client**

Charts:

* **Chart.js**

Styling:

* **CSS / Tailwind / Bootstrap (depending on your setup)**

---

# 📁 Project Structure

```
frontend
│
├── src
│
├── components
│   ├── navbar
│   ├── products
│   ├── orders
│   └── admin
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   ├── ProductList.jsx
│   ├── MyOrders.jsx
│   └── AdminDashboard.jsx
│
├── services
│   └── api.js
│
├── App.jsx
├── main.jsx
└── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/order-management-frontend.git
```

## 2️⃣ Go to Project Folder

```
cd order-management-frontend
```

## 3️⃣ Install Dependencies

```
npm install
```

## 4️⃣ Run Development Server

```
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

# 🔗 Backend API

Make sure the backend server is running:

```
http://localhost:3000
```

Update the API base URL if needed inside:

```
src/services/api.js
```

Example:

```
const API = axios.create({
  baseURL: "http://localhost:3000/api"
})
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

---

# 🖥 Admin Dashboard

The admin dashboard includes:

### 📦 Orders Management

Tabs for viewing orders by status:

* Placed Orders
* Confirmed Orders
* In Transit Orders
* Out For Delivery
* Delivered Orders
* Cancelled Orders
* Returned Orders

### 🛍 Product Management

Admin can:

* Create product
* Update product
* Delete product

### 📊 Analytics

Charts showing:

* Total Orders
* Delivered Orders
* Cancelled Orders
* Pending Orders

---

# 🔐 Authentication

The application uses **JWT authentication**.

After login:

* Token is stored in **localStorage**
* Token is sent in API headers

Example:

```
Authorization: Bearer token
```

---

# 📦 Future Improvements

Possible enhancements:

* Payment Integration
* Delivery tracking
* Push notifications
* Product search and filters
* Wishlist
* Mobile app version

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
