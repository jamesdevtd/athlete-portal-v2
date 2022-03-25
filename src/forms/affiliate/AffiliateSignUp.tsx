import { useState } from "react";

import { ReactComponent as TagxLogo } from "../../assets/svgs/tagx-logo.svg";

import PreSteps from "./signup-steps/PreSteps";
import LeagueName from "./signup-steps/LeagueName";
import LeagueLogo from "./signup-steps/LeagueLogo";
import LeagueAddresses from "./signup-steps/LeagueAddresses";
import SetupPayout from "./signup-steps/SetupPayout";
import StepsButtons from "./signup-steps/StepsButtons";


const SignUp = () => {
  const [formStep, setFormStep] = useState<number>(0);

  const handleSuccessStep = (step: number): void => {
    setFormStep(++step);
  }

  // TODO: const params = new URLSearchParams(window.location.search);
  // TODO: const stripecode = params.get('code');  

  return (
    <div className={`grid grid-cols-1 content-start md:grid-cols-2 min-h-screen 
      ${formStep > 0 ? 'in-steps' : 'pre-steps'}`}>
      <div className="col-branding relative h-60 md:h-screen">
        <img
          src="/static/assets/img/affiliate-bg.jpg"
          alt="signup background"
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

          {formStep > 0 && 
            <StepsButtons currentStep={formStep} handleStepChange={setFormStep}/>
          }
          
          <div className="step-wrap m-auto">
            {(() => {
              switch (formStep) {
                case 1:
                  return <LeagueName currentStep={formStep} handleSuccessStep={handleSuccessStep} />
                case 2:
                  return <LeagueLogo currentStep={formStep} handleSuccessStep={handleSuccessStep} />
                case 3:
                  return <LeagueAddresses handleSuccessStep={handleSuccessStep} />
                case 4:
                  return <SetupPayout />
                default:
                  return <PreSteps handleSuccessStep={handleSuccessStep}/>
              }
            })()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
