import { useParams } from 'react-router-dom';

import Title from '../../../components/Title';
import Button from '../../../components/Button';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import * as S from './style';

import { content, navRoutes } from '../../../constants';

import { useAuth } from '../../../context/auth';

const Welcome = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const numId = Number(id);

  const decideContent = () => content.welcomeScreens[user.role][numId - 1];

  const decideNextPage = () => {
    const numberOfScreens = content.welcomeScreens[user.role].length;

    if (numId < numberOfScreens) {
      if (user.role === 'CLIENT') {
        return navRoutes.CLIENT.WELCOME.replace(':id', numId + 1);
      }
      return navRoutes.THERAPIST.WELCOME.replace(':id', numId + 1);
    }

    if (user.role === 'CLIENT') {
      return navRoutes.CLIENT.DASHBOARD;
    }

    return navRoutes.THERAPIST.PROFILE;
  };

  return (
    <S.Wrapper>
      <Title {...decideContent().title} mbM="3" />
      <Row mb="6" mbM="4">
        <Col w={[4, 8, 8]}>
          <T.P color="gray8">{decideContent().text}</T.P>
        </Col>
      </Row>

      <S.ButtonWrapper>
        <Col w={[4, 6, 6]}>
          <Button to={decideNextPage()} text={decideContent().btn} />
        </Col>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default Welcome;
