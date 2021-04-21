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

  const tidyGoals = (goals) => {
    const categories = goals.reduce((acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category].push(curr.goal);
        return acc;
      } else {
        return { ...acc, [curr.category]: [curr.goal] };
      }
    }, []);

    const groupedArr = Object.entries(categories);

    setTherapyGoals(groupedArr);
  };

  useEffect(() => {
    const getMyTherapy = async () => {
      const { data, error } = await TherapistClients.getMyTherapy();
      if (!error) {
        tidyGoals(data.therapyGoals);
      }
    };

    getMyTherapy();
  }, []);

  return (
    <>
      <Title boldSection="Therapy Goals" lightSection="My" />
      <Row mb="6" jc="space-between">
        <Col w={[4, 12, 8]}>
          <Row inner mb="7" mbT="5">
            <Col w={[4, 12, 10]} mb="7" mbT="5">
              <T.P color="gray8">
                Each week, resources will be provided in the ‘Home Programme’
                page that support these goals. Current therapy goals are listed
                by domain area below:
              </T.P>
            </Col>
            {therapyGoals?.map((group, i) => (
              <Col w={[4, 12, 5]} display="block" mb="4" key={i}>
                <T.P weight="bold">{group[0]}</T.P>
                {group[1].map((goal, i) => (
                  <T.P color="gray8" mb={2} mr={3}>
                    <pre>
                      - Goal {i + 1}: {goal}
                    </pre>
                  </T.P>
                ))}
              </Col>
            ))}
          </Row>
        </Col>
        <Col w={[4, 8, 4]} mt={5} jc="flex-end" jcT="flex-start">
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
    </>
  );
};

export default MyTherapyGoals;
