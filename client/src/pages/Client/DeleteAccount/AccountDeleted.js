import * as S from './style';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';
import * as T from '../../../components/Typography';

import Title from '../../../components/Title';
import { navRoutes } from '../../../constants';

const AccountDeleted = ({ clientHistory }) => {
  return (
    <S.Wrapper>
      <Title boldSection="deleted" lightSection="Your account has been" />

      <Row mb="6" mt="5">
        <Col w={[4, 8, 8]}>
          <T.P color="gray8">Your therapist has been notified.</T.P>
        </Col>
      </Row>
      <Row>
        <S.ButtonWrapper>
          <Col w={[4, 6, 4]}>
            <Button to={navRoutes.GENERAL.LOGIN} text="OK" variant="primary" />
          </Col>
        </S.ButtonWrapper>
      </Row>
    </S.Wrapper>
  );
};

export default AccountDeleted;
