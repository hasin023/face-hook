import { useReducer } from "react";
import { initialState, profileReducer } from "../reducers/profileReducer";
import ProfileContext from "../contexts/profileContext";

const ProfileProvider = ({ children }) => {

    const [state, dispatch] = useReducer(profileReducer, initialState);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;
