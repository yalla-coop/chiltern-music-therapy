import { useEffect, useState } from 'react';
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
  const [groupedGoals, setGroupedGoals] = useState([]);

  const tidyGoals = () => {
    const categories = therapyGoals.reduce((acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category].push(curr.goal);
        return acc;
      } else {
        return { ...acc, [curr.category]: [curr.goal] };
      }
    }, []);

    const groupedArr = Object.entries(categories);

    setGroupedGoals(groupedArr);
  };

  useEffect(() => {
    if (therapyGoals) {
      tidyGoals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [therapyGoals]);

  const goalsToView = groupedGoals.length > 0;

  return (
    <S.Wrapper>
      <Title
        boldSection={firstInitial}
        lightSection={`${lastInitial} ${postcode}`}
        boldFirst
      />

      <Row mb="7">
        <Col w={[4, 12, 12]}>
          <S.TitleWIthBorder color="gray7" mt={3}>
            CLIENT HISTORY
          </S.TitleWIthBorder>
        </Col>
      </Row>
      <Row mb="7">
        <Col w={[4, 12, 6]}>
          <T.H3 color="black" mb={2} weight="bold" style={{ width: '100%' }}>
            Therapy background
          </T.H3>
          <T.P color="gray8">{therapyBackground}</T.P>
        </Col>
      </Row>

      <Row mb="5">
        <Col w={[4, 12, 12]}>
          <T.H3 color="black" mb={2} weight="bold" mb="4">
            Therapy goals
          </T.H3>
        </Col>
        {goalsToView ? (
          groupedGoals.map((group, i) => (
            <Col w={[4, 12, 5]} display="block" mb="4">
              <T.P color="black" mb={2} bold>
                {group[0]}
              </T.P>
              {group[1].map((goal, i) => (
                <T.P color="gray8" mb={2}>
                  <pre>
                    - Goal {i + 1}: {goal}
                  </pre>
                </T.P>
              ))}
            </Col>
          ))
        ) : (
          <Col w={[4, 12, 6]} display="block">
            <T.P color="gray8">No goals found</T.P>
          </Col>
        )}
      </Row>

      <Row mb="5" mt="7">
        <Col w={[4, 12, 4]}>
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
