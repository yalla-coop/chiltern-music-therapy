import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
} from '../../../components';

import * as S from './style';
import flowTypes from './flowTypes';
import { content } from 'constants';

const { Row, Col } = Grid;
const { Textarea } = Inputs;

const ReviewFinish = ({ state, actions, decidePath }) => {
  const { description } = state;

  const goBack = () => decidePath(flowTypes.addContent);
  return (
    <>
      <GoBack customFn={goBack} />
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>Review</strong> And Finish
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>
      {description && (
        <Row mt={5}>
          <Col w={[4, 6, 6]}>
            <Textarea
              label="Programme description"
              rows={5}
              value={description}
              disabled
            />
          </Col>
        </Row>
      )}
      {content.length > 0 && (
        <Row mt={5}>
          <Col w={[4, 6, 6]}></Col>
        </Row>
      )}

      <Row mt={7}>
        <Col w={[4, 9, 4]}>
          <Button
            variant="primary"
            text="Add more content"
            handleClick={goBack}
          />
        </Col>
        <Col w={[4, 9, 4]}>
          <Button variant="secondary" text="Save Changes" type="submit" />
        </Col>
      </Row>
    </>
  );
};

export default ReviewFinish;
