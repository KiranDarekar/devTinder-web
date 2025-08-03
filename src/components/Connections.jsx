import axios from 'axios'
import React, { useEffect } from 'react'
import { BASEURL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

export const Connections = () => {
    const connections = useSelector((store) => store.connections);

    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/connections", {
                withCredentials: true
            });
            console.log(res?.data?.data);
            dispatch(addConnection(res?.data?.data))
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() =>{
        fetchConnections();
    }, []);

    if(!connections) return;

    if(connections.length === 0) return <h1> no connections found</h1>
  return (
    <div className='p-10 my-10 w-30' >
        <h1>
            Connections
        </h1>

        {connections.map((connection) => {
            const { firstName, lastName, photoUrl, skills } = connection;
           return (
            <div className="card-columns" key={connection._id}>
                <div className="card">
                    <img className="card-img-top" alt='' src={photoUrl} />
                    <div className="card-body">
                        <h5 className="card-title">{ firstName + " " + lastName }</h5>
                        <p className="card-text">{skills.length}</p>
                    </div>
                </div>
            </div>
          ); 

        })}
    </div>
  )
}
