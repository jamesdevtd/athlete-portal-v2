import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import * as AuthService from "./services/auth.service";
// import IUser from './types/user.type';

import AffiliateLogin from "./forms/affiliate/AffiliateLogin";
import AffiliateSignUp from "./forms/affiliate/AffiliateSignUp";
import TempShowProfile from "./components/Profile";

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector,  } from 'react-redux';
import { actionCreators } from './store';
import { RootState } from './store/reducers';

const App = () => {
  const [showAffiliateBoard, setShowAffiliateBoard] = useState<boolean>(false);

  const currentUser = useSelector((state: RootState) => state.currentUser)
  const dispatch = useDispatch();
  const { signOut } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {

    if (currentUser) {
      console.log('current user logged in: ' + currentUser)
      // setShowAffiliateBoard(user.roles.includes("ROLE_AFFILIATE"));
      setShowAffiliateBoard(true);
    }

  }, [currentUser]);

  const handleSignOut = () => {
    AuthService.logout();
    signOut()
    setShowAffiliateBoard(false);
  };

  return (
    <div>
      <nav className="temp-navbar hidden">
        <ul className="mr-auto flex list-none">

          {showAffiliateBoard && (
            <li>
              <Link to={"/admin-portal/affiliate"} className="no-underline">
                Affiliate Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li>
              <Link to={"/admin-portal/profile"} className="no-underline">
                TEMP: Show User Profile
              </Link>
            </li>
          )}
        </ul>

        {currentUser ? (
          <ul className="ml-auto flex list-none gap-3">
            <li>
              <Link to={"/admin-portal/profile"} className="no-underline">
                {currentUser.email}
              </Link>
            </li>
            <li>
              <a href="/admin-portal/" className="no-underline" onClick={handleSignOut}>
                LogOut
              </a>
            </li>
          </ul>
        ) : (
          <ul className="ml-auto flex list-none gap-3">
            <li>
              <Link to={"/admin-portal/"} className="no-underline">
                Login
              </Link>
            </li>

            <li>
              <Link to={"/admin-portal/signup"} className="no-underline">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <div className="page">
        <Routes>
          <Route path="/admin-portal" element={<AffiliateLogin />} />
          <Route path="/admin-portal/signup" element={<AffiliateSignUp />} />
          <Route path="/admin-portal/profile" element={<TempShowProfile />} />
        </Routes>
      </div>

    </div >
  );
};

export default App;