import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, } from 'react-redux';
import { actionCreators } from '../../store';
import { RootState } from '../../store/reducers';

import { ReactComponent as TagxLogo } from "../../assets/svgs/tagx-logo.svg";


const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const currentUser = useSelector((state: RootState) => state.currentUser)
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(actionCreators, dispatch);

  const initialValues: { email: string; password: string; } = {
    email: currentUser,
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  let navigate = useNavigate();

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    login(email, password).then(
      () => {
        signIn(email);
        navigate('/admin-portal/profile');
        // window.location.reload();
      },
      (error) => {
        let resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (error.response.status === 401) {
          resMessage = "Invalid email or password";
        }
        if (error.response.status === 404) {
          resMessage = "User Account doesn't exist yet";
        }
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 content-start md:grid-cols-2 min-h-screen">
      <div className="col-branding relative h-60 md:h-screen">
        <img
          src="/static/assets/img/affiliate-bg.jpg"
          alt="affiliate signup background"
          className="absolute block w-full h-full object-cover"
        />
        <TagxLogo className="logo absolute w-11 h-9 top-5 left-5" />
        <div className="text relative m-16 max-w-xs">
          <h2 className="font-title text-3xl font-bold text-white">TagX Affiliate Setup</h2>
        </div>
      </div>
      <div className="col-form flex py-16 px-8 md:px-16">
        <div className="form-wrap m-auto flex flex-col gap-5 w-full">
          <TagxLogo className="logo w-36 h-10 m-auto" />
          <div className="forms-nav">
            <ul className="text-center list-style-none">
              <li className="active">
                <Link to={"/admin-portal/login"}>
                  Log in
                </Link>
              </li>
              <li>
                <Link to={"/admin-portal/signup"}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
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
                <Field name="password" type={passwordShown ? 'text' : 'password'} className="form-control" />
                <span onClick={() => setPasswordShown(true)} className="pw-toggle">Show Password</span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert"
                />
              </div>
              <Link to={"/admin-portal/forgot-password"} className="anchor -mt-2">
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
            <p>Don't have an account? &nbsp;
              <Link to={"/admin-portal/signup"} className="anchor">
                Sign Up
              </Link>
            </p>
          </div>

        </div>


      </div>
    </div>
  );
};

export default Login;
