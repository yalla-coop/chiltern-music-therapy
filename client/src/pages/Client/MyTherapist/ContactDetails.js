import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';

const ContactDetails = ({
  firstName,
  lastName,
  contactEmail,
  contactNumber,
}) => {
  return (
    <S.Wrapper>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H1 color="black" mb={7} mbM={5}>
            <span style={{ fontWeight: '900' }}>Contact</span> My Therapist
          </T.H1>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 3]} display="block">
          <T.P color="gray7" small caps>
            THERAPIST NAME
          </T.P>
          <T.P color="gray8" mb={7} mbM={5} small>
            {firstName} {lastName}
          </T.P>
        </Col>
        <Col w={[4, 6, 3]} display="block">
          <T.P color="gray7" small caps>
            Email
          </T.P>
          <T.P color="gray8" mb={7} mbM={5} small>
            {contactEmail}
          </T.P>
        </Col>
        <Col w={[4, 6, 3]} display="block">
          <T.P color="gray7" small caps>
            mobile number
          </T.P>
          <T.P color="gray8" mb={7} mbM={5} small>
            {contactNumber}
          </T.P>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ContactDetails;
