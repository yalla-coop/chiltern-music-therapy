import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../context/auth';

import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { dateFormatter } from '../../../helpers';
import { Basic, Expandable } from '../../../components/Cards';

import { Contents, Programmes } from '../../../api-calls';

import UpdateSection from './UpdateSection';
import FeedbackSection from './FeedbackSection';

const IndividProgramme = () => {
  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState({});
  const [feedback, setFeedback] = useState({});
  const [therapist, setTherapist] = useState({});
  const [description, setDescription] = useState('');

  const { user } = useAuth();
  const { id } = useParams();

  const decideBorder = (type) => {
    switch (type) {
      case 'VIDEO':
        return 'rainbowHorizontal';
      case 'DOCUMENT':
        return 'darkBlueH';
      case 'AUDIO':
        return 'PinkUnderH';
      default:
        return 'darkBlueH';
    }
  };

  const decideStreamable = (type, path) => {
    if (['VIDEO', 'AUDIO'].includes(type) && path) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const getContent = async () => {
      const { data, error } = await Contents.getContentByProg({ id });

      if (!error) {
        setContents(data);
      }
    };

    const getProgData = async () => {
      const { data, error } = await Programmes.getProgrammeById({ id });

      if (!error) {
        setUpdate(data.update);
        setFeedback(data.feedback);
        setTherapist(data.therapist);
      }
    };

    if (id && user?.id) {
      getContent();
      getProgData();
    }
  }, [id, user.id]);

  const contentToView = contents.length > 0;

  return (
    <>
      <Row mb="4">
        <Col w={[4, 6, 8]}>
          <T.P small color="gray8" caps>
            {dateFormatter(update.createdAt)}
          </T.P>
        </Col>
      </Row>
      <Title lightSection="My" boldSection="Home Programme" />
      <Row mb="5">
        <Col w={[4, 6, 8]}>
          <T.P color="gray8">
            Here you will find the weekly resources that your therapist has
            prepared especially for you. You can access these resources in
            between sessions to enhance your therapeutic outcomes.
          </T.P>
        </Col>
      </Row>
      <Row mb="8">
        {contentToView ? (
          contents.map(({ type, path, ...content }, index) => (
            <Col w={[4, 6, 4]} mb="4">
              <Expandable
                borderColor={decideBorder(type)}
                content={{
                  download: path,
                  streamable: decideStreamable(type, path),
                  ...content,
                  type: type?.toLowerCase(),
                  path,
                }}
              />
            </Col>
          ))
        ) : (
          <Col w={[4, 6, 4]}>
            <Basic>No content to show</Basic>
          </Col>
        )}
      </Row>
      <Row>
        <UpdateSection id={id} update={update} therapist={therapist} />
        <FeedbackSection id={id} feedback={feedback} />
      </Row>
    </>
  );
};

export default IndividProgramme;
