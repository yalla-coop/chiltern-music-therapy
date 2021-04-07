import { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { Row, Col } from '../../../components/Grid';
import validate from '../../../validation/schemas/forgotPassword';
import { Users } from '../../../api-calls';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const cleanEmail = (email) => email.toLowerCase().trim();

  const validateEmail = () => {
    try {
      validate({
        email: cleanEmail(email),
      });
      setError('');
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setError(error.inner);
      }
      return false;
    }
  };

  const handleReset = async () => {
    setLoading(true);
    const { error, data } = await Users.resetPasswordLink({
      email: cleanEmail(email),
    });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempt(true);

    const isValid = validateEmail();
    if (isValid) {
      handleReset();
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validateEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <>
      <Title boldSection="Reset" lightSection="Password" boldFirst />
      <Row mb="5">
        <Col w={[4, 8, 6]}>
          <T.P color="gray8">
            Enter the email address associated with your account and we will
            send you a link to reset your password. Please remember to check
            your email junk folder.
          </T.P>
        </Col>
      </Row>
      <Row mb="5">
        <Col w={[4, 8, 4]}>
          <BasicInput
            label="Email"
            handleChange={setEmail}
            placeholder="Email..."
            error={error?.email}
          />
        </Col>
      </Row>
      <Col w={[4, 8, 4]}>
        <Button text="Submit" onClick={handleSubmit} loading={loading} />
      </Col>
    </>
  );
};

export default ForgotPassword;
