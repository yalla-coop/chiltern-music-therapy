import { useEffect, useState } from 'react';
import { Row, Col } from '../../../components/Grid';
import { Programmes } from '../../../api-calls';
import { Basic, Link } from '../../../components/Cards';

import * as S from './style';
import * as T from '../../../components/Typography';

const introText = `Here you will find the weekly resources that your therapist has prepared especially for you. You can access these resources in between sessions to enhance your therapeutic outcomes.`;

const AllProgrammes = () => {
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    // put in api call to get the programme data
  }, []);

  const programmesToView = programmes.length > 0;

  return (
    <>
      <Row mb="5">
        <Col w={[4, 8, 6]} style={{ display: 'flex ' }}>
          <T.H1>
            My <span style={{ fontWeight: 'bold' }}>Programmes</span>
          </T.H1>
        </Col>
      </Row>
      <Row mb="6">
        <Col w={[4, 8, 6]}>
          <T.P color="gray8">{introText}</T.P>
        </Col>
      </Row>
      <Row>
        {programmesToView ? (
          programmes.map((prog) => (
            <Col w={[4, 4, 4]}>
              <Link variant="programme" programme={prog} />
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
