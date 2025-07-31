import { useEffect } from 'react'
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import { UserCard } from './UserCard';

export const Feed = () => {
  const feed = useSelector((store) => store.Feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASEURL + "/feed", { withCredentials: true });
      console.log("API raw response:", res.data);
      const actualFeedData = res?.data?.data || res?.data;
      console.log("Dispatching feed:", actualFeedData);
      dispatch(addFeed(actualFeedData));
    } catch (error) {
      console.error("Feed fetch error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    console.log("Feed state updated:", feed);
  }, [feed]);

  return (
    feed && feed.length > 0 && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

