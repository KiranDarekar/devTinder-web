import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { BASEURL } from '../utils/constants';

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user;

  const handleSendRequest = async (status) => {
    try {
      const res = await axios.post(`${BASEURL}/request/send/${status}/${_id}`, {}, {
        withCredentials: true
      });
      console.log(`${status} request success:`, res.data?.data);

      // Remove user from feed after successful request
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error(`Failed to send ${status} request:`, error);
    }
  };

  

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          alt={`${firstName} ${lastName}'s profile`}
          src={photoUrl}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Skills: {Array.isArray(skills) ? skills.join(', ') : skills}</p>
        <p>About: {about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-outline btn-error"
            onClick={() => handleSendRequest('ignored')}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest('interested')}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
