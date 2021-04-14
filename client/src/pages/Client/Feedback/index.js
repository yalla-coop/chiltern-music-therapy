import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CLIENT } from '../../../constants/nav-routes';
import { sendFeedback } from '../../../api-calls/programmes';

import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';

const CurrentQuestion = ({ currentQ, handleStep, handleFinalStep }) => {
  if (currentQ === 1) {
    return <Q1 handleStep={handleStep} />;
  }
  if (currentQ === 2) {
    return <Q2 handleStep={handleStep} />;
  }
  if (currentQ === 3) {
    return <Q3 handleStep={handleStep} />;
  }
  if (currentQ === 4) {
    return <Q4 handleFinalStep={handleFinalStep} />;
  }
  return null;
};

const Feedback = () => {
  const history = useHistory();
  const { id } = useParams();
  const [currentQ, setCurrentQ] = useState(1);
  const [state, setState] = useState({});

  const handleStep = (stepData) => {
    setState((oldState) => ({ ...oldState, ...stepData }));
    setCurrentQ((prevQ) => prevQ + 1);
  };

  const handleFinalStep = async (stepData) => {
    await sendFeedback({
      ...state,
      ...stepData,
      programmeId: id,
    });
    history.push(CLIENT.SUCCESS_FEEDBACK);
  };

  return (
    <>
      <CurrentQuestion
        currentQ={currentQ}
        handleStep={handleStep}
        handleFinalStep={handleFinalStep}
      />
    </>
  );
};

export default Feedback;
