import { useHistory } from 'react-router-dom';

import { Typography as T, Button, Grid } from '../../../components';

import { navRoutes } from '../../../constants';

import * as S from './style';

const { Row, Col } = Grid;

const Success = ({ clientDetails = {} }) => {
  const history = useHistory();

  const { firstName, lastName, postcode } = clientDetails;

  return (
    <>
      <Row mt={5}>
        <Col w={[4, 9, 7]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>Home Programme</strong> successfully updated!
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>

      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          {/* TODO add client name */}
          <T.P color="gray8">
            {firstName} {lastName} {postcode} will be notified that their
            programme has been updated.
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
