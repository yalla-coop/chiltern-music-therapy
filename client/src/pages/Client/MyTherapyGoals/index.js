import { useEffect, useState } from 'react';
import { Row, Col } from '../../../components/Grid';
import { TherapistClients } from '../../../api-calls';
import { Link } from '../../../components/Cards';
import Title from '../../../components/Title';
import { CLIENT } from '../../../constants/nav-routes';

import * as T from '../../../components/Typography';
import { CardWrapper } from './style';

const MyTherapyGoals = () => {
  const [therapyGoals, setTherapyGoals] = useState([]);

  useEffect(() => {
    const getMyTherapy = async () => {
      const { data, error } = await TherapistClients.getMyTherapy();
      if (!error) {
        setTherapyGoals(data.therapyGoals);
      }
    };

    getMyTherapy();
  }, []);

  return (
    <>
      <Title boldSection="Therapy Goals" lightSection="My" />
      <Row mb="6" jc="space-between">
        <Col w={[4, 12, 6]}>
          <Row inner jc="space-between">
            <Col w={[4, 12, 10]}>
              <T.P color="gray8">
                The goals that feature below relate to the non-musical aims
                detailed in ‘My Therapy Outline’. Each week, resources will be
                provided in the ‘Home Programme’ page that support these goals.
                J’s current therapy goals are listed by domain area below:
              </T.P>
            </Col>
            <Col w={[4, 12, 5.5]} mt={7} mtT={5}>
              {therapyGoals && therapyGoals[0] && (
                <>
                  <T.P weight="bold">{therapyGoals[0].goal}</T.P>
                  <T.P color="gray8">{therapyGoals[0].category}</T.P>
                </>
              )}
              {therapyGoals && therapyGoals[1] && (
                <>
                  <T.P weight="bold" mt={5}>
                    {therapyGoals[1].goal}
                  </T.P>
                  <T.P color="gray8">{therapyGoals[1].category}</T.P>
                </>
              )}
            </Col>
            <Col w={[4, 12, 5.5]} mt={7} mtT={5}>
              {therapyGoals && therapyGoals[2] && (
                <>
                  <T.P weight="bold">{therapyGoals[2].goal}</T.P>
                  <T.P color="gray8">{therapyGoals[2].category}</T.P>
                </>
              )}
              {therapyGoals && therapyGoals[3] && (
                <>
                  <T.P weight="bold" mt={5}>
                    {therapyGoals[3].goal}
                  </T.P>
                  <T.P color="gray8">{therapyGoals[3].category}</T.P>
                </>
              )}
            </Col>
          </Row>
        </Col>
        <Col w={[4, 6, 4]} mt={5} jc="flex-end">
          <CardWrapper>
            <Link
              variant="graphic1"
              title="therapy plan"
              to={CLIENT.THERAPY_PLAN}
            />
            <T.P color="gray8" mt={6}>
              You can contact your therapist if there is any information you’d
              like to know.
            </T.P>
          </CardWrapper>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default MyTherapyGoals;
