import { useState, useEffect } from 'react';

import * as S from './style';
import * as T from '../../Typography';

import Button from '../../Button';
import Icon from '../../Icon';
import Modal from '../../Modal';

import { BasicInput, Textarea, Checkbox, Dropdown } from '../../Inputs';

import { Media } from '../../../api-calls';
import { fileCategories } from '../../../constants/content';

const EditMode = ({
  content,
  open,
  contentRef,
  selectedHeight,
  remove,
  handleInput,
  errors,
  library,
  saveChanges,
  categoryOptions,
  onCancel,
}) => {
  const {
    instructions,
    categories,
    title,
    libraryContent,
    id,
    type,
    link,
    validationErrs,
    fileUpload,
  } = content;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(false);

  const getMediaUrl = async (file) => {
    const { data, error: _error } = await Media.getMediadURL({
      key: file.key,
      bucket: file.bucket,
    });
    if (!_error) {
      setMediaUrl(data);
    }
  };

  useEffect(() => {
    // re-assign parent state
    const formattedSingleContent = {
      categories,
      title,
      id,
      instructions,
      libraryContent,
      link,
      type,
    };
    handleInput(formattedSingleContent);
  }, []);

  useEffect(() => {
    // re-assign parent state
    if (fileUpload && fileUpload.uploadedToS3) {
      return getMediaUrl(fileUpload);
    }
  }, []);

  const modalParentFunction = (_id) => remove({ id });

  const streamable =
    [fileCategories.audio, fileCategories.video].includes(type) &&
    (mediaUrl || link);

  return (
    <S.Content open={open} ref={contentRef} height={selectedHeight}>
      <Modal
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type="removeFromProgramme"
        parentFunc={() => modalParentFunction(id)}
      />
      {streamable && (
        <div style={{ marginBottom: '24px' }}>STREAM GOES HERE</div>
      )}
      {mediaUrl && (
        <a href={mediaUrl} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text="Download file"
            mb="5"
            color="primary"
          />
        </a>
      )}

      <BasicInput
        label="Title"
        placeholder="Type title..."
        value={title}
        type="text"
        handleChange={(val) => handleInput({ id, title: val })}
        error={validationErrs && validationErrs.title}
        m={{ mb: '5' }}
      />

      <Dropdown
        multi
        label="Categories"
        selected={categories.map((el) => (el && el.value ? el.value : el))}
        options={categoryOptions || []}
        addNew
        handleChange={(val) => handleInput({ id, categories: val })}
        error={validationErrs && validationErrs.categories}
        search={false}
        m={{ mb: '5' }}
      />

      <Textarea
        value={instructions}
        placeholder="Type instructions here..."
        label="Want to add any more specific instructions for this video?"
        m={{ mb: '5' }}
        handleChange={(val) => handleInput({ id, instructions: val })}
        error={validationErrs && validationErrs.instructions}
      />

      {/* library */}
      {library ? (
        <>
          <Button text="Save changes" handleClick={saveChanges} mb="4" />
          <S.InvisibleBtn mb="5" onClick={onCancel}>
            <T.P
              weight="bold"
              ta="center"
              style={{ textDecoration: 'underline' }}
            >
              Cancel
            </T.P>
          </S.InvisibleBtn>
        </>
      ) : (
        <>
          <Checkbox
            checked={libraryContent}
            handleChange={(val) => handleInput({ id, libraryContent: val })}
            error={validationErrs && validationErrs.libraryContent}
            label={
              <T.P color="gray9">
                Save this video to{' '}
                <span style={{ fontWeight: '700' }}>My Library</span> so I can
                use it again in the future
              </T.P>
            }
            m={{ mb: '5' }}
          />
          <S.InvisibleBtn onClick={() => setIsModalVisible(true)}>
            <Icon
              icon="bin"
              width="16"
              height="16"
              text="Remove"
              color="secondary"
              jc="center"
              mb="5"
            />
          </S.InvisibleBtn>
        </>
      )}
    </S.Content>
  );
};

export default EditMode;
