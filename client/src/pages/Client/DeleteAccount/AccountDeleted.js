import * as S from './style';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';
import * as T from '../../../components/Typography';

import Title from '../../../components/Title';
import { navRoutes } from '../../../constants';

const AccountDeleted = ({ clientHistory }) => {
  return (
    <S.Wrapper>
      <Title boldSection="delete" lightSection="Your account has been" />

      <Row mb="6" mt="5">
        <Col w={[4, 12, 12]}>
          <T.P color="gray8">Your therapist has been notified</T.P>
        </Col>
      </Row>

      <S.ButtonWrapper>
        <Col w={[4, 8, 8]}>
          <Button to={navRoutes.GENERAL.LOGIN} text="OK" variant="primary" />
        </Col>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default AccountDeleted;
