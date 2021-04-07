import { useEffect, useState } from 'react';
import { Row, Col } from '../../../components/Grid';
import { TherapistClients } from '../../../api-calls';
import { Link } from '../../../components/Cards';
import Title from '../../../components/Title';
import { CLIENT } from '../../../constants/nav-routes';

import * as T from '../../../components/Typography';

const MyTherapyPlan = () => {
  const [therapy, setTherapy] = useState([]);

  useEffect(() => {
    const getMyTherapy = async () => {
      const { data, error } = await TherapistClients.getMyTherapy();
      if (!error) {
        setTherapy(data);
      }
    };

    getMyTherapy();
  }, []);

  return (
    <>
      <Title boldSection="Therapy Plan" lightSection="My" />
      <Row mb="6">
        <Col w={[4, 12, 6]}>
          <T.P color="gray8">{therapy.therapyBackground}</T.P>
          <T.P color="gray8" mt={4}>
            You can contact your therapist if there is any information you’d
            like to know.
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mt={5}>
          <Link
            variant="graphic2"
            title="therapy goals"
            to={CLIENT.THERAPY_GOALS}
          />
        </Col>
      </Row>
    </>
  );
};

export default MyTherapyPlan;
