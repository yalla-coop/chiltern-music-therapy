import React, { useState } from 'react';

import Modal from './index';
import Button from '../Button';

export default {
  title: 'Common Components/Modal',
  component: Modal,
  argTypes: {},
};

const Template = (args) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const parentFunc = (action) => {
    /* this is the function where you can then carry out
     whatever action you want on that page based on action type */

    console.log('Now do something based on this', action);
  };

  return (
    <div style={{ width: '300px' }}>
      <Button type="primary" onClick={showModal} text="Open modal" />
      <Modal
        {...args}
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        parentFunc={parentFunc}
      />
    </div>
  );
};

export const UpdateSucess = Template.bind({});
UpdateSucess.args = {
  type: 'updateSuccess',
};

export const AddSuccess = Template.bind({});
AddSuccess.args = {
  type: 'addSuccess',
};

export const RemoveContent = Template.bind({});
RemoveContent.args = {
  type: 'removeContent',
};

export const RemoveFromProgramme = Template.bind({});
RemoveFromProgramme.args = {
  type: 'removeFromProgramme',
};
