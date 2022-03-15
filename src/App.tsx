import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Login from "./forms/login.component";
import AffiliateLogin from "./forms/affiliate.login.component";
import SignUp from "./forms/signup.component";
import AffiliateSignUp from "./forms/affiliate.signup.component";
import TempShowProfile from "./components/profile.component";
import DashBoardUser from "./components/dashboard-user.component";
import DashBoardManager from "./components/dashboard-manager.component";
import DashBoardAdmin from "./components/dashboard-admin.component";

import EventBus from "./common/EventBus";

type Props = {};

type State = {
  showManagerBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showManagerBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="temp-navbar hidden">
          <ul className="mr-auto flex list-none">

            {showManagerBoard && (
              <li>
                <Link to={"/mod"} className="no-underline">
                  Manager Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li>
                <Link to={"/admin"} className="no-underline">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li>
                <Link to={"/user"} className="no-underline">
                  User
                </Link>
              </li>
            )}
          </ul>

          {currentUser ? (
            <ul className="ml-auto flex list-none gap-3">
              <li>
                <Link to={"/profile"} className="no-underline">
                  {currentUser.username}
                </Link>
              </li>
              <li>
                <a href="/" className="no-underline" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </ul>
          ) : (
            <ul className="ml-auto flex list-none gap-3">
              <li>
                <Link to={"/"} className="no-underline">
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/signup"} className="no-underline">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </nav>

        <div className="page">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/affiliatesignup" component={AffiliateSignUp} />
            <Route exact path="/affiliatelogin" component={AffiliateLogin} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={TempShowProfile} />
            <Route path="/user" component={DashBoardUser} />
            <Route path="/mod" component={DashBoardManager} />
            <Route path="/admin" component={DashBoardAdmin} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;