import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { BasicInput, Checkbox } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { navRoutes } from '../../../constants';

const ErrorRoute = ({ status, title, msg }) => (
  <S.Wrapper>
    <Row>
      <Col w={[4, 12, 8]}>
        <T.H1 color="black" mb={6} mbT={6} mbM={5}>
          <span style={{ fontWeight: '900' }}>Sign</span> Up
        </T.H1>
        <T.P color="gray8" mb={6} mbT={6} mbM={5}>
          Chiltern Music Therapy Digital Platform is a space to support your
          client with digital content in between in-person sessions and enhance
          therapeutic outcomes.
        </T.P>
      </Col>
    </Row>
    <Row>
      <Col w={[4, 12, 4]} mb={7} mbT={5} mbM={5}>
        <BasicInput placeholder="First name..." label="First name" />
      </Col>
      <Col w={[4, 12, 4]} mb={7} mbT={5} mbM={5}>
        <BasicInput placeholder="Last name..." label="Last name" />
      </Col>
    </Row>
    <Row>
      <Col w={[4, 12, 4]} mb={7} mbT={5} mbM={5}>
        <BasicInput placeholder="Email..." label="Email" />
      </Col>
      <Col w={[4, 12, 4]} mb={7} mbT={5} mbM={5}>
        <BasicInput
          label="Password"
          placeholder="Password..."
          showPasswordInfo
          type="password"
        />
      </Col>
    </Row>
    <Row>
      <Col w={[4, 12, 4]}>
        <Checkbox
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
        <Button mt={7} mtT={5} mtM={5}>
          Sign up
        </Button>
      </Col>
    </Row>
  </S.Wrapper>
);

export default ErrorRoute;
