import { useEffect } from "react";

import { useSelector,  } from 'react-redux';
import { RootState } from '../store/reducers';

const Profile: React.FC = () => {

  const currentUser = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {

    if (currentUser) {
      console.log('current user logged in: ' + currentUser)
    } else {
      console.log('current user logged in: BLANK;');
    }

  }, [currentUser]);

  return (
    <div className="container flex py-16 px-16 flex-col gap-10 text-lg m-auto max-w-lg">
      <header className="temp-profile-content">
        <h3>
          Temoprary view for current user check. <br/> This Will be deleted once dashboard development starts
        </h3>
      </header>
      <p>
        <strong>Email: </strong> 
        {currentUser}
      </p>
      <div>
        <strong>Roles: </strong>
        <ul>
          {/* {currentUser.user.roles &&
            currentUser.user.roles.map((role: any, index: number) => {
              return <li key={index}>{role.code}</li>
            })} */}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
