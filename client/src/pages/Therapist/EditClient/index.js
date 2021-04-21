import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Title from '../../../components/Title';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { TherapyGoals } from '../../../components/Cards';
import { Row, Col } from '../../../components/Grid';
import Modal from '../../../components/Modal';

import { TherapistClients } from '../../../api-calls';

import * as S from './style';

import validate from '../../../validation/schemas/editClient';

import { navRoutes } from '../../../constants';

const EditClient = () => {
  const [therapyBackground, setBackground] = useState('');
  const [therapyGoals, setGoals] = useState([
    { goal: '', category: '', id: 0 },
  ]);
  const [errors, setErrors] = useState({});
  const [firstInitial, setFirstInitial] = useState('');
  const [restOfTitle, setRestOfTitle] = useState('');
  const [updatingClient, setUpdatingClient] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const handleEdit = () => {
    try {
      validate({ therapyBackground, therapyGoals });
      setErrors({});
      setUpdatingClient(true);
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

  const updateClient = async () => {
    const { error } = await TherapistClients.editClient({
      therapyBackground,
      therapyGoals,
      clientId: id,
    });

    if (error) {
      setErrors({ server: error.message });
      setUpdatingClient(false);
    } else {
      setUpdatingClient(false);
      setIsModalVisible(true);
    }
  };

  const goToClient = () =>
    history.push(navRoutes.THERAPIST.CLIENT_HISTORY.replace(':id', id));

  useEffect(() => {
    if (updatingClient) {
      updateClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatingClient]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await TherapistClients.getClientById({ id });

      if (error) {
        setErrors({ server: error.message });
      } else {
        const {
          firstInitial,
          lastInitial,
          postcode,
          therapyBackground,
          therapyGoals,
        } = data;
        setBackground(therapyBackground);
        const formattedGoals = therapyGoals.map((goal, i) => ({
          ...goal,
          id: i,
        }));
        setGoals(formattedGoals);
        setFirstInitial(firstInitial);
        setRestOfTitle(`${lastInitial} ${postcode}`);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      <Title boldSection={firstInitial} lightSection={restOfTitle} boldFirst />
      <Row mb="8">
        <Col w={[4, 12, 12]}>
          <S.TitleWIthBorder color="gray7" mt={3}>
            CLIENT HISTORY
          </S.TitleWIthBorder>
        </Col>
      </Row>
      <Row mb="5">
        <Col w={[4, 12, 4]} mb="5">
          <Textarea
            value={therapyBackground}
            label="Therapy background"
            rows="8"
            handleChange={setBackground}
          />
        </Col>
        <Col w={[4, 12, 7]} ml="5" mlT="0" mb="5">
          <TherapyGoals
            goals={therapyGoals}
            handleChange={setGoals}
            label="Therapy goals"
            error={errors.goals}
            wrap
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <Button text="Save changes" onClick={handleEdit} />
        </Col>
      </Row>
      <Modal
        type="updateClientSuccess"
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        parentFunc={goToClient}
      />
    </>
  );
};

export default EditClient;
