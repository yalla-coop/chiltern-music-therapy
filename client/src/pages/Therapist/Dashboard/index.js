import { THERAPIST } from '../../../constants/nav-routes';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Link } from '../../../components/Cards';

import moment from 'moment';

import * as S from './style';
import ClientsSection from './ClientsSection';

const Dashboard = () => {
  const data = {
    firstName: 'lex',
    clients: Array(15).fill({
      firstInitial: 'J',
      secondInitial: 'P',
      postcode: 'SW',
      id: 1,
    }),
    therapistInfo: {
      firstName: 'Elizabeth',
      lastName: 'Peters',
      id: '1',
    },
    programme: { date: moment(), id: 0 },
  };

  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome back, <S.BoldSpan>{data.firstName}</S.BoldSpan>!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={7} mtT={5}>
          <T.H3>My clients</T.H3>
        </Col>
      </Row>
      <ClientsSection clients={data.clients} />
      <Row mt={9} mtT={8}>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Link variant="graphic1" title="library" to={THERAPIST.LIBRARY} />
          </S.CardWrapper>
        </Col>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Link variant="graphic2" title="profile" to={THERAPIST.ACCOUNT} />
          </S.CardWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
