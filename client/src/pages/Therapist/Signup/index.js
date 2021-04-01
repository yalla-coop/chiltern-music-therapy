import { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { BasicInput, Checkbox } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { navRoutes } from '../../../constants';
import { useAuth } from '../../../context/auth';
import validate from '../../../validation/schemas/signup';
import { roles } from './../../../constants';

import { Users } from '../../../api-calls';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreedOnTerms: false,
  httpError: '',
  validationErrs: {},
  submitAttempt: false,
  loading: false,
};

function reducer(state, newState) {
  return { ...state, ...newState };
}
const cleanEmail = (email) => email.toLowerCase().trim();

const TherapistSignup = ({ status, title, msg }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const history = useHistory();
  const { setUser } = useAuth();

  const {
    firstName,
    lastName,
    email,
    password,
    agreedOnTerms,
    httpError,
    validationErrs,
    submitAttempt,
    loading,
  } = state;

  const validateForm = () => {
    try {
      validate({
        role: roles.THERAPIST,
        email: cleanEmail(email),
        firstName,
        lastName,
        password,
        agreedOnTerms,
      });
      setState({ validationErrs: {} });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setState({ validationErrs: error.inner });
      }
      return false;
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, password, agreedOnTerms]);

  const handleSignup = async () => {
    setState({ loading: true });
    const { error, data } = await Users.signup({
      role: roles.THERAPIST,
      email: cleanEmail(email),
      firstName,
      lastName,
      password,
    });
    setState({ loading: false });
    if (error) {
      if (error.statusCode === 409) {
        setState({ validationErrs: { email: error.message } });
      } else {
        setState({ httpError: error.message });
      }
    } else {
      setUser(data);
      history.push(navRoutes.THERAPIST.WELCOME);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ submitAttempt: true });

    const isValid = validateForm();
    if (isValid) {
      handleSignup();
    }
  };

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <Row>
        <Col w={[4, 12, 8]}>
          <T.H1 color="black" mb={6} mbM={5}>
            <span style={{ fontWeight: '900' }}>Sign</span> Up
          </T.H1>
          <T.P color="gray8" mb={6} mbM={5}>
            Chiltern Music Therapy Digital Platform is a space to support your
            client with digital content in between in-person sessions and
            enhance therapeutic outcomes.
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="First name..."
            label="First name"
            value={firstName}
            handleChange={(value) => setState({ firstName: value })}
            error={validationErrs.firstName}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Last name..."
            label="Last name"
            value={lastName}
            handleChange={(value) => setState({ lastName: value })}
            error={validationErrs.lastName}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Email..."
            label="Email"
            type="email"
            value={email}
            handleChange={(value) => setState({ email: value })}
            error={validationErrs.email}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            label="Password"
            placeholder="Password..."
            showPasswordInfo
            type="password"
            value={password}
            handleChange={(value) => setState({ password: value })}
            error={validationErrs.password}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]}>
          <Checkbox
            checked={agreedOnTerms}
            handleChange={(e) => setState({ agreedOnTerms: e })}
            error={validationErrs.agreedOnTerms}
            label={
              <>
                <T.P>
                  I agree to the{' '}
                  <T.Link
                    to={navRoutes.EXTERNAL.TERMS_OF_USE}
                    bold
                    underline
                    external
                  >
                    Terms of Use
                  </T.Link>{' '}
                  and{' '}
                  <T.Link
                    to={navRoutes.EXTERNAL.TERMS_OF_USE}
                    bold
                    underline
                    external
                  >
                    Privacy Policy
                  </T.Link>
                  .
                </T.P>
              </>
            }
          />
          <T.P mt="5" color="error">
            {httpError}
          </T.P>
          <Button
            mt={7}
            mtT={5}
            mtM={5}
            text="Sign up"
            type="submit"
            loading={loading}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default TherapistSignup;
