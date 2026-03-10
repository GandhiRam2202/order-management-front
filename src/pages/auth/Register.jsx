import { useNavigate, Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import API from "../../services/api"
import toast from "react-hot-toast"
import { useState } from "react"

export default function Register(){

  const navigate = useNavigate()

  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [loading,setLoading] = useState(false)

  const initialValues = {
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  }

  const validationSchema = Yup.object({

    name: Yup.string()
      .min(3,"Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6,"Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"),null],"Passwords must match")
      .required("Confirm your password")

  })


  const handleSubmit = async(values)=>{

    try{

      setLoading(true)

      const data = {
        name:values.name,
        email:values.email,
        password:values.password
      }

      await API.post("/auth/register",data)

      toast.success("Registration successful! Please login.")

      navigate("/login")

    }catch(err){

      toast.error("Registration failed")

    }finally{

      setLoading(false)

    }

  }



  return(

    <div className="container-fluid vh-100">

      <div className="row h-100">


        {/* LEFT SIDE INFO */}

        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-dark text-white">

          <div style={{maxWidth:"420px"}}>

            <h1 className="mb-4">Create Your Account</h1>

            <p>
              Join our Order Management System to easily browse products,
              place orders, and track your deliveries in real time.
            </p>

            <p>
              Administrators can manage products, update order status,
              and analyze business insights from the dashboard.
            </p>

          </div>

        </div>



        {/* RIGHT SIDE REGISTER */}

        <div className="col-lg-6 d-flex align-items-center justify-content-center">

          <div style={{width:"350px"}}>

            <h3 className="mb-4 text-center">Register</h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >

              <Form>

                <Field
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Full Name"
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger mb-2"
                />


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


                {/* PASSWORD */}

                <div className="input-group mb-2">

                  <Field
                    type={showPassword ? "text":"password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash":"bi-eye"}`}></i>
                  </button>

                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mb-2"
                />


                {/* CONFIRM PASSWORD */}

                <div className="input-group mb-2">

                  <Field
                    type={showConfirmPassword ? "text":"password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`bi ${showConfirmPassword ? "bi-eye-slash":"bi-eye"}`}></i>
                  </button>

                </div>

                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger mb-3"
                />


                {/* REGISTER BUTTON */}

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
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}

                </button>

              </Form>

            </Formik>



            <div className="text-center">

              <p className="mb-2">Already have an account?</p>

              <Link
                to="/login"
                className="btn btn-outline-primary w-100"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}