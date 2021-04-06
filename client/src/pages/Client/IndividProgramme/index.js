import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { dateFormatter } from '../../../helpers';
import { Expandable } from '../../../components/Cards';
import Button from '../../../components/Button';
import { Contents } from '../../../api-calls';
import { useEffect } from 'react';

const IndividProgramme = () => {
  console.log('hey');

  return (
    <>
      <Row mb="4">
        <Col w={[4, 6, 8]}>
          <T.P small color="gray8">
            DATE here
          </T.P>
        </Col>
      </Row>
      <Title lightSection="My" boldSection="Home Programme" />
      <Row>
        <Col w={[4, 6, 8]}>
          <T.P color="gray8">
            Here you will find the weekly resources that your therapist has
            prepared especially for you. You can access these resources in
            between sessions to enhance your therapeutic outcomes.
          </T.P>
        </Col>
      </Row>
    </>
  );
};

export default IndividProgramme;
