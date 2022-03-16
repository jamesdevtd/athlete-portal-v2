import { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as TagxLogo } from "../components/svgs/tagx-logo.svg";
import { ReactComponent as FbLogo } from "../components/svgs/fb-logo.svg";
import { ReactComponent as GoogleLogo } from "../components/svgs/google-logo.svg";

import AuthService from "../services/auth.service";

type Props = {};

type State = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordShown: boolean,
  successful: boolean,
  message: string,
  formStep: number,
};

export default class SignUp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordShown: false,
      successful: false,
      message: "",
      formStep: 1
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);

  }

  toggleShowPassword() {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    this.setState({
      passwordShown: !this.state.passwordShown
    });
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }
  handleStep() {
    console.log('handleStep.... init...');
  }
  handleSignUp(formValue: { firstname: string; lastname: string; email: string; password: string }) {
    const { firstname, lastname, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.signUp(
      firstname,
      lastname,
      email,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message, formStep, passwordShown } = this.state;

    const initialValues = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };

    const renderNextButton = () => {
      if (formStep === 1) {
        return <button type="button" onClick={this.handleStep} className="btn narrow" >Next</button>;
      } else {
        return <button type="submit" className="btn narrow">Sign Up</button>;
      }
    }

    const renderFields = () => {
      if (formStep === 1) {
        return (
          <>
            <div className="form-group">
              <label htmlFor="firstname"> First Name <span>*</span></label>
              <Field name="firstname" type="text" className="form-control" />
              <ErrorMessage
                name="firstname"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname"> Last Name <span>*</span></label>
              <Field name="lastname" type="text" className="form-control" />
              <ErrorMessage
                name="lastname"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"> Email <span>*</span></label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className={`form-group pw ${passwordShown ? "pw-shown" : "pw-hidden"}`}>
              <label htmlFor="password"> Password <span>*</span></label>
              <Field name="password" type={this.state.passwordShown ? 'text' : 'password'} className="form-control" />
              <span onClick={this.toggleShowPassword} className="pw-toggle">Show Password</span>
              <p className="note">Use 8 or more characters with a mix of letters, numbers, and symbols.</p>
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
          </>
        );
      } else {
        <>
          <div className="form-group">
            <label htmlFor="birthday"> First Name <span>*</span></label>
            <Field name="birthday" type="date" className="form-control" />
            <ErrorMessage
              name="birthday"
              component="div"
              className="alert alert-danger"
            />
          </div>


        </>
      }
    }

    return (
      <div className="grid grid-cols-1 content-start md:grid-cols-2 min-h-screen">
        <div className="col-branding relative h-60 md:h-screen">
          <img
            src="/assets/images/signup-bg.jpg"
            alt="signup background"
            className="absolute block w-full h-full object-cover"
          />
          <TagxLogo className="logo absolute w-11 h-9 top-5 left-5" />
          <div className="text relative m-16 max-w-xs">
            <h2 className="font-title text-3xl font-bold text-blue-dark">The Ultimate Tag / Flag Rugby Experience</h2>
          </div>
        </div>
        <div className="col-form flex py-16 px-16">
          <div className="form-wrap m-auto flex flex-col gap-5 w-full">
            <TagxLogo className="logo w-36 h-10 m-auto" />
            <div className="forms-nav">
              <ul className="text-center list-style-none">
                <li className="">
                  <Link to={"/"}>
                    Log in
                  </Link>
                </li>
                <li className="active">
                  <Link to={"/signup"}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleSignUp}
            >
              <Form>
                {!successful && (
                  <div className="flex flex-col gap-5">

                    {renderFields()}

                    <div className="form-group">
                      {renderNextButton()}
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert success" : "alert danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>

            <span className="text-center text-gray-600 -mt-2 -mb-3">or</span>
            <div className="social-logins">
              <button className="btn bg-black">
                <GoogleLogo />
                <span>Sign Up with Google</span>
              </button>
              <button className="btn fb">
                <FbLogo />
                <span>Sign Up with Facebook</span>
              </button>
            </div>

            <div className="text-center text-gray-600">
              <p>Already have an account? &nbsp;
                <Link to={"/login"} className="anchor">
                  Log in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
