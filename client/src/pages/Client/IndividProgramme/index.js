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
import ExpandableProvider from '../../../context/expandable';

const IndividProgramme = () => {
  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState({});
  const [feedback, setFeedback] = useState({});
  const [therapist, setTherapist] = useState({});
  const [description, setDescription] = useState('');
  const [ellipsis, setEllipsis] = useState(true);
  const [date, setDate] = useState({});

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
        setDescription(data.description);
        setDate(data.createdAt);
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
            {dateFormatter(date)}
          </T.P>
        </Col>
      </Row>
      <Title lightSection="My" boldSection="Home Programme" />
      <Row mb="7" mbT="5">
        <Col w={[4, 6, 6]}>
          <T.P
            color="gray8"
            style={{ width: '100%' }}
            ellipsis={ellipsis ? { rows: 2 } : false}
          >
            {description}
          </T.P>
          {ellipsis && (
            <T.Link onClick={() => setEllipsis(false)} mt="4" underline>
              Read more
            </T.Link>
          )}
        </Col>
      </Row>
      <Row mb="8">
        {contentToView ? (
          <ExpandableProvider itemsNumbers={contents.length}>
            {contents.map(({ type, file, ...content }, index) => (
              <Col w={[4, 6, 4]} mb="4">
                <Expandable
                  borderColor={decideBorder(type)}
                  content={{
                    download: file.url,
                    streamable: decideStreamable(type, file.url),
                    ...content,
                    categories: null,
                    type: type?.toLowerCase(),
                    url: file.url,
                  }}
                  index={index + 1}
                />
              </Col>
            ))}
          </ExpandableProvider>
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
