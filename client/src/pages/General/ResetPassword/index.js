import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { Row, Col } from '../../../components/Grid';
import validate from '../../../validation/schemas/updatePassword';
import { Users } from '../../../api-calls';
import { navRoutes } from '../../../constants';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { token } = useParams();

  const validatePassword = () => {
    try {
      validate({
        password,
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

  const updatePassword = async () => {
    setLoading(true);
    const { error } = await Users.updatePassword({
      password,
      token,
    });
    if (error) {
      setError({ server: error.message });
    } else {
      setUpdated(true);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempt(true);

    const isValid = validatePassword();
    if (isValid) {
      updatePassword();
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validatePassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  if (updated)
    return (
      <>
        <Title boldSection="Reset" lightSection="Password" boldFirst />
        <Row mb="5">
          <Col w={[4, 8, 6]}>
            <T.P color="gray8">Great, you’ve set up a new password!</T.P>
          </Col>
        </Row>
        <Col w={[4, 8, 4]}>
          <Button
            text="Return to log in"
            to={navRoutes.GENERAL.LOGIN}
            loading={loading}
          />
        </Col>
      </>
    );

  return (
    <>
      <Title boldSection="Reset" lightSection="Password" boldFirst />
      <Row mb="5">
        <Col w={[4, 8, 6]}>
          <T.P color="gray8">Please enter new password</T.P>
        </Col>
      </Row>
      <Row mb="5">
        <Col w={[4, 8, 4]}>
          <BasicInput
            label="Password"
            type="password"
            handleChange={setPassword}
            placeholder="Password..."
            error={error?.password}
          />
        </Col>
      </Row>
      {error?.server && (
        <Row mb="4">
          <Col w={[4, 8, 4]}>
            <T.P color="secondary">{error.server}</T.P>
          </Col>
        </Row>
      )}
      <Col w={[4, 8, 4]}>
        <Button text="Submit" onClick={handleSubmit} loading={loading} />
      </Col>
    </>
  );
};

export default ResetPassword;
