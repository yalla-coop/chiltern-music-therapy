import { TherapistClients } from '../../../api-calls';
import { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const AddClient = () => {
  const [state, setState] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [inviteToken, setInviteToken] = useState('');
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const submitStep = (stepState) => {
    setState((_state) => ({ ..._state, ...stepState }));
    setCurrentStep((current) => current + 1);
  };

  const submitFinalStep = async (stepState) => {
    setState((_state) => ({ ..._state, ...stepState }));
    setSubmitAttempt(true);
  };

  const addNewClient = async () => {
    const { data, error } = await TherapistClients.addNewClient({ state });
    if (data) {
      setInviteToken(data.inviteToken);
      setCurrentStep((current) => current + 1);
    }
    setSubmitAttempt(false);
  };

  useEffect(() => {
    if (submitAttempt) {
      addNewClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitAttempt]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 submitStep={submitStep} />;
      case 2:
        return <Step2 submitStep={submitStep} />;
      case 3:
        return <Step3 submitStep={submitStep} />;
      case 4:
        return <Step4 submitStep={submitStep} />;
      case 5:
        return <Step5 submitStep={submitFinalStep} />;
      case 6:
        return <Step6 inviteToken={inviteToken} />;
      default:
        break;
    }
  };
  const lightSection =
    currentStep === 6 ? 'You’ve added your client' : 'New Client';
  const boldSection = currentStep === 6 ? 'Success!' : 'Add';
  return (
    <>
      <Title lightSection={lightSection} boldSection={boldSection} boldFirst />
      {renderStep()}
    </>
  );
};

export default AddClient;
