import { useState } from 'react';
import Title from '../../../components/Title';
import Step1 from './Step1';

const AddClient = () => {
  const [state, setState] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;

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
