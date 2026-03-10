import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import API from "../../services/api"
import toast from "react-hot-toast"

export default function ResetPassword() {

    const location = useLocation()
    const navigate = useNavigate()

    const email = location.state?.email || ""

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        otp: "",
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object({

        otp: Yup.string()
            .required("OTP is required"),

        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm your password")

    })

    const handleSubmit = async (values) => {

        try {

            setLoading(true)

            await API.post("/auth/reset-password", {
                email,
                otp: values.otp,
                password: values.password
            })

            toast.success("Password reset successful")

            navigate("/login")

        } catch (err) {

            toast.error(err.response?.data?.message || "Reset failed")

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

                        <h1 className="mb-4">Create New Password</h1>

                        <p>
                            Enter the OTP sent to your email and create a new password
                            to regain access to your account.
                        </p>

                        <p>
                            Make sure your password is strong and keep it secure
                            to protect your account.
                        </p>

                    </div>

                </div>


                {/* RIGHT SIDE FORM */}

                <div className="col-lg-6 d-flex align-items-center justify-content-center">

                    <div style={{ width: "350px" }}>

                        <h3 className="mb-4 text-center">Reset Password</h3>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >

                            <Form>

                                {/* EMAIL */}

                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    value={email}
                                    readOnly
                                />


                                {/* OTP */}

                                <Field
                                    type="text"
                                    name="otp"
                                    className="form-control mb-2"
                                    placeholder="Enter OTP"
                                />

                                <ErrorMessage
                                    name="otp"
                                    component="div"
                                    className="text-danger mb-2"
                                />


                                {/* PASSWORD */}

                                <div className="input-group mb-2">

                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="New Password"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
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
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>

                                </div>

                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-danger mb-3"
                                />


                                {/* RESET BUTTON */}

                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            ></span>
                                            Resetting...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}

                                </button>

                            </Form>

                        </Formik>

                    </div>

                </div>

            </div>

        </div>

    )

}