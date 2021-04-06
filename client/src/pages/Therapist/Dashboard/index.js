import { useEffect, useState } from 'react';

import { THERAPIST } from '../../../constants/nav-routes';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Link } from '../../../components/Cards';

import { useAuth } from '../../../context/auth';

import * as S from './style';
import ClientsSection from './ClientsSection';

import { Users } from '../../../api-calls';

const Dashboard = () => {
  const [clients, setClients] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const getDashboard = async () => {
      const { data, error } = await Users.getUserDashboard();

      if (!error) {
        setClients(data);
      }
    };

    if (user?.id) {
      getDashboard();
    }
  }, [user.id]);

  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome back, <S.BoldSpan>{user.firstName}</S.BoldSpan>!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={7} mtT={5}>
          <T.H3>My clients</T.H3>
        </Col>
      </Row>
      <ClientsSection clients={clients} />
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
