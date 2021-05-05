import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Content,
} from '../../../components';

import * as S from './style';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ content, addContent, navFunctions }) => {
  return (
    <S.Wrapper>
      <GoBack customFn={navFunctions.goToDescription} />
      <Row mt={6}>
        <Col w={[4, 12, 9]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
        <Col w={[4, 9, 7]} mt={5}>
          <T.P color="gray8">
            Great! Now it’s time to share content. Add as many videos, audio
            files, links and written content as you like!
          </T.P>
        </Col>
      </Row>
      <Row mt={5}>
        <AddContentSection
          content={content}
          addContent={addContent}
          navFunctions={navFunctions}
        />
      </Row>
      {content && content.length > 0 && (
        <Row mt={7}>
          <Col w={[4, 9, 4]}>
            <Button
              variant="secondary"
              text="Review and finish"
              handleClick={navFunctions.goToReview}
            />
          </Col>
        </Row>
      )}
    </S.Wrapper>
  );
};

export default AddContent;
