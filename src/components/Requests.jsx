import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '../utils/constants';
import { addRequests, removeRequests } from '../utils/requestSlice';

export const Requests = () => {
    const requests = useSelector((store) => store.requests);

    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) =>{
        try {
            const res = await axios.post(BASEURL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true
            });
            console.log(res?.data?.data);
            dispatch(removeRequests(_id));
        } catch (error) {
            console.log(error);
            
        }
    }
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASEURL + "/user/requests/received", {
                withCredentials: true
            });
            console.log(res?.data?.data);
            dispatch(addRequests(res?.data?.data))
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() =>{
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests.length === 0) return <h1> no requests found</h1>
  return (
    <div className='p-10 my-10'>
        <h1>
            Requests
        </h1>

        {requests.map((request) => {
            const {_id, firstName, lastName, photoUrl } = request.fromUserId;
           return (
            <div className="card-columns" key={_id}>
                <div className="card">
                    <img className="card-img-top" alt='' src={photoUrl} />
                    <div className="card-body">
                        <h5 className="card-title">{ firstName + " " + lastName }</h5>
                    </div>
                </div>
                <button className="btn btn-primary mr-10" onClick={reviewRequest("rejected", request._id)} >Reject</button>
<button className="btn btn-secondary" onClick={reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          ); 

        })}
    </div>
  )
}
