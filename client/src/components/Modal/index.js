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
            />
            <Button
              handleClick={() => handleOk('removeFromLibrary')}
              text="Remove from library"
              mb="3"
              m="0"
              variant="remove"
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
