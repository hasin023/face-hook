import Bio from "./Bio";
import ProfileImage from "./ProfileImage";

const ProfileInfo = () => {

    return (
        <div className="flex flex-col items-center py-8 text-center">
            <ProfileImage />
            <Bio />
        </div>
    )
}

export default ProfileInfo;
