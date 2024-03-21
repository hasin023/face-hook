import { useEffect, useState } from "react";
import useAxios from '../hooks/useAxios';
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  console.log(user, posts);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center py-8 text-center">
        <div
          className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
        >
          <img
            className="max-w-full"
            src={user.avatar}
            alt={user.firstName + " " + user.lastName}
          />

          <button
            className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          >
            <img src="./assets/icons/edit.svg" alt="Edit" />
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {user.firstName}&nbsp;{user.lastName}
          </h3>
          <p className="leading-[231%] lg:text-lg">{user.email}</p>
        </div>

        <div className="mt-4 flex items-start gap-2 lg:mt-6">
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {user.bio || "Add a bio"}
            </p>
          </div>
          <button className="flex-center h-7 w-7 rounded-full">
            <img src="./assets/icons/edit.svg" alt="Edit" />
          </button>
        </div>
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
    </div>
  )
}

export default ProfilePage