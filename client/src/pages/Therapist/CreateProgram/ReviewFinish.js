import moment from 'moment';
import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Cards,
} from '../../../components';

import * as S from './style';
import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Expandable } = Cards;

const ReviewFinish = ({ state, actions, decidePath }) => {
  const { description, content } = state;

  const goBack = () => decidePath(flowTypes.addContent);

  const renderReviewCards = (_content) => {
    if (_content.length > 0) {
      return _content.map((el) => {
        const content = {
          title: el.title,
          fileType: el.type,
          streamable: true,
          download: el.link || el.uploadedFileInfo.name,
          instructions: el.instructions,
          categories: el.categories,
          savedToLibrary: el.libraryContent,
          date: el.date || moment(),
        };

        return (
          <Col mb={5} w={[4, 9, 4]}>
            <Expandable
              content={content}
              editing
              withDate
              // remove={removeFunc}
              // saveChanges={saveChanges}
              // handleInput={handleInput}
              // onCancel={onCancel}
            />
          </Col>
        );
      });
    } else {
      return (
        <Col w={[4, 6, 6]}>
          <T.P bold color="gray8">
            No content added
          </T.P>
        </Col>
      );
    }
  };

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
      <Row mt={7}>{renderReviewCards(content)}</Row>
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
