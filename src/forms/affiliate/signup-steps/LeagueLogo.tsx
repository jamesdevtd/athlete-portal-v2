import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import BottomButtons from "./BottomButtons";

interface IStepInputs {
    leagueLogo: string
}

type PreStepsProps = {
    currentStep: number,
    handleSuccessStep: (arg: number) => void
}

const LeagueLogo = ({ handleSuccessStep, currentStep }: PreStepsProps) => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const initialValues: IStepInputs = {
        leagueLogo: ""
    };

    const validationSchema = Yup.object().shape({
        leagueLogo: Yup.string()
            .required("This field is required!"),
    });

    const handleSubmit = () => {
        setSuccessful(false);
        setMessage('');
        setLoading(false);
        handleSuccessStep(2);
    };

    return (
        <div className="leagueLogo">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-5">
                    <div className="form-group my-10">
                        <div className="instruction text-center text-lg">
                            <p>Awesome! Now it's about branding. Upload a logo that can be used for your League. No worries if you don’t have one yet, you can always add your logo later.</p>
                        </div>
                    </div>
                    <div className="form-group uploader-placeholder m-auto">
                        <Field name="leagueLogo" type="file" className="form-control" placeholder="Click to choose a file or drag it here." />
                        <ErrorMessage
                            name="leagueLogo"
                            component="div"
                            className="alert alert-danger text-center"
                        />
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
                    <BottomButtons
                        loading={loading}
                        currentStep={currentStep}
                        handleNext={handleSuccessStep}
                    />
                </Form>
            </Formik>

        </div>

    )
};

export default LeagueLogo;