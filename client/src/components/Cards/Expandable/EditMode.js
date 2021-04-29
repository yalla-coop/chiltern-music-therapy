import { useState, useEffect } from 'react';

import * as S from './style';
import * as T from '../../Typography';

import Button from '../../Button';
import Icon from '../../Icon';
import Modal from '../../Modal';

import { BasicInput, Textarea, Checkbox, Dropdown } from '../../Inputs';

import { Media } from '../../../api-calls';
import { fileCategories } from '../../../constants/content';
import { linkFormatter } from '../../../helpers';
import Video from '../../Video';

const EditMode = ({
  content,
  open,
  contentRef,
  selectedHeight,
  remove,
  handleInput,
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
    url,
    download,
    docContent,
  } = content;

  console.log(`content`, content);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // re-assign parent state
    if (fileUpload && fileUpload.uploadedToS3) {
      return getMediaUrl(fileUpload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return <div ref={contentRef} height={selectedHeight} />;
  const modalParentFunction = (_id) => {
    return remove({ id });
  };

  const streamable =
    [fileCategories.audio, fileCategories.video].includes(type) &&
    (mediaUrl || url);

  return (
    <S.Content open={open} ref={contentRef} height={selectedHeight}>
      <Modal
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type="removeFromProgramme"
        parentFunc={() => modalParentFunction(id)}
      />

      {streamable && (
        <div style={{ marginBottom: '24px', marginTop: '8px' }}>
          <Video url={url || mediaUrl} type={type} />
        </div>
      )}

      {download && (
        <a href={download} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text={`Download ${type}`}
            mb="5"
            color="primary"
          />
        </a>
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
      {docContent && <Textarea value={docContent} m={{ mb: '5' }} rows={5} />}
      {link && (
        <T.Link
          external
          to={linkFormatter(link)}
          weight="bold"
          color="primary"
          mb="5"
        >
          View content link
        </T.Link>
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
