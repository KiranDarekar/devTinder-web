import React from 'react'

export const UserCard = ({ user }) => {
        console.log("user -", user);
    const {firstName , lastName } = user;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={user.photoUrl}
                    alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{
                    firstName + " " + lastName
                }</h2>
                <p>{ user.abou}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-success">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )
}
