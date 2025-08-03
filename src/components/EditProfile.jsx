import React, { useState } from 'react'
import { UserCard } from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../utils/constants';

export const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [emailId, setEmailId] = useState(user.emailId);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("")

    const [showTost, setshowTost] = useState(false)
    const dispatch = useDispatch();
    const saveProfile = async () =>{
        try {
          const res = await axios.patch(BASEURL + "/profile/edit", {
                photoUrl,
                age, 
                gender, 
                skills, 
                about
              }, { withCredentials: true });
            setshowTost(true);
            setTimeout(() => {
                setshowTost(false);
            }, 3000);
              dispatch(addUser(res?.data?.data));
        } catch (error) {
          setError(error?.response?.data || "somthing goes wrong");
        }
        
      }

  return (
    <div className="flex justify-center">
        <div className="relative flex-col  h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Edit Profile</h1>
                <div className="space-y-4">
                    <div>
                        <div className="div">
                            <span className="text-base div-text">First Name</span>
                        </div>
                        <input type="text"
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)} 
                        placeholder="Name" 
                        className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Last Name</span>
                        </div>
                        <input type="text"
                        value={lastName} 
                        onChange={(e)=> setLastName(e.target.value)}
                        placeholder="Name"
                        className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Email</span>
                        </div>
                        <input type="text"
                        value={emailId}
                        onChange={(e)=> setEmailId(e.target.value)}
                        placeholder="Email Address"
                        className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Photo URL</span>
                        </div>
                        <input type="text"  value={photoUrl} onChange={(e)=> setPhotoUrl(e.target.value)} placeholder="Age" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Age</span>
                        </div>
                        <input type="text"  value={age} onChange={(e)=> setAge(e.target.value)} placeholder="Age" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Gender</span>
                        </div>
                        <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)} placeholder="Gender" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">Skills</span>
                        </div>
                        <input type="text" value={skills} onChange={(e)=> setSkills(e.target.value)} placeholder="Skills" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <div className="div">
                            <span className="text-base div-text">About</span>
                        </div>
                        <input type="text" value={about} onChange={(e)=> setAbout(e.target.value)} placeholder="About" className="w-full input input-bordered" />
                    </div>
                    { error && (
                        <p className='text-red-900'>{ error} </p>
                    )}
                    <div>
                        <button className="btn btn-block" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>

                <div className="flex items-center w-full my-4">
                    <hr className="w-full" />
                    <p className="px-3 ">OR</p>
                    <hr className="w-full" />
                </div>
                <div className="my-6 space-y-2">
                    <button aria-label="Login with Google" type="button"
                        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path
                                d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z">
                            </path>
                        </svg>
                        <p>Login with Google</p>
                    </button>
                    <button aria-label="Login with GitHub" role="button"
                        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path
                                d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z">
                            </path>
                        </svg>
                        <p>Login with GitHub</p>
                    </button>
                </div>
            </div>
            {
                showTost && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile saved successfully.</span>
                        </div>
                    </div>
                )
            }
            
        </div>
        <div>
            <UserCard user={{firstName, lastName, photoUrl, age, gender, skills, about}} />
        </div>
        
    </div>
  )
}
