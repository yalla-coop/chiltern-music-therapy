import { useEffect, useReducer, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Col, Row } from '../../../components/Grid';
import { BasicInput } from '../../../components/Inputs';
import ReCaptcha from '../../../components/ReCaptcha';
import Button from '../../../components/Button';
import { navRoutes } from '../../../constants';
import { useAuth } from '../../../context/auth';
import validate from '../../../validation/schemas/login';

import { Users } from '../../../api-calls';

const initialState = {
  email: '',
  password: '',
  httpError: '',
  validationErrs: {},
  submitAttempt: false,
  loading: false,
};

function reducer(state, newState) {
  return { ...state, ...newState };
}
const cleanEmail = (email) => email.toLowerCase().trim();

const Login = ({ status, title, msg }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const history = useHistory();
  const { setUser } = useAuth();

  const {
    email,
    password,
    httpError,
    validationErrs,
    submitAttempt,
    loading,
  } = state;

  useLayoutEffect(() => {
    const script = document.createElement('script');

    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
    const body = document.querySelector('body');
    body.appendChild(script);

    return () => {
      body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    try {
      validate({
        email: cleanEmail(email),
        password,
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
  }, [email, password]);

  const decideRoute = (role) => {
    switch (role) {
      case 'CLIENT':
        return navRoutes.CLIENT.DASHBOARD;
      case 'THERAPIST':
        return navRoutes.THERAPIST.DASHBOARD;
      case 'ADMIN':
        return navRoutes.ADMIN.ALL_CONTENT;
      default:
        break;
    }
  };

  const handleLogin = async (reToken) => {
    setState({ loading: true });

    const { error, data } = await Users.login({
      email: cleanEmail(email),
      password,
      reToken,
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
      history.push(decideRoute(data?.role));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ submitAttempt: true });

    const isValid = validateForm();
    if (isValid) {
      if (process.env.NODE_ENV === 'production') {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, {
              action: 'login',
            })
            .then((reToken) => {
              handleLogin(reToken);
            });
        });
      } else {
        handleLogin();
      }
    }
  };

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H1 color="black" mb={7} mbM={5}>
            <span style={{ fontWeight: '900' }}>Log</span> In
          </T.H1>
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
            autoFocus
          />
        </Col>
        <Col w={[4, 12, 4]} mb={9} mbM={5}>
          <BasicInput
            label="Password"
            placeholder="Password..."
            type="password"
            value={password}
            handleChange={(value) => setState({ password: value })}
            error={validationErrs.password}
          />
          <T.Link to={navRoutes.GENERAL.FORGOT_PASSWORD} color="gray8" mt="2">
            Forgot password?
          </T.Link>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]}>
          {httpError && (
            <T.P mb="4" color="error">
              {httpError}
            </T.P>
          )}
          <Button text="Log in" type="submit" loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]}>
          <ReCaptcha />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default Login;
