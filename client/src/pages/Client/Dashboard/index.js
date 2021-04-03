import { CLIENT } from '../../../constants/nav-routes';
import { useHistory } from 'react-router';
import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';

import * as S from './style';

const Dashboard = () => {
  const history = useHistory();
  return (
    <div style={{ maxWidth: 1068 }}>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H2>
            Welcome <S.BoldSpan> J </S.BoldSpan> P!
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mt={5}>
          <div style={{ width: '100%', height: 100, background: 'gray' }}>
            <T.P>My therapist</T.P>
            <T.H4 bold>Elizabeth Peters</T.H4>
            <T.Link to={CLIENT.THERAPIST} underline>
              View biography
            </T.Link>{' '}
            <T.Link to={CLIENT.CONTACT_THERAPIST} underline>
              Contact my therapist
            </T.Link>
          </div>
        </Col>
        <Col w={[4, 6, 4]} mt={5}>
          <div
            style={{ width: '100%', height: 100, background: 'blue' }}
            onClick={() => history.push(CLIENT.THERAPY_PLAN)}
          >
            my therapy plan
          </div>
        </Col>
        <Col w={[4, 6, 4]} mt={5}>
          <div
            style={{ width: '100%', height: 100, background: 'blue' }}
            onClick={() => history.push(CLIENT.THERAPY_GOALS)}
          >
            my therapy goals
          </div>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Dashboard;
