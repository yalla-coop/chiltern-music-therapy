import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';
import { Link } from '../../../components/Cards';
import moment from 'moment';

import { Programmes, TherapistClients } from '../../../api-calls';
import { THERAPIST } from '../../../constants/nav-routes';
import { userStatuses } from '../../../constants';
import ClientHistory from './ClientHistory';
import Title from '../../../components/Title';

const SingleClient = ({ clientHistory }) => {
  const [state, setState] = useState({
    firstInitial: '',
    lastInitial: '',
    postcode: '',
    therapyBackground: '',
    therapyGoals: [],
    status: userStatuses.ACTIVE,
  });
  const [programmes, setProgrammes] = useState([]);

  const [elementsOnView, setElementsOnView] = useState(3);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getClientById = async () => {
      const { error, data } = await TherapistClients.getClientById({ id });
      if (!error) {
        setState(data);
      }
    };
    const getProgrammes = async () => {
      const { error, data } = await Programmes.getProgrammes({
        clientUserId: id,
      });
      if (!error) {
        setProgrammes(data);
      }
    };

    getClientById();
    getProgrammes();
  }, [id]);

  if (clientHistory) {
    return (
      <ClientHistory
        firstInitial={state.firstInitial}
        lastInitial={state.lastInitial}
        postcode={state.postcode}
        therapyBackground={state.therapyBackground}
        therapyGoals={state.therapyGoals}
        id={id}
      />
    );
  }

  let ellipse = false;
  let therapyBackground = state.therapyBackground;
  if (state.therapyBackground && state.therapyBackground.length >= 180) {
    therapyBackground = therapyBackground.slice(0, 180);
    therapyBackground = `${therapyBackground}...`;
    ellipse = true;
  }

  return (
    <S.Wrapper>
      {state.status === userStatuses.DELETED ? (
        <Title boldSection={''} lightSection={'Discharged Client'} />
      ) : (
        <Title
          boldSection={state.firstInitial}
          lightSection={`${state.lastInitial} ${state.postcode}`}
          boldFirst
        />
      )}

      <Row mb="6">
        <Col w={[4, 12, 6]}>
          <T.P color="gray8" mt="2">
            {therapyBackground}
          </T.P>
          {ellipse && (
            <T.Link
              color="black"
              weight={700}
              mt={4}
              underline
              to={THERAPIST.CLIENT_HISTORY.replace(':id', id)}
            >
              Read more
            </T.Link>
          )}
        </Col>
      </Row>
      <Row mb="8">
        <Col w={[4, 12, 5]}>
          <Link
            title="client history"
            variant="graphic1"
            to={THERAPIST.CLIENT_HISTORY.replace(':id', id)}
          />
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
          <Button
            text="Add new programme"
            onClick={() =>
              history.push({
                pathname: THERAPIST.CREATE_PROGRAMME_DESCRIPTION.replace(
                  ':id',
                  id
                ),
                state: {
                  clientDetails: {
                    firstInitial: state.firstInitial,
                    lastInitial: state.lastInitial,
                    postcode: state.postcode,
                  },
                },
              })
            }
            disabled={state.status === userStatuses.DELETED}
          />
        </Col>
      </Row>
      <Row>
        {programmes?.length > 0 &&
          programmes.slice(0, elementsOnView).map(({ id, createdAt }) => (
            <Col w={[4, 6, 4]} mb="5">
              <Link
                programme={{ date: moment(createdAt), id }}
                variant="programme"
                to={THERAPIST.SINGLE_PROGRAMME.replace(':id', id)}
              />
            </Col>
          ))}
      </Row>

      {elementsOnView < programmes.length && (
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
      <Row mb="8" mt="7">
        <Col w={[4, 12, 5]}>
          <Link title="feedback" variant="graphic3" to={THERAPIST.FEEDBACK} />
        </Col>
      </Row>
      <Row mb="8" mt="7">
        <Col w={[4, 12, 5]}>
          <Button
            to={THERAPIST.CONTACT_CLIENT.replace(':id', id)}
            text="Contact client"
            variant="secondary"
            disabled={state.status === userStatuses.DELETED}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default SingleClient;
