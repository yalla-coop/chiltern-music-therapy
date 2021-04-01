import { GoBack, Typography as T, Button, Grid } from '../../../components';

import * as S from './style';
import flowTypes from './flowTypes';

const { Col } = Grid;

const AddDescription = ({ state, actions }) => {
  const goNext = () => {
    return actions.SET_FLOW(flowTypes.addContent);
  };

  return (
    <>
      <GoBack />
      <Col w={[4, 12, 12]}>
        <S.HeadlineWrapper>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme (Description)
          </T.H1>
        </S.HeadlineWrapper>
      </Col>
      <Col w={[4, 4, 4]}>
        <Button variant="primary" text="Next" handleClick={goNext} />
      </Col>
    </>
  );
};

export default AddDescription;
