import { useState } from "react"
import API from "../../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function ForgotPassword(){

const [email,setEmail] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const handleSubmit = async(e)=>{

e.preventDefault()

try{

setLoading(true)

await API.post("/auth/forgot-password",{email})

toast.success("OTP sent to your email")

navigate("/reset-password",{state:{email}})

}catch(err){

toast.error(err.response?.data?.message || "Error sending OTP")

}finally{

setLoading(false)

}

}

return(

<div className="container-fluid vh-100">

<div className="row h-100">

{/* LEFT SIDE IMAGE / INFO */}

<div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-dark text-white">

<div style={{maxWidth:"400px"}}>

<h1 className="mb-4">Reset Your Password</h1>

<p>
Forgot your password? Don't worry. Enter your email
address and we will send you a one-time password (OTP)
to securely reset your account password.
</p>

<p>
Make sure you enter the same email you used when
creating your account.
</p>

</div>

</div>


{/* RIGHT SIDE FORM */}

<div className="col-lg-6 d-flex align-items-center justify-content-center">

<div style={{width:"350px"}}>

<h3 className="mb-4 text-center">Forgot Password</h3>

<form onSubmit={handleSubmit}>

<input
type="email"
className="form-control mb-3"
placeholder="Enter your email"
value={email}
onChange={e=>setEmail(e.target.value)}
required
/>

<button
className="btn btn-dark w-100"
disabled={loading}
>

{loading ? (
<>
<span
className="spinner-border spinner-border-sm me-2"
role="status"
></span>
Sending OTP...
</>
) : (
"Send OTP"
)}

</button>

</form>

</div>

</div>

</div>

</div>

)

}