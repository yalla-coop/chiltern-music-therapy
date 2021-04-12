import { useState, useEffect } from 'react';

import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Content,
} from '../../../components';

import * as S from './style';

import { Contents, Users } from '../../../api-calls';
import { useAuth } from '../../../context/auth';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ navFunctions, states }) => {
  const [libraryContents, setLibraryContents] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const { user } = useAuth();
  // const { ADD_CONTENT } = actions;
  // const { content, libraryContent } = state;
  const {
    programmeContents,
    categoryOptions,
    errors,
    setProgrammeContents,
    setErrors,
  } = states;

  // GET LIBRARY CONTENT
  useEffect(() => {
    const getContent = async () => {
      setLibraryContents({ data: [], error: null, loading: true });
      const { data, error } = await Contents.getLibraryContent();

      const allLibraryC = data.map((el) => ({
        ...el,
        categories: [...new Set(el.categories.map((cat) => cat))],
      }));

      if (!error) {
        setLibraryContents({ data: allLibraryC, error: null, loading: false });
      } else {
        setLibraryContents({
          data: [],
          error: (error && error.message) || 'error loading library content',
          loading: false,
        });
      }
    };

    if (user.id) {
      getContent();
    }
  }, [user.id]);

  const handleAddContent = (moreContent) =>
    setProgrammeContents([...programmeContents, moreContent]);

  console.log(`libraryContents`, libraryContents);
  console.log(`programmeContents`, programmeContents);
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
          libraryContent={libraryContents}
          setLibraryContent={handleAddContent}
          navFunctions={navFunctions}
          mode="edit"
        />
      </Row>

      {/* {content && content.length > 0 && (
        <Row mt={7}>
          <Col w={[4, 9, 4]}>
            <Button
              variant="secondary"
              text="Review and finish"
              handleClick={navFunctions.goToReview}
            />
          </Col>
        </Row>
      )} */}
    </S.Wrapper>
  );
};

export default AddContent;
