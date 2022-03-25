import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// TODO import { signup } from "../../../services/auth.service";

interface FormFields {
    firstname: string,
    lastname: string,
    email: string,
    password: string
    referralCode?: string
}

type PreStepsProps = {
    handleSuccessStep: (arg: number) => void
}

const PreSteps = ({ handleSuccessStep }: PreStepsProps) => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setMessage('');
        setSuccessful(true);
        setLoading(false)
    }, []);

    const initialValues: FormFields = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        referralCode: ""
    };

    const validationSchema = Yup.object().shape({
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

    // TODO:
    // const handleSubmit = (formValue: FormFields) => {
    //     TODO const { email, password } = formValue;
    //     TODO
    //     signup(email, password).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //             handleSuccessStep(true);
    //             setLoading(false)
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();

    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         }
    //     );
    // };

    return (
        <>
            <div className="forms-nav mb-6">
                <ul className="text-center list-style-none">
                    <li className="">
                        <Link to={"/admin-portal"}>
                            Log in
                        </Link>
                    </li>
                    <li className="active">
                        <Link to={"/admin-portal/signup"}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={() => handleSuccessStep(0)}
                >
                    <Form className="flex flex-col gap-5">
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
                            <Field name="password" type={passwordShown ? 'text' : 'password'} className="form-control" />
                            <span onClick={() => setPasswordShown(true)} className="pw-toggle">Show Password</span>
                            <p className="note">Use 8 or more characters with a mix of letters, numbers, and symbols.</p>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn narrow" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Submit</span>
                            </button>
                        </div>

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
            </div>
        </>

    )
};

export default PreSteps;