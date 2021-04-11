import { useHistory } from 'react-router-dom';

import { Typography as T, Button, Grid } from '../../../components';

import { navRoutes } from '../../../constants';

import * as S from './style';

const { Row, Col } = Grid;

const Success = ({ state }) => {
  const history = useHistory();
  const { clientDetails } = state;
  const { firstInitial, lastInitial, postcode } = clientDetails;

  return (
    <>
      <Row mt={5}>
        <Col w={[4, 9, 7]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>New Programme</strong> successfully added
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>
      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          {/* TODO add client name */}
          <T.P color="gray8">
            {firstInitial} {lastInitial} {postcode} will be notified that they
            can now view this content when they next log in.
          </T.P>
        </Col>
      </Row>

      <Row mt={7}>
        <Col w={[4, 9, 4]}>
          <Button
            variant="primary"
            text="Return home"
            handleClick={() => history.push(navRoutes.THERAPIST.DASHBOARD)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Success;
