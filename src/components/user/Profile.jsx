import React from 'react';
import ProfileSidebar from './partials/ProfileSidebar';
import UpdateUserInfos from './UpdateUserInfos';

const Profile = () => {
    return (
  
             <div className='row my-5'>
            <ProfileSidebar />
            <UpdateUserInfos profile={true}/>
           
        </div>
       
    );
};

export default Profile;