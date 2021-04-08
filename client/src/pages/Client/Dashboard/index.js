import { useEffect, useState } from 'react';
import { CLIENT } from '../../../constants/nav-routes';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Link, Basic } from '../../../components/Cards';
import { useAuth } from '../../../context/auth';
import { getInitials } from '../../../helpers';

import { Users, Programmes } from '../../../api-calls';

import * as S from './style';

const Dashboard = () => {
  const [therapist, setTherapist] = useState({});
  const [programmes, setProgrammes] = useState([]);

  const { user } = useAuth();
  const initials = getInitials(user.firstName, user.lastName);

  useEffect(() => {
    const getDashboard = async () => {
      const { data: therapistData, error } = await Users.getUserDashboard();
      const {
        data: programmeData,
        error: err,
      } = await Programmes.getProgrammes({});

      if (!error) {
        setTherapist(therapistData);
      }
      if (!err) {
        setProgrammes(programmeData);
      }
    };

    if (user?.id) {
      getDashboard();
    }
  }, [user.id]);

  const programmesToView = programmes.length > 0;

  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome <S.BoldSpan> {initials.first} </S.BoldSpan> {initials.last}!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mt={5}>
          <S.CardWrapper>
            <Basic open therapistInfo={therapist} variant="therapistInfo" />
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
        <Col w={[4, 6, 4]}>
          {programmesToView ? (
            <>
              <S.CardWrapper>
                <Link
                  variant="programme"
                  programme={{ date: programmes[0].createdAt }}
                  to={CLIENT.INDIVID_PROGRAMME.replace(':id', programmes[0].id)}
                />
              </S.CardWrapper>
              <T.Link to={CLIENT.PROGRAMMES} weight="bold" mt={7} underline>
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
