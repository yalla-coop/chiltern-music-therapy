import { CLIENT } from '../../../constants/nav-routes';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Link, Basic } from '../../../components/Cards';
import moment from 'moment';

import * as S from './style';

const Dashboard = () => {
  const data = {
    firstName: 'Joe',
    lastName: 'Petter',
    therapistInfo: {
      firstName: 'Elizabeth',
      lastName: 'Peters',
      id: '1',
    },
    programme: { date: moment(), id: 0 },
  };
  const firstLatter = data.firstName[0].toUpperCase();
  const lastLatter = data.lastName[0].toUpperCase();
  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome <S.BoldSpan> {firstLatter} </S.BoldSpan> {lastLatter}!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Basic therapistInfo={data.therapistInfo} variant="therapistInfo" />
          </S.CardWrapper>
        </Col>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Link
              variant="graphic1"
              title="therapy plan"
              to={CLIENT.THERAPY_PLAN}
            />
          </S.CardWrapper>
        </Col>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Link
              variant="graphic2"
              title="therapy goals"
              to={CLIENT.THERAPY_GOALS}
            />
          </S.CardWrapper>
        </Col>
      </Row>
      <Row mt={8}>
        <Col w={[4, 12, 12]}>
          <T.P weight="light">
            My
            <S.BoldSpan> home programmes</S.BoldSpan>
          </T.P>
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          {data?.programme?.date ? (
            <>
              <S.CardWrapper>
                <Link
                  variant="programme"
                  programme={data.programme}
                  to={CLIENT.INDIVID_PROGRAMME.replace(
                    ':id',
                    data.programme.id
                  )}
                />
              </S.CardWrapper>
              <T.Link to={CLIENT.PROGRAMMES} weight="bold" mt={7}>
                View more
              </T.Link>
            </>
          ) : (
            <Basic variant="noProgrammes" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
