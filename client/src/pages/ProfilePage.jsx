import { useEffect } from "react";
import useAxios from '../hooks/useAxios';
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions/actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

const ProfilePage = () => {

  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }

      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    }

    fetchProfile();
  }, []);


  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  if (state.loading) {
    return <Loader />;
  }

  return (
    <>
      <ProfileInfo />
      <div className="w-full border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      <MyPosts />
    </>
  )
}

export default ProfilePage