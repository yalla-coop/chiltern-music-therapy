import { useReducer, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { BasicInput, Checkbox } from '../../../components/Inputs';
import { Info } from '../../../components/Cards';
import Button from '../../../components/Button';
import { navRoutes } from '../../../constants';
import { useAuth } from '../../../context/auth';
import validate from '../../../validation/schemas/signup';
import { roles } from './../../../constants';

import { Users, TherapistClients } from '../../../api-calls';

const initialState = {
  email: '',
  password: '',
  agreedOnTerms: false,
  consent: false,
  httpError: '',
  validationErrs: {},
  submitAttempt: false,
  therapistName: '',
  loading: false,
};

function reducer(state, newState) {
  return { ...state, ...newState };
}
const cleanEmail = (email) => email.toLowerCase().trim();

const useQuery = () => new URLSearchParams(useLocation().search);

const ClientSignup = ({ status, title, msg }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const history = useHistory();
  const { setUser } = useAuth();

  const query = useQuery();
  const inviteToken = query.get('invite');

  const {
    email,
    password,
    agreedOnTerms,
    over16,
    consent,
    therapistName,
    httpError,
    validationErrs,
    submitAttempt,
    loading,
  } = state;

  const validateForm = () => {
    try {
      validate({
        role: roles.CLIENT,
        email: cleanEmail(email),
        password,
        agreedOnTerms,
        agreedAge: over16 || consent,
        inviteToken,
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
    const getTherapist = async () => {
      const { data, error } = await TherapistClients.getTherapistByInviteToken({
        inviteToken,
      });
      if (error) {
        setState({ httpError: error.message });
      } else {
        setState({ therapistName: `${data.firstName} ${data.lastName}` });
      }
    };

    getTherapist();
  }, [inviteToken]);

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, agreedOnTerms, over16]);

  const handleSignup = async () => {
    setState({ loading: true });
    const { error, data } = await Users.signup({
      role: roles.CLIENT,
      email: cleanEmail(email),
      password,
      over16,
      inviteToken,
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
      history.push(navRoutes.CLIENT.WELCOME);
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
        </Col>
        <Col w={[4, 12, 8]}>
          <T.P color="gray8" mb={4} mbM={3}>
            Your therapist{' '}
            <span style={{ fontWeight: '700' }}>{therapistName}</span> has sent
            you this invite to sign up to the Chiltern Music Therapy Digital
            Platform.
          </T.P>
          <T.P color="gray8" mb={6} mbM={5}>
            This is a space to support your in-person music therapy work, and
            for you and your therapist to share therapeutic resources to be
            accessed at your own time in between sessions.
          </T.P>
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
        <Col w={[4, 12, 3]} mb={7} mbM={5}>
          <Checkbox
            checked={over16}
            handleChange={(e) => setState({ over16: e, consent: false })}
            error={!!validationErrs.agreedAge}
            label="I confirm I am 16 or older"
          />
        </Col>
        <Col w={[4, 12, 1]} mb={7} mbM={5} jc="flex-end" jcT="center">
          <T.P bold color="black">
            or
          </T.P>
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Checkbox
            checked={consent}
            handleChange={(e) => setState({ consent: e, over16: false })}
            error={!!validationErrs.agreedAge}
            label="I am under 16 and I confirm I have the consent of my parent or legal guardian to join Chiltern Music Therapy"
          />
        </Col>
        {validationErrs.agreedAge && (
          <T.P mb="7" mt="-40px" color="error">
            {validationErrs.agreedAge}
          </T.P>
        )}
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
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 6]}>
          <Info
            m={{ mt: 8, mb: 5 }}
            body="Your information is safe with us. All materials are kept confidential and in line with the Data Protection Act 1998, we only keep your data for as long as we need it for, which will be at least for the duration of you receiving our services."
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]}>
          {httpError && (
            <T.P mt="5" color="error">
              {httpError}
            </T.P>
          )}
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

export default ClientSignup;
