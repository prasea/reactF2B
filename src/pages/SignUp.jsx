import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import OAuth from "../components/OAuth";
function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData;
  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      // After successfull Sign Up - Redirects to Explore 
      navigate('/');
    } catch (err) {
      toast.error("Registration Failed")
    }
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>
        <main>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name="" id="name" className="nameInput" placeholder="Name" value={name} onChange={handleChange} />
            <input type="email" name="" id="email" className="emailInput" placeholder="Email" value={email} onChange={handleChange} />
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Passoword" value={password} onChange={handleChange} id="password" />
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={(prevState) => !prevState} />
            </div>
            <Link to={'/forgot-password'} className="forgotPasswordLink"> Forgot Password </Link>

            <div className="signInBar">
              <p className="signInText">Sign Up</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={'34px'} height={'34px'} />
              </button>
            </div>
          </form>

          {/* Google OAuth Goes Here */}
          <OAuth />

          <Link to={'/sign-in'} className="registerLink">Sign In Instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignUp