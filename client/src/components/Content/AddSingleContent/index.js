import { useParams, useLocation, useHistory } from 'react-router-dom';

import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Example,
} from '../../../components';

import { content, navRoutes } from '../../../constants';

// import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { Textarea } = Inputs;

const AddSingleContent = () => {
  const param = useParams();
  const location = useLocation();
  const history = useHistory();

  // console.log(location.pathname.split('/content/'));
  console.log('p', param);
  return (
    <>
      <GoBack />
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">{/* <strong>Add</strong> {category} */}</T.H1>
        </Col>
      </Row>

      <Row mt={7}>
        <Col w={[4, 4, 4]}>
          <Button variant="primary" text="Add more content" handleClick="" />
        </Col>
        <Col w={[4, 4, 4]}>
          <Button variant="secondary" text="Review and finish" handleClick="" />
        </Col>
      </Row>
    </>
  );
};

export default AddSingleContent;
