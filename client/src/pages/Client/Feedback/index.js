import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CLIENT } from '../../../constants/nav-routes';
import { sendFeedback } from '../../../api-calls/programmes';

import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';

const CurrentQuestion = ({ currentQ, handleStep, handleFinalStep, error }) => {
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
    return <Q4 handleFinalStep={handleFinalStep} pageError={error} />;
  }
  return null;
};

const Feedback = () => {
  const history = useHistory();
  const { id } = useParams();
  const [currentQ, setCurrentQ] = useState(1);
  const [state, setState] = useState({});
  const [error, setError] = useState(null);

  const handleStep = (stepData) => {
    setState((oldState) => ({ ...oldState, ...stepData }));
    setCurrentQ((prevQ) => prevQ + 1);
  };

  const handleFinalStep = async (stepData) => {
    const { error, data } = await sendFeedback({
      ...state,
      ...stepData,
      programmeId: id,
    });
    if (!error) {
      history.push(CLIENT.SUCCESS_FEEDBACK);
    } else {
      setError({ error });
    }
  };

  return (
    <>
      <CurrentQuestion
        currentQ={currentQ}
        handleStep={handleStep}
        handleFinalStep={handleFinalStep}
        error={error}
      />
    </>
  );
};

export default Feedback;
