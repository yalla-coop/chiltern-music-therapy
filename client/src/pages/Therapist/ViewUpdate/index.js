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

const UpdateContent = ({ update }) => {
  if (update.type === 'document') {
    return <DocumentUpdate update={update} />;
  } else if (update.type === 'video' || update.type === 'audio') {
    return <VideoUpdate update={update} />;
  }
  return <Spin />;
};

const ViewUpdate = () => {
  const [data, setData] = useState({});
  const [therapistMessage, setTherapistMessage] = useState('');
  const [resError, setResError] = useState(null);

  useEffect(() => {
    // get the data from the back

    setData(dummyData);
  }, []);

  const { client = {}, update = {} } = data;

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
        <UpdateContent update={update} />
      </Row>
      {update.therapistMessage ? (
        <Row mt="3">
          <Col w={[4, 4, 4]}>
            <T.H4 weight="bold" color="gray10">
              You sent them a response{' '}
              {update.therapistMessageDate
                ? ` on ${dateFormatter(update.therapistMessageDate)}`
                : 'before'}
            </T.H4>
            <T.P>{`"${update.therapistMessage}"`}</T.P>
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

var dummyData = {
  client: {
    firstInitial: 'J',
    lastInitial: 'P',
    postcode: 'SW',
  },
  // update: {
  //   type: 'document',
  //   clientMessage:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  //   link: 'http://www.africau.edu/images/default/sample.pdf',
  //   therapistMessage: null,
  // },
  update: {
    type: 'video',
    clientMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
    link: 'http://techslides.com/demos/sample-videos/small.mp4',
    therapistMessage: null,
    therapistMessageDate: '2021-04-08T10:40:52.467Z',
  },
};

export default ViewUpdate;
