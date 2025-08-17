import axios from 'axios';
import { useState } from 'react'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/constants';


export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFrom, setIsLoginFrom] = useState(true)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () =>{
    setError("");

    try {
      const res = await axios.post(BASEURL + "/login", {
            emailId,
            password
          }, { withCredentials: true });

          dispatch(addUser(res.data));
          return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "somthing goes wrong");
    }
    
  }

  const handleSignUp = async () =>{
    setError("");

    try {
      const res = await axios.post(BASEURL + "/signup", {
            firstName,
            lastName,
            emailId,
            password
          }, { withCredentials: true });

          console.log(res.data.data);

          dispatch(addUser(res.data.data));
          return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "somthing goes wrong");
    }
    
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">
            {isLoginFrom ? 'Login now!' : 'Sign up from' }</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              { !isLoginFrom && <>
              <label className="label">First Name : </label>
              <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="input" placeholder="Frist Name" />
              <label className="label">Last Name : </label>
              <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="input" placeholder="Frist Name" />
              </>}
              
              <label className="label">Email Id : </label>
              <input type="text" value={emailId} onChange={(e)=> setEmailId(e.target.value)} className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="input" placeholder="Password" />
              <div>
                <p className="link link-hover" onClick={ () => setIsLoginFrom((value) => !value)} > 
                {isLoginFrom ? 'New User? Sign Up User' : 'Existing User? login Here' } 
                </p>
              </div>
              <p className='text-red-900'>{ error} </p>
              <button className="btn btn-neutral mt-4"
              onClick={isLoginFrom ? handleLogin : handleSignUp }>
                {isLoginFrom ? 'Login' : 'Sign up' } 
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
