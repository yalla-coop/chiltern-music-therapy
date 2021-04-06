import { useEffect, useState } from 'react';
import { Row, Col } from '../../../components/Grid';
import { Programmes } from '../../../api-calls';
import { Basic, Link } from '../../../components/Cards';
import Title from '../../../components/Title';
import { navRoutes } from '../../../constants';

import * as T from '../../../components/Typography';

const introText = `Here you will find the weekly resources that your therapist has prepared especially for you. You can access these resources in between sessions to enhance your therapeutic outcomes.`;

const AllProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    // put in api call to get the programme data
    const getProgrammes = async () => {
      const { data, error } = await Programmes.getProgrammesByClient();
      if (!error) {
        console.log('DARTA!', data);
        setProgrammes(data);
      }
    };

    getProgrammes();
  }, []);

  const programmesToView = programmes.length > 0;

  return (
    <>
      <Title boldSection="Programmes" lightSection="My" />
      <Row mb="6">
        <Col w={[4, 12, 6]}>
          <T.P color="gray8">{introText}</T.P>
        </Col>
      </Row>
      <Row>
        {programmesToView ? (
          programmes.map(({ id, createdAt }) => (
            <Col w={[4, 12, 4]}>
              <Link
                variant="programme"
                to={navRoutes.CLIENT.SINGLE_PROGRAMME.replace(':id', id)}
                programme={{ date: createdAt }}
              />
            </Col>
          ))
        ) : (
          <Col w={[4, 4, 4]}>
            <Basic variant="noProgrammes" />
          </Col>
        )}
      </Row>
    </>
  );
};

export default AllProgrammes;
