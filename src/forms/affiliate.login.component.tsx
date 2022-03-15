import { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as TagxLogo } from "../components/svgs/tagx-logo.svg";

import AuthService from "../services/auth.service";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  email: string,
  password: string,
  loading: boolean,
  message: string,
  passwordShown: boolean
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
      passwordShown: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);

  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;

    this.setState({
      message: "",
      loading: true,
    });


    AuthService.login(email, password).then(
      () => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  toggleShowPassword() {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    this.setState({
      passwordShown: !this.state.passwordShown
    });
  }

  render() {
    const { loading, message, passwordShown} = this.state;

    const initialValues = {
      email: "",
      password: "",
    };


    return (
      <div className="grid grid-cols-1 content-start md:grid-cols-2 min-h-screen">
        <div className="col-branding relative h-60 md:h-screen">
          <img
            src="/assets/images/affiliate-bg.jpg"
            alt="affiliate signup background"
            className="absolute block w-full h-full object-cover"
          />
          <TagxLogo className="logo absolute w-11 h-9 top-5 left-5" />
          <div className="text relative m-16 max-w-xs">
            <h2 className="font-title text-3xl font-bold text-white">TagX Affiliate Setup</h2>
          </div>
        </div>
        <div className="col-form flex py-16 px-16">
          <div className="form-wrap m-auto flex flex-col gap-5 w-full">
            <TagxLogo className="logo w-36 h-10 m-auto" />
            <div className="forms-nav">
              <ul className="text-center list-style-none">
                <li className="active">
                  <Link to={"/affiliate-login"}>
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to={"/affiliate-signup"}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleLogin}
            >
              <Form className="flex flex-col gap-5">
                <div className="form-group">
                  <label htmlFor="email">Email <span>*</span></label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert"
                  />
                </div>

                <div className={`form-group pw ${passwordShown ? "pw-shown" : "pw-hidden"}`}>
                  <label htmlFor="password">Password <span>*</span></label>
                  <Field name="password" type={this.state.passwordShown ? 'text' : 'password'} className="form-control" />
                  <span onClick={this.toggleShowPassword} className="pw-toggle">Show Password</span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert"
                  />
                </div>
                <Link to={"/forgot-password"} className="anchor -mt-2">
                  Forgot Password
                </Link>

                <div className="form-group">
                  <button type="submit" className="btn narrow" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group alert">
                    <div className="alert" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>

            <div className="text-center text-gray-600">
              <p>Don’t have an account? &nbsp;
                <Link to={"/affiliate-signup"} className="anchor">
                  Sign Up
                </Link>
              </p>
            </div>

          </div>


        </div>
      </div>
    );
  }
}
