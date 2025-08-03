import React from 'react'

export const UserCard = ({ user }) => {
        console.log("user -", user);
    const {firstName, lastName, photoUrl, age, gender, skills, about } = user;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                alt="user profile"
                    src={photoUrl}
                     />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{
                    firstName + " " + lastName
                }</h2>
                <p>{age}</p>
                <p>{gender}</p>
                <p>{skills}</p>
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-success">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )
}
