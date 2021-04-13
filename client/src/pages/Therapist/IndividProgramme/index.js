import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useAuth } from '../../../context/auth';

import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import { dateFormatter } from '../../../helpers';
import { Basic, Expandable } from '../../../components/Cards';
import Button from '../../../components/Button';
import * as S from './style';

import { Contents, Programmes } from '../../../api-calls';

import UpdateSection from './UpdateSection';
import { THERAPIST } from '../../../constants/nav-routes';

const IndividProgramme = () => {
  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState({});
  const [description, setDescription] = useState('');
  const [ellipsis, setEllipsis] = useState(true);

  const { user } = useAuth();
  const { id } = useParams();
  const history = useHistory();

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
        if (data.description) {
          setDescription(data.description);
        }
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
      <Title boldSection="Home Programme" />
      <Row mb="7" mbT="5">
        <S.HorizontalCol w={[4, 6, 8]}>
          <S.GreenLine />
          <T.P small color="gray8" caps>
            {dateFormatter(contents.createdAt)}
          </T.P>
        </S.HorizontalCol>
      </Row>
      <Row mb="7" mbT="5">
        <Col w={[4, 6, 6]}>
          <T.P
            color="gray8"
            ellipsis={ellipsis ? { rows: 2 } : false}
            style={{ width: '100%' }}
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
      <UpdateSection id={id} update={update} />
      <Row mb="8" mbT="6">
        {contentToView ? (
          <>
            <Col w={[4, 12, 12]}>
              <T.H2 mb="5" weight="bold">
                Programme content
              </T.H2>
            </Col>
            {contents.map(({ type, file, categories, ...content }, index) => (
              <Col w={[4, 6, 4]} mb="4">
                <Expandable
                  borderColor={decideBorder(type)}
                  content={{
                    download: file.url,
                    streamable: decideStreamable(type, file.url),
                    categories: categories.filter((cat) => cat !== null),
                    ...content,
                    type: type?.toLowerCase(),
                    url: file.url,
                  }}
                />
              </Col>
            ))}
          </>
        ) : (
          <Col w={[4, 6, 4]}>
            <Basic>No content to show</Basic>
          </Col>
        )}
      </Row>
      <Row>
        <Col w={[4, 4, 4]}>
          <Button
            text="Edit programme"
            to={THERAPIST.EDIT_PROGRAMME.replace(':id', id)}
            variant="secondary"
          />
        </Col>
      </Row>
    </>
  );
};

export default IndividProgramme;
