import { useEffect, useState} from "react";


const SetupPayout = () => {
    const [onboardingLink, setOnboardingLink] = useState<any>('');

    useEffect(() => {
        setOnboardingLink(process.env.REACT_APP_STRIPE_ONBOARDING_LINK);
    }, []);


    return (
        <div className="SetupPayout">
            <div className="mt-10 flex flex-col gap-5">

                <div className="form-group">
                    <div className="instruction text-center text-lg">
                        <p>Create &amp; Verify Your Payout Account. Your Payout Account is the Account where we will deposit all revenues earned from TagX.</p>
                    </div>
                </div>

                <div>
                    <div className="branding wrap mx-3">
                        <img
                            src="/static/assets/img/stripe-branding.png"
                            alt="signup background"
                            className="block w-full h-auto"
                        />
                    </div>
                    <p className="text-gray-600 mx-auto max-w-sm block text-center">Use our direct integration with Stripe™ to securely provide your information for us to process your payouts.</p>
                </div>

                <a href={onboardingLink ? onboardingLink : '#'} className="btn text-center setup-payout mx-auto" > Setup Payout Account
                </a>

                <span className="text-small m-auto text-center block">Press <strong>Enter</strong></span>

                <a href="/" className="anchor text-center">No Thanks, I'll do this later</a>

            </div>
        </div>
    )
};

export default SetupPayout;