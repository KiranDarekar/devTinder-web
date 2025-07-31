import axios from 'axios';
import { use, useState } from 'react'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/constants';


export const Login = () => {
  const [emailId, setEmailId] = useState("darekarkiran704@gmail.com");
  const [password, setPassword] = useState("Kiran###007");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () =>{
    try {
      const res = await axios.post(BASEURL + "/login", {
            emailId,
            password
          }, { withCredentials: true });

          dispatch(addUser(res.data));
          return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "somthing goes wrong");
      console.error(error)
    }
    
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email Id : {emailId}</label>
              <input type="text" value={emailId} onChange={(e)=> setEmailId(e.target.value)} className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="input" placeholder="Password" />
              <div><a className="link link-hover">Forgot password?</a></div>
              <p className='text-red-900'>{ error} </p>
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
