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

import { dropdowns } from '../../../constants';

import * as S from './style';
import flowTypes from './flowTypes';
import { Media, Programmes } from '../../../api-calls';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Expandable } = Cards;

const { therapyGoalsCategories } = dropdowns;

const ReviewFinish = ({ state, actions, decidePath }) => {
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const { description, content, errors, loading } = state;

  const {
    SET_DESCRIPTION,
    UPDATE_CONTENT_ITEM,
    REMOVE_CONTENT_ITEM,
    SET_ERRORS,
    SET_LOADING,
  } = actions;

  const goBack = () => decidePath(flowTypes.addContent);

  const validateForm = () => {
    try {
      const formData = {
        content,
        description,
        part: 'review',
      };
      validate(formData);

      if (content.length === 0) {
        SET_ERRORS('Please add content to this programme');
      } else {
        SET_ERRORS({});
      }

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        SET_ERRORS(error.inner);
      }
      return false;
    }
  };
  useEffect(() => {
    if (content.length === 0) {
      SET_ERRORS('Please add content to this programme');
    } else {
      SET_ERRORS({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

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
      handleCreateProgramme();
    }
  };

  const handleCreateProgramme = async () => {
    SET_LOADING(true);
    const { error, data } = await Programmes.createProgramme({
      clientId: '1',
      description,
      content,
    });
    SET_LOADING(false);
    if (error) {
      if (error.statusCode === 409) {
        SET_ERRORS(error.message);
      } else {
        console.log('SUCCESSSSS');
        // TODO add modal
        // history.push(navRoutes.THERAPIST.WELCOME);
        decidePath(flowTypes.success);
      }
    }
  };

  const getMediaUrl = async (file) => {
    const { data, error: _error } = await Media.getMediadURL({
      key: file.key,
      bucket: file.bucket,
      bucketRegion: file.bucketRegion,
    });
    if (!_error) {
      return data;
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
          streamable: el.link || el.uploadedFileInfo.uploadedToS3,
          // TODO get url
          instructions: el.instructions,
          categories: el.categories,
          libraryContent: el.libraryContent,
          date: el.date || moment(),
          // get these from form validation above
          validationErrs: errors && errors[`content[${idx}]`],
        };

        if (el.uploadedFileInfo && el.uploadedFileInfo.uploadedToS3) {
          const mediaUrl = getMediaUrl(el.uploadedFileInfo);
          content.download = mediaUrl;
        }

        return (
          <Col mb={5} w={[4, 9, 5]}>
            <Expandable
              content={content}
              editing
              withDate
              remove={REMOVE_CONTENT_ITEM}
              handleInput={UPDATE_CONTENT_ITEM}
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

  console.log('er', errors);
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
      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Programme description"
            rows={5}
            value={description}
            handleChange={(val) => SET_DESCRIPTION(val)}
            error={errors && errors.description}
          />
        </Col>
      </Row>

      <Row mt={7}>{renderReviewCards(content)}</Row>
      {errors && typeof errors === 'string' && (
        <Row mt={5}>
          <T.P bold color="pink">
            {errors}
          </T.P>
        </Row>
      )}
      {errors && typeof errors === 'object' && (
        <Row mt={5}>
          <T.P bold color="pink">
            Errors storing your programme. Please check if all inputs are filled
            in correctly.
          </T.P>
        </Row>
      )}
      <Row mt={7}>
        <Col w={[4, 9, 4]} mbM={5} mbT={5}>
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
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReviewFinish;
