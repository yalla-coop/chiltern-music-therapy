import { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';

import { TherapistClients } from '../../../api-calls';
import { CLIENT } from '../../../constants/nav-routes';

const MyTherapist = ({ status, title, msg }) => {
  const [state, setState] = useState({
    therapistBio: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    contactEmail: '',
    bio: '',
    profileImage: '',
  });

  useEffect(() => {
    const getMyTherapist = async () => {
      const { error, data } = await TherapistClients.getMyTherapist();
      if (!error) {
        setState(data);
      }
    };

    getMyTherapist();
  }, []);

  return (
    <S.Wrapper>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H1 color="black" mb={7} mbM={5}>
            My <span style={{ fontWeight: '900' }}>Therapist</span>
          </T.H1>
        </Col>
      </Row>

      <Row
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
        }}
        mb="7"
      >
        <Col w={[4, 12, 6]} mb="5">
          <Avatar image={state.profileImage} status="ready" />
        </Col>
        <Col w={[4, 12, 6]}>
          <T.H3 bold>Biography</T.H3>
          <T.P color="gray8" mt="2">
            {state.bio}
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 4]}>
          <Button
            text={`Contact ${state.firstName}`}
            to={CLIENT.CONTACT_THERAPIST}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default MyTherapist;
