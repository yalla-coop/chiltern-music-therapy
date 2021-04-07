import { useState } from 'react';
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
  const submitStep = (data) => {
    setState((_state) => ({ ..._state, ...data }));
    setCurrentStep((current) => current + 1);
  };
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
        return <Step5 submitStep={submitStep} />;
      case 6:
        return <Step6 submitStep={submitStep} />;
      default:
        break;
    }
  };
  const lightSection =
    currentStep === 6 ? 'You’ve added your client' : 'New Client';
  const boldSection = currentStep === 6 ? 'Success!' : 'Add';
  return (
    <>
      {currentStep}
      <Title lightSection={lightSection} boldSection={boldSection} boldFirst />
      {renderStep()}
    </>
  );
};

export default AddClient;
