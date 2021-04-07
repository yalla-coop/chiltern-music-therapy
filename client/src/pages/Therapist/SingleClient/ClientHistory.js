import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';

import Title from '../../../components/Title';
import { THERAPIST } from '../../../constants/nav-routes';

const ClientHistory = ({
  firstInitial,
  lastInitial,
  postcode,
  therapyBackground,
  therapyGoals,
  id,
}) => {
  return (
    <S.Wrapper>
      <Title
        boldSection={firstInitial}
        lightSection={`${lastInitial} ${postcode}`}
        boldFirst
      />

      <Row mb="7">
        <Col w={[4, 12, 12]}>
          <S.TitleWIthBorder color="gray7" mb={6} mt={3}>
            CLIENT HISTORY
          </S.TitleWIthBorder>
        </Col>
        <Col w={[4, 12, 6]}>
          <T.H3 color="black" mb={2} bold>
            Therapy background
          </T.H3>
          <T.P color="gray8">{therapyBackground}</T.P>
        </Col>
      </Row>

      <Row mb="5">
        <Col w={[4, 12, 12]}>
          <T.H3 color="black" mb={2} bold>
            Therapy goals
          </T.H3>
        </Col>
        {therapyGoals.map(({ goal, category }) => (
          <Col w={[4, 12, 6]} display="block">
            <T.P color="black" mb={2} bold>
              {category}
            </T.P>
            <T.P color="gray8" mb={2}>
              <pre>{goal}</pre>
            </T.P>
          </Col>
        ))}
      </Row>

      <Row mb="5" mt="7">
        <Col w={[4, 12, 5]}>
          <Button
            to={THERAPIST.EDIT_CLIENT.replace(':id', id)}
            text="Edit notes"
            variant="primary"
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ClientHistory;
