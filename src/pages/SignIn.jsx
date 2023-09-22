import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from "../components/OAuth"
function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleSignInSubmit = async e => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user)
        navigate('/profile')
    } catch (err) {
      toast.error("Invalid Credentials")
    }
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>
        <main>
          <form action="" onSubmit={handleSignInSubmit}>
            <input type="email" name="" id="email" className="emailInput" placeholder="Email" value={email} onChange={handleChange} />
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Passoword" value={password} onChange={handleChange} id="password" />
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={(prevState) => !prevState} />
            </div>
            <Link to={'/forgot-password'} className="forgotPasswordLink"> Forgot Password </Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={'34px'} height={'34px'} />
              </button>
            </div>
          </form>

          {/* Google OAuth Goes Here */}
          <OAuth />

          <Link to={'/sign-up'} className="registerLink">Sign Up Instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignIn