import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../context/auth';

import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { dateFormatter } from '../../../helpers';
import { Expandable } from '../../../components/Cards';
import Button from '../../../components/Button';

import { Contents, Programmes } from '../../../api-calls';

const IndividProgramme = () => {
  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState({});
  const [feedback, setFeedback] = useState({});

  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const getContent = async () => {
      const { data, error } = await Contents.getContentByProg({ id });

      if (!error) {
        setContents(data);
      }
    };

    const getProgData = async () => {
      const { data, error } = await Programmes.getProgrammeById({ id });
      console.log('data', data);

      if (!error) {
        setUpdate(data.update);
        setFeedback(data.feedback);
      }
    };

    if (id && user?.id) {
      getContent();
      getProgData();
    }
  }, [id, user.id]);

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
