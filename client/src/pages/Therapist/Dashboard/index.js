import { CLIENT, THERAPIST } from '../../../constants/nav-routes';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Link, Basic } from '../../../components/Cards';
import { BasicInput as SearchInput } from '../../../components/Inputs';
import moment from 'moment';

import * as S from './style';
import { useState } from 'react';

const decideBorderColor = (n) => {
  if (n > 3) {
    return decideBorderColor(n - 3);
  } else {
    if (n === 1) return 'rainbowHorizontal';
    if (n === 2) return 'Blue';
    if (n === 3) return 'PinkUnder';
  }
};

const Dashboard = () => {
  const [search, setSearch] = useState('');
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

  console.log(decideBorderColor(10));
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };
  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome back, <S.BoldSpan> {data.firstName} </S.BoldSpan>!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={7}>
          <T.H3>My Clients</T.H3>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 4, 4]} mt={6}>
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row mt={5}>
        {data.clients.map((client, index) => {
          return (
            <Col w={[4, 4, 4]} mt={4}>
              <S.CardWrapper>
                <Link
                  variant="client"
                  title="therapy plan"
                  client={{
                    firstInitial: 'J',
                    secondInitial: 'P',
                    postcode: 'SW',
                    id: 1,
                  }}
                  to={THERAPIST.CLIENT.replace(':id', client.id)}
                  borderColor={decideBorderColor(index + 1)}
                />
              </S.CardWrapper>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Basic therapistInfo={data.therapistInfo} variant="therapistInfo" />
          </S.CardWrapper>
        </Col>
        <Col w={[4, 6, 4]} mt={5}></Col>
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
          <T.P>
            My <S.BoldSpan>home programmes</S.BoldSpan>
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
                  to={CLIENT.PROGRAMME.replace(':id', data.programme.id)}
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
