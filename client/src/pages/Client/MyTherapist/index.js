import { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import { navRoutes } from '../../../constants';
import { useAuth } from '../../../context/auth';

import { Users } from '../../../api-calls';
import { CLIENT } from '../../../constants/nav-routes';

const MyTherapist = ({ status, title, msg }) => {
  const [state, setState] = useState();
  const history = useHistory();

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
          <Avatar
            image="https://images.indianexpress.com/2020/03/amp-4.jpg"
            status="ready"
          />
        </Col>
        <Col w={[4, 12, 6]}>
          <T.H3 bold>Biography</T.H3>
          <T.P color="gray8" mt="2">
            My name is Elizabeth and I have been J P’s Music Therapist since
            2019. I am a registered Neurologic Music Therapy Fellow and Music
            Therapist, and also a qualified MATADOC assessor. I specialise in
            supporting children, young people and adults with a brain injury and
            have worked as a clinician for the last 8 years, gaining experience
            across a variety of settings including in-patient
            neurorehabilitation units, residential neuro services, and with
            case-managed individuals living at home in the community. I am also
            the Neuro Services Lead at Chiltern Music Therapy, overseeing our
            team of NMT experts and the services in which we work. To read more
            about my neuro experience, see ‘E Nightingale CV FULL’.
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 4]}>
          <Button
            text="Contact Elizabeth"
            type="submit"
            to={CLIENT.CONTACT_THERAPIST}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default MyTherapist;
