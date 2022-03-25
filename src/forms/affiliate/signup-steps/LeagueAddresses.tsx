import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
interface AddressesFields {
    mailingAddressObject?: Object,
    mailingAddressText: string,
    playingFacilityName: string,
    playingFacilityLocationObject?: Object,
    playingFacilityLocationText: string
}

type PreStepsProps = {
    handleSuccessStep: (arg: number) => void
}

const LeagueAddresses = ({ handleSuccessStep }: PreStepsProps) => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const initialValues: AddressesFields = {
        mailingAddressText: "",
        playingFacilityName: "",
        playingFacilityLocationText: ""
    };

    const validationSchema = Yup.object().shape({

    });

    // TODO: handleSubmit()
    const handleSubmit = () => {
        setSuccessful(false);
        setMessage('');
        setLoading(true);
        handleSuccessStep(3);
    };

    return (
        <div className="LeagueName">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-5">
                    <div className="form-group my-10">
                        <div className="instruction text-center text-lg">
                            <p>Set your Affiliate Mailing &amp; Playing Address - this will also dictate your League's country, location radius and time zone.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <Field name="mailingAddressText" type="text" className="form-control" placeholder="44 Mamaroneck Ave. White Plains, NY, USA" />
                        <ErrorMessage
                            name="mailingAddressText"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <Field name="playingFacilityName" type="text" className="form-control" placeholder="Saxon Woods Park" />
                        <ErrorMessage
                            name="playingFacilityName"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <Field name="playingFacilityLocationText" type="text" className="form-control" placeholder="1800 Mamaroneck Ave, White Plains, NY,USA" />
                        <ErrorMessage
                            name="playingFacilityLocationText"
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

    )
};

export default LeagueAddresses;