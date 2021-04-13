import { useParams } from 'react-router-dom';
import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { therapistMessage as validate } from '../../../validation/schemas';

import DocumentUpdate from './DocumentUpdate';
import VideoUpdate from './VideoUpdate';
import { Spin } from 'antd';
import { dateFormatter } from '../../../helpers';
import { ProgressUpdates } from '../../../api-calls';
import { mediaTypes } from '../../../constants';

const UpdateContent = ({ update }) => {
  if (update.type === mediaTypes.DOCUMENT) {
    return <DocumentUpdate update={update} />;
  } else if (
    update.type === mediaTypes.VIDEO ||
    update.type === mediaTypes.AUDIO
  ) {
    return <VideoUpdate update={update} />;
  }
  return <Spin />;
};

const ViewUpdate = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [therapistMessage, setTherapistMessage] = useState('');
  const [resError, setResError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await ProgressUpdates.getProgressUpdatesById({
        id,
      });

      if (!error) {
        setData(data);
      }
    };

    getData();
  }, [id]);

  const {
    client = {},
    clientMessage,
    file = {},
    type,
    link,
    therapistMessageDate,
    therapistMessage: oldTherapistMessageDate,
  } = data;

  const handleSubmit = () => {
    try {
      validate({ therapistMessage });
      ProgressUpdates.sendUpdate({
        therapistMessage,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        setResError(error.inner.response);
      }
    }
  };

  return (
    <>
      <Row>
        <Col w={[4, 6, 4]} display="block">
          <T.H5 color="gray7" mb="2">
            CLIENT NAME
          </T.H5>
          <T.P color="gray8">
            {client.firstInitial} {client.lastInitial} {client.postcode}
          </T.P>
        </Col>

        <UpdateContent
          update={{
            type,
            clientMessage,
            link,
            url: file.url,
          }}
        />
      </Row>
      {oldTherapistMessageDate ? (
        <Row mt="3">
          <Col w={[4, 4, 4]}>
            <T.H4 weight="bold" color="gray10">
              You sent them a response{' '}
              {therapistMessageDate
                ? ` on ${dateFormatter(therapistMessageDate)}`
                : 'before'}
            </T.H4>
            <T.P>{`"${oldTherapistMessageDate}"`}</T.P>
          </Col>
        </Row>
      ) : (
        <>
          {' '}
          <Row mt="7">
            <Col w={[4, 12, 6]}>
              <T.H3 color="gary10" weight="bold">
                Would you like to send them a response?
              </T.H3>
            </Col>
          </Row>
          <Row mt="3">
            <Col w={[4, 12, 6]}>
              <Textarea
                label="Message"
                placeholder="Message..."
                rows="5"
                value={therapistMessage}
                handleChange={setTherapistMessage}
                error={resError}
              />
            </Col>
          </Row>
          <Row mt="7">
            <Col w={[4, 12, 4]}>
              <Button
                text="Send"
                variant="primary"
                handleClick={handleSubmit}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ViewUpdate;
