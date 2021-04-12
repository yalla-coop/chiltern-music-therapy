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

import validate from '../../../validation/schemas/editContent';

import * as S from './style';

import { Programmes } from '../../../api-calls';
import {
  decideBorder,
  isEmptyObject,
  decideStreamable,
} from '../../../helpers';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Basic, Expandable } = Cards;

const Review = ({ navFunctions, states }) => {
  const [updating, setUpdating] = useState(false);
  const [modalToShow, setModalToShow] = useState('');
  const [contentToEdit, setContentToEdit] = useState('');
  const [contentToDelete, setContentToDelete] = useState('');
  const [editFormState, setEditFormState] = useState({});
  const [editingErrors, setEditingErrors] = useState({});

  const { programmeContents, categoryOptions } = states;

  const handleInput = (value) => {
    setEditFormState({ ...editFormState, ...value });
  };

  const removeContent = (id) => {
    setModalToShow('removeContent');
    setContentToDelete(id);
  };

  const editContent = (content) => {
    setContentToEdit(content.id);
    setEditFormState(content);
  };

  const cancelChanges = () => {
    setContentToEdit('');
    setEditFormState({});
  };

  const saveEdit = () => {
    try {
      validate({
        title: editFormState.title,
        instructions: editFormState.instructions,
      });
      setModalToShow('editContent');
    } catch (error) {
      if (error.name === 'ValidationError') {
        setEditingErrors({ validationErrs: error.inner });
      }
    }
  };

  const renderEditCards = (array) => {
    if (array.length > 0) {
      return array.map((content, index) => {
        const contentToUse =
          content.id === contentToEdit ? editFormState : content;

        return (
          <Col w={[4, 6, 4]} mb="4" key={index}>
            <Expandable
              borderColor={decideBorder(content.type)}
              content={{
                ...contentToUse,
                download: content.path,
                streamable: decideStreamable(content.type, content.path),
                categories: contentToUse.categories.filter(
                  (cat) => cat !== null
                ),
                type: content.type?.toLowerCase(),
                path: content.path,
                validationErrs: editingErrors?.validationErrs,
              }}
              editing
              withDate
              remove={() => removeContent(content.id)}
              edit={() => editContent(content)}
              onCancel={cancelChanges}
              handleInput={handleInput}
              actions
              categoryOptions={categoryOptions.filter(
                (opt) => opt.value !== 'ALL'
              )}
              review
            />
          </Col>
        );
      });
    }
  };

  return (
    <>
      {/* TODO UPDATE GOBACK */}
      {/* <GoBack customFn={navFunctions.goToAddContent} /> */}
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>Edit</strong> Programme
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>
      <Row mt={5} mb={4}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Programme description"
            placeholder="Programme description..."
            rows={5}
            // value={description}
            // handleChange={(val) => SET_DESCRIPTION(val)}
            // error={errors && errors.description}
          />
        </Col>
      </Row>
      {updating ? (
        <Row mb="4">
          <Col w={[4, 6, 4]} mb="4">
            Loading...
          </Col>
        </Row>
      ) : (
        <Row mb="4">
          {programmeContents.length > 0 ? (
            renderEditCards(programmeContents)
          ) : (
            <Col w={[4, 6, 4]}>
              <Basic>No content to show</Basic>
            </Col>
          )}
        </Row>
      )}

      {/* <Row mt={7}>{renderReviewCards(content)}</Row> */}
      {/* {errors && typeof errors === 'string' && (
        <Row mt={5}>
          <T.P bold color="pink">
            {errors}
          </T.P>
        </Row>
      )}
      {errors && !isEmptyObject(errors) && (
        <Row mt={5}>
          <T.P bold color="pink">
            Errors storing your programme. Please check if all inputs are filled
            in correctly.
          </T.P>
        </Row>
      )} */}
      <Row mt={7}>
        <Col w={[4, 6, 4]} mbM={5} mbT={5}>
          <Button
            variant="primary"
            text="Add more content"
            handleClick={navFunctions.goToAddContent}
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <Button
            variant="secondary"
            text="Save Changes"
            type="submit"
            // onClick={handleSubmit}
            // loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Review;
