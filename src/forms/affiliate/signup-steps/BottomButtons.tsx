
import { useEffect } from "react";
import { useFormikContext } from "formik";


type BottomButtonsProps = {
    loading: boolean,
    currentStep: number,
    handleNext: (arg: number) => void
}
const BottomButtons = ({loading, currentStep, handleNext}: BottomButtonsProps) => {
    
    useEffect(() => {
        
    }, []);

    const { submitForm } = useFormikContext() ?? {};
    const handleSubmit = () => {
        submitForm();
    };

    
    return (
        <div className="bottom-buttons flex flex-col mt-10 gap-4">
            <div className="form-group flex flex-row gap-5">
                <button type="submit" className="btn narrow grey" disabled={loading} 
                    onClick={() => handleNext(currentStep)}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Skip</span>
                </button>
                <button type="submit" className="btn narrow" disabled={loading} onClick={handleSubmit}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Next</span>
                </button>
            </div>
            <span className="text-small m-auto text-center block">Press <strong>Enter</strong></span>
        </div>

    );
}

export default BottomButtons;


