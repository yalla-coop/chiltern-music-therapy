import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';
import { Link } from '../../../components/Cards';
import moment from 'moment';

import { Programmes, TherapistClients } from '../../../api-calls';
import { THERAPIST } from '../../../constants/nav-routes';

const SingleClient = () => {
  const [state, setState] = useState({
    firstInitial: '',
    lastInitial: '',
    postcode: '',
    therapyBackground: '',
  });
  const [programmes, setProgrammes] = useState([]);

  const [ellipsis, setEllipsis] = useState(true);
  const [elementsOnView, setElementsOnView] = useState(3);

  const { id } = useParams();

  useEffect(() => {
    const getClientById = async () => {
      const { error, data } = await TherapistClients.getClientById({ id });
      if (!error) {
        setState(data);
      }
    };
    const getProgrammes = async () => {
      const { error, data } = await Programmes.getProgrammes({ id });
      if (!error) {
        setState(data);
      }
    };

    getClientById();
  }, [id]);
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <S.Wrapper>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H1 color="black" mb={7} mbM={5}>
            <span style={{ fontWeight: '900' }}>{state?.firstInitial}</span>{' '}
            {state?.lastInitial}
            {state?.postcode}
          </T.H1>
        </Col>
      </Row>

      <Row mb="6">
        <Col w={[4, 12, 6]}>
          <T.P
            color="gray8"
            mt="2"
            ellipsis={
              ellipsis ? { rows: 3, expandable: true, symbol: ' ' } : false
            }
          >
            {state.therapyBackground}
          </T.P>
          {ellipsis && (
            <T.Link
              onClick={() => setEllipsis(false)}
              color="black"
              weight={700}
              mt={4}
            >
              Read more
            </T.Link>
          )}{' '}
        </Col>
      </Row>
      <Row mb="8">
        <Col w={[4, 12, 5]}>
          <Link title="client history" variant="graphic1" />
        </Col>
      </Row>

      <Row mb="5">
        <Col w={[4, 12, 6]}>
          <T.H3 color="black" mb={2} bold>
            Home Programmes
          </T.H3>
          <T.P color="gray8">
            The digital resources we share with clients on a weekly, fortnightly
            or monthly basis are called home programmes. This should be renewed
            every week and will be listed below. You can access client
            engagement for each week to assess the effectiveness of resources.
          </T.P>
        </Col>
      </Row>

      <Row mb="8">
        <Col w={[4, 12, 4]}>
          <Button text="Add new programme" to={THERAPIST.CREATE_PROGRAM} />
        </Col>
      </Row>
      <Row>
        {data?.length > 0 &&
          data.slice(0, elementsOnView).map((id) => (
            <Col w={[4, 6, 4]} mb="5">
              <Link
                programme={{ date: moment(), id: 1 }}
                variant="programme"
                to={THERAPIST.SINGLE_PROGRAMME}
              />
            </Col>
          ))}
      </Row>

      {elementsOnView < data.length && (
        <Row>
          <Col w={[4, 12, 12]} jc="center">
            <T.Link
              weight="bold"
              to={false}
              mt={2}
              onClick={() => setElementsOnView((_old) => _old + 3)}
              underline
            >
              View more
            </T.Link>
          </Col>
        </Row>
      )}
    </S.Wrapper>
  );
};

export default SingleClient;
