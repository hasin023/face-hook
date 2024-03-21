import { useContext } from "react";
import ProfileContext from "../contexts/profileContext";

const useProfile = () => {
    return useContext(ProfileContext);
}

export default useProfile;