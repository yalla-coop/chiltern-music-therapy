import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { TherapyGoals } from '../../../components/Cards';
import { TherapistClients } from '../../../api-calls';
import { Row, Col } from '../../../components/Grid';
import * as S from './style';
import * as T from '../../../components/Typography';

const EditClient = () => {
  const [therapyBackground, setBackground] = useState('');
  const [therapyGoals, setGoals] = useState([
    { goal: '', category: '', id: 0 },
  ]);
  const [errors, setErrors] = useState({});
  const [firstInitial, setFirstInitial] = useState('');
  const [restOfTitle, setRestOfTitle] = useState('');

  const { id } = useParams();

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
      <Row>
        <Col w={[4, 12, 4]}>
          <Textarea
            value={therapyBackground}
            label="Therapy background"
            rows="6"
            handleChange={setBackground}
          />
        </Col>
        <Col w={[4, 12, 4]} style={{ paddingLeft: '40px' }}>
          <TherapyGoals
            goals={therapyGoals}
            handleChange={setGoals}
            label="Therapy goals"
            error={errors.goals}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <Button text="Save changes" />
        </Col>
      </Row>
    </>
  );
};

export default EditClient;
