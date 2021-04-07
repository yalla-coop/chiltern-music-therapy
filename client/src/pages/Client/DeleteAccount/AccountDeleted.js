import * as S from './style';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';

import Title from '../../../components/Title';
import { navRoutes } from '../../../constants';

const AccountDeleted = ({ clientHistory }) => {
  return (
    <S.Wrapper>
      <Title boldSection="delete" lightSection="Your account has been" />

      <Row mb="8">
        <Col w={[4, 12, 4]}>
          <Button to={navRoutes.GENERAL.LOGIN} text="OK" variant="primary" />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default AccountDeleted;
