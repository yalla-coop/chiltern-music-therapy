import { useState } from 'react';
import Title from '../../../components/Title';
import Step1 from './Step1';
import Step2 from './Step2';

const AddClient = () => {
  const [state, setState] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const submitStep = (data) => {
    setState((_state) => ({ ..._state, ...data }));
    setCurrentStep((current) => current + 1);
  };
  const renderStep = () => {
    console.log(state);
    switch (currentStep) {
      case 1:
        return <Step1 submitStep={submitStep} />;
      case 2:
        return <Step2 submitStep={submitStep} />;
      default:
        break;
    }
  };
  return (
    <>
      <Title lightSection="New Client" boldSection="Add" />
      {renderStep()}
    </>
  );
};

export default AddClient;
