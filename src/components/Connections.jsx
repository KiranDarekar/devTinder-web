import axios from 'axios';
import React, { useEffect } from 'react';
import { BASEURL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

export const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASEURL + '/user/connections', {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="p-10 my-10 w-full">
      <h1 className="text-2xl font-semibold mb-6">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, skills } = connection;
          return (
            <div className="card bg-base-100 shadow-md" key={_id}>
              <figure>
                <img
                  className="w-full h-64 object-cover"
                  src={photoUrl || 'https://cdn.vectorstock.com/i/1000v/17/61/male-avatar-profile-picture-vector-10211761.jpg'}
                  onError={(e) => { e.target.src = 'https://cdn.vectorstock.com/i/1000v/17/61/male-avatar-profile-picture-vector-10211761.jpg'; }}
                  alt={`${firstName} ${lastName}'s profile`}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{Array.isArray(skills) ? `${skills.length} skills` : 'No skills listed'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
