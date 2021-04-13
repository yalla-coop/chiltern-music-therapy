import { Row, Col } from '../../../components/Grid';
import { Expandable } from '../../../components/Cards';
import { decideBorder } from '../../../helpers';

import AddVideo from './SendVideo';
import SendMessage from './SendMessage';
import SendAudio from './SendAudio';
import { useParams } from 'react-router';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';

const types = ['video', 'document', 'audio'];

const Update = () => {
  const { id } = useParams();
  const formContent = [
    <AddVideo programmeId={id} />,
    <SendMessage programmeId={id} />,
    <SendAudio programmeId={id} />,
  ];

  return (
    <>
      <Title lightSection="Send" boldSection="Update" />
      <Row>
        <Col w={[4, 12, 12]}>
          <T.P color="gray9" mb="5">
            What type of content do you want to share?
          </T.P>
        </Col>
      </Row>
      <Row mb="8">
        {types.map((type, index) => (
          <Col w={[4, 6, 4]} mb="4" key={type}>
            <Expandable
              borderColor={decideBorder(type.toUpperCase())}
              send
              content={{ type }}
            >
              {formContent[index]}
            </Expandable>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Update;
