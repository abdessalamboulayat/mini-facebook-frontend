import { useContext, useState } from "react";
import AsideProfile from "../components/profile/AsideProfile";
import authContext from "../context/AuthContextProvider";
import useGetUserPosts from "../hooks/post/useGetUserPosts";
import useGetUser from "../hooks/user/useGetUser";
import useUpdateUser from "../hooks/user/useUpdateUser";
import { updateUserInput } from "../types/profile/Types";
import MainProfile from "./MainProfileContainer";
import useGetProfile from "../hooks/user/useGetProfile";
import useUpdateProfile from "../hooks/user/useUpdateProfile";
import PopupPictureProfile from "../components/profile/PopupPictureProfile";
import Spinner from "../components/spinner/Spinner";

function ProfileContainer(){
    const user : any = useContext(authContext)?? "";
     

    const [popupProfile, setPopupProfile] = useState(false);
    const [profileImage, setProfileImage] = useState<any>("");

    
    const {status, userData, error} = useGetUser(user.authState.userId);
    console.log("user : ", userData);
    const {statusProfile, userProfile} = useGetProfile(user.authState.userId);
    const {statusPost, posts} = useGetUserPosts(user.authState.userId);
    const {updateUserMutation} = useUpdateUser();
    const {updateProfileMutation} = useUpdateProfile();

    const handlePopup = () => setPopupProfile(!popupProfile);

    const updateUser = (userId: string, user: updateUserInput) => {
        updateUserMutation.mutate({ user, userId });
    }
    const handleUpdateUser = (userId: string, user: updateUserInput) =>{
        updateUser(userId, user);
    }
    const handleUpdateProfile = (event : any) => {
        event.preventDefault();
        console.log("profileImage : ", profileImage);
        updateProfileMutation.mutateAsync({ image: profileImage, userId: user.authState.userId });
    }

   const handleFileChange = (event : any) => {
        setProfileImage(event.target.files?.[0]);
    };
    const changeProfileImage = () => {
      
    }
   
   return(
        <>
        { status === "loading" ? <Spinner/>:
        <>
            <div className="relative grid grid-cols-12 ">
                <div className="col-span-5">
                    <AsideProfile user={userData!} updateUserClick={handleUpdateUser} posts={posts}  status={statusProfile}  handleProfileChange={handlePopup}/>
                </div>
                <div className="col-span-7">
                    <MainProfile user={userData!} posts={posts} statusPost={statusPost}/>
                </div>
            </div>
            {popupProfile && (
                <PopupPictureProfile handleFileChange={handleFileChange} submitProfileChange={handleUpdateProfile} handlePopup={handlePopup} />
            )}
        </>
            }
        </> 
    )

}

export default ProfileContainer;