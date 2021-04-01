import { GoBack, Typography as T, Button, Grid } from '../../../components';

import * as S from './style';
import flowTypes from './flowTypes';

const { Row, Col } = Grid;

const ReviewFinish = ({ state, actions }) => {
  const goBack = () => {
    return actions.SET_FLOW(flowTypes.addContent);
  };

  return (
    <>
      <GoBack customFn={goBack} />
      <Col w={[4, 12, 12]}>
        <S.HeadlineWrapper>
          <T.H1 color="gray10">
            <strong>Review</strong> And Finish
          </T.H1>
        </S.HeadlineWrapper>
      </Col>
      <Row>
        <Col w={[4, 4, 4]}>
          <Button
            variant="primary"
            text="Add more content"
            handleClick={goBack}
          />
        </Col>
        <Col w={[4, 4, 4]}>
          <Button
            variant="secondary"
            text="Save Changes"
            // handleClick={handleClick}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReviewFinish;
