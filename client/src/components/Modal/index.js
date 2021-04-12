import React from 'react';

import Button from '../Button';

import * as S from './style';
import * as T from '../Typography';

const maskStyle = { backgroundColor: 'white', opacity: '0.9' };

const Modal = ({
  visible,
  setIsModalVisible,
  children,
  type,
  parentFunc,
  closeOnOK = true,
  loading,
  error,
}) => {
  const handleOk = (action) => {
    parentFunc(action);
    closeOnOK && setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  switch (type) {
    case 'removeFromProgramme':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            variant="warning"
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Are you sure?</T.H3>
            <T.P color="gray9" mb="5">
              This will remove the content from this programme
            </T.P>
            <Button
              handleClick={() => handleOk('removeFromProgramme')}
              text="Confirm"
              mb="3"
              customColor="pink"
            />
            <Button
              handleClick={handleCancel}
              text="Go back"
              m="0"
              variant="gray"
            />
          </S.Modal>
        </>
      );
    case 'removeContent':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            variant="warning"
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Remove content</T.H3>
            <T.P color="gray9" mb="5">
              Would you like to remove this content from your library or delete
              completely. Please note that deleting it completely will remove
              the content from all programmes where you have used it.
            </T.P>
            <Button
              handleClick={() => handleOk('removeCompletely')}
              text="Delete completely"
              mb="3"
              customColor="pink"
              loading={loading}
            />
            <Button
              handleClick={() => handleOk('removeFromLibrary')}
              text="Remove from library"
              mb="3"
              m="0"
              variant="remove"
              loading={loading}
            />
            <Button
              handleClick={handleCancel}
              text="Go back"
              m="0"
              variant="gray"
              loading={loading}
            />
          </S.Modal>
        </>
      );
    case 'removeCompletely':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            variant="warning"
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Are you sure?</T.H3>
            <T.P color="gray9" mb="5">
              This will update the content for all programmes where you have
              used it.
            </T.P>
            <Button
              handleClick={() => handleOk('removeFromProgramme')}
              text="Confirm"
              mb="3"
              customColor="pink"
              loading={loading}
            />
            <Button
              handleClick={handleCancel}
              text="Go back"
              m="0"
              variant="gray"
              loading={loading}
            />
          </S.Modal>
        </>
      );
    case 'editContent':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            variant="warning"
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Are you sure?</T.H3>
            <T.P color="gray9" mb="5">
              This will update the content for all programmes where you have
              used it.
            </T.P>
            <Button
              handleClick={() => handleOk('editContent')}
              text="Confirm"
              mb="3"
              customColor="pink"
              loading={loading}
            />
            <Button
              handleClick={handleCancel}
              text="Go back"
              m="0"
              variant="gray"
              loading={loading}
            />
          </S.Modal>
        </>
      );
    case 'updateSuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Successfully updated</T.H3>
            <T.P color="gray9" mb="5">
              This content has been updated
            </T.P>
            <Button handleClick={handleCancel} text="Okay" />
          </S.Modal>
        </>
      );
    case 'removeFromLibrarySuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Successfully removed</T.H3>
            <T.P color="gray9" mb="5">
              This content has been removed from your library
            </T.P>
            <Button handleClick={handleCancel} text="Okay" />
          </S.Modal>
        </>
      );
    case 'removeCompletelySuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Successfully deleted</T.H3>
            <T.P color="gray9" mb="5">
              This content has been permanently deleted
            </T.P>
            <Button handleClick={handleCancel} text="Okay" />
          </S.Modal>
        </>
      );
    case 'removeFromProgrammeSuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Successfully deleted</T.H3>
            <T.P color="gray9" mb="5">
              This content has been removed from this programme.
            </T.P>
            <Button handleClick={handleCancel} text="Okay" />
          </S.Modal>
        </>
      );
    case 'error':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Error</T.H3>
            <T.P color="gray9" mb="2">
              Sorry we encountered an error trying to complete your request
            </T.P>
            <T.P color="gray8" mb="5">
              {error}
            </T.P>
            <Button handleClick={handleCancel} text="Okay" />
          </S.Modal>
        </>
      );
    case 'addSuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Successfully added</T.H3>
            <T.P color="gray9" mb="5">
              This content has been add to this programme
            </T.P>
            <Button
              handleClick={() => handleOk('addMoreContent')}
              text="Add more content"
              mb="3"
            />
            <Button
              handleClick={() => handleOk('reviewAndFinish')}
              text="Review and finish"
              m="0"
              variant="secondary"
            />
          </S.Modal>
        </>
      );
    case 'updateClientSuccess':
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            <T.H3 mb="2">Changes saved</T.H3>
            <T.P color="gray9" mb="5">
              Your client notes have been successfully updated
            </T.P>
            <Button handleClick={() => handleOk()} text="Okay" mb="3" />
          </S.Modal>
        </>
      );
    default:
      return (
        <>
          <S.Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            maskStyle={maskStyle}
          >
            {children}
          </S.Modal>
        </>
      );
  }
};

export default Modal;
