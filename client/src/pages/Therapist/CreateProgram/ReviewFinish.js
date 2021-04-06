import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Cards,
} from '../../../components';

import validate from '../../../validation/schemas/program';

import { navRoutes, dropdowns } from '../../../constants';

import * as S from './style';
import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Expandable } = Cards;

const { therapyGoalsCategories } = dropdowns;

const ReviewFinish = ({ state, actions, decidePath }) => {
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const { description, content, validationErrs } = state;
  let { singleContent } = state;

  const { UPDATE_SINGLE_CONTENT, ADD_SINGLE_CONTENT, SET_ERRORS } = actions;

  const goBack = () => decidePath(flowTypes.addContent);

  const validateForm = () => {
    try {
      const formData = {
        content,
        part: 'review',
      };
      validate(formData);
      SET_ERRORS({});

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        SET_ERRORS(error.inner);
      }
      return false;
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempt(true);

    const isValid = validateForm();
    if (isValid) {
      // decidePath(flowTypes.addContent);
      console.log('valid');
    }
  };

  const renderReviewCards = (_content) => {
    if (_content.length > 0) {
      return _content.map((el, idx) => {
        const content = {
          ...el,
          idx,
          id: el.id,
          title: el.title,
          fileType: el.type,
          streamable: true,
          // TODO get url
          download: el.uploadedFileInfo && el.uploadedFileInfo.name,
          instructions: el.instructions,
          categories: el.categories,
          libraryContent: el.libraryContent,
          date: el.date || moment(),
          validationErrs: validationErrs && validationErrs[`content[${idx}]`],
        };

        return (
          <Col mb={5} w={[4, 9, 5]}>
            <Expandable
              content={content}
              editing
              withDate
              remove={'removeFunc'}
              saveChanges={'saveChanges'}
              onCancel={'onCancel'}
              singleContent={singleContent}
              updateSingleContent={UPDATE_SINGLE_CONTENT}
              handleInput={ADD_SINGLE_CONTENT}
              categoryOptions={therapyGoalsCategories}
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
          <Button
            variant="secondary"
            text="Save Changes"
            type="submit"
            onClick={handleSubmit}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReviewFinish;
