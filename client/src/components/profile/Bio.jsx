import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import { useState } from "react";
import { actions } from "../../actions/actions";

const Bio = () => {

    const { state, dispatch } = useProfile();
    const { api } = useAxios();

    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleEditBio = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await api.patch(`/profile/${state?.user?.id}`, { bio });

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
                setEditMode(false);
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    }

    return (
        <>
            <div>
                <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                    {state?.user?.firstName}&nbsp;{state?.user?.lastName}
                </h3>
                <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
            </div>

            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1">
                    {!editMode ? (
                        <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {state?.user?.bio || "Add a bio"}
                        </p>
                    ) : (
                        <textarea
                            rows="2" cols="70"
                            className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    )}

                </div>
                {!editMode ? (
                    <button className="flex-center h-7 w-7 rounded-full"
                        onClick={() => setEditMode(true)}
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>
                ) : (
                    <button
                        className="flex-center h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
                        onClick={handleEditBio}
                    >
                        <img src={CheckIcon} alt="Check" />
                    </button>
                )}

            </div>
        </>
    )
}

export default Bio;
