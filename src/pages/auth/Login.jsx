import { useNavigate, Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import API from "../../services/api"
import toast from "react-hot-toast"
import { useState } from "react"

export default function Login() {

  const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)

  const initialValues = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object({

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")

  })


  const handleSubmit = async (values) => {

    try {

      setLoading(true)

      const res = await API.post("/auth/login", values)

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.user.role)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      if (res.data.user.role === "admin") {
        toast.success("Welcome Admin!")
        navigate("/admin/orders")
      } else {
        toast.success("Login successful!")
        navigate("/")
      }

    } catch (err) {

      toast.error("Invalid email or password")

    } finally {

      setLoading(false)

    }

  }



  return (

    <div className="container-fluid vh-100">

      <div className="row h-100">


        {/* LEFT SIDE INFO */}

        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-dark text-white">

          <div style={{ maxWidth: "400px" }}>

            <h1 className="mb-4">Order Management System</h1>

            <p>
              Manage your products, track orders, and monitor deliveries
              in real time. This dashboard allows administrators to
              control product listings, update order statuses, and
              analyze order statistics efficiently.
            </p>

            <p>
              Customers can easily browse products, place orders,
              track their deliveries, and manage returns seamlessly.
            </p>

          </div>

        </div>



        {/* RIGHT SIDE LOGIN */}

        <div className="col-lg-6 d-flex align-items-center justify-content-center">

          <div style={{ width: "350px" }}>

            <h3 className="mb-4 text-center">Login</h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >

              <Form>

                <Field
                  type="email"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mb-2"
                />


                {/* PASSWORD WITH EYE BUTTON */}

                <div className="input-group mb-2">

                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>

                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mb-2"
                />


                {/* FORGOT PASSWORD LINK */}

                <div className="text-end mb-3">

                  <Link
                    to="/forgot-password"
                    style={{ fontSize: "14px" }}
                  >
                    Forgot Password?
                  </Link>

                </div>


                {/* LOGIN BUTTON WITH LOADING */}

                <button
                  className="btn btn-dark w-100 mb-3"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}

                </button>

              </Form>

            </Formik>



            <div className="text-center">

              <p className="mb-2">Don't have an account?</p>

              <Link
                to="/register"
                className="btn btn-outline-primary w-100"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>


      </div>

    </div>

  )

}