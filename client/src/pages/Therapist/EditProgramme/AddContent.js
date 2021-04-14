import { useState, useEffect } from 'react';

import {
  GoBack,
  Typography as T,
  Grid,
  Content,
  Button,
} from '../../../components';

import * as S from './style';

import { Contents } from '../../../api-calls';
import { useAuth } from '../../../context/auth';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ navFunctions, parentState, actions }) => {
  const [libraryContents, setLibraryContents] = useState([]);

  const { user } = useAuth();
  // const { ADD_CONTENT } = actions;
  // const { content, libraryContent } = state;
  const { programmeContents, errors } = parentState;

  const { setErrors, handleAddContent } = actions;

  // GET LIBRARY CONTENT
  useEffect(() => {
    const getContent = async () => {
      const { data, error } = await Contents.getLibraryContent();

      if (!error) {
        const allLibraryC = data.map((el) => ({
          ...el,
          categories: [...new Set(el.categories.map((cat) => cat))],
        }));
        setLibraryContents(allLibraryC);
      } else {
        setErrors({
          ...errors,
          getLibraryContent:
            (error && error.message) || 'Error loading library content',
        });
      }
    };

    if (user.id) {
      getContent();
    }
  }, [user.id]);

  return (
    <S.Wrapper>
      <GoBack customFn={navFunctions.goToReview} />
      <Row mt={6}>
        <Col w={[4, 12, 9]}>
          <T.H1 color="gray10">
            <strong>Edit</strong> Programme
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
          content={programmeContents}
          libraryContent={{
            data: libraryContents,
            error: errors && errors.getLibraryContent,
          }}
          setLibraryContent={handleAddContent}
          navFunctions={navFunctions}
          mode="edit"
        />
      </Row>
      {programmeContents.length > 0 && (
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
