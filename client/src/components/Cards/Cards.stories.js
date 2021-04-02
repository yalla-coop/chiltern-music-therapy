import { useState } from 'react';
import * as T from '../Typography';
import moment from 'moment';

import { TherapyGoals, Info, Basic, Link, Expandable, AddContentType } from '.';

export default {
  title: 'Common Components/Cards',
  component: TherapyGoals,
  argTypes: {
    color: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

const TherapyGoalsExample = (args) => {
  const [goals, setGoals] = useState(args.goals);
  return (
    <div style={{ maxWidth: '450px' }}>
      <TherapyGoals {...args} goals={goals} handleChange={setGoals} />
    </div>
  );
};

export const therapyGoals = TherapyGoalsExample.bind({});
therapyGoals.args = {
  goals: [
    { goal: 'goal1', category: 'Communication', id: 0 },
    { goal: 'goal2', category: 'Emotional wellbeing', id: 1 },
    { goal: 'goal3', category: 'Cognition and learning', id: 2 },
    { goal: 'goal4', category: 'Physical skills', id: 3 },
  ],
};

const InfoExampleJSX = (args) => {
  const body = (
    <>
      <T.P color="gray9" m={0}>
        - a minimum of 8 characters
      </T.P>
      <T.P color="gray9" m={0}>
        - one capital letter
      </T.P>
      <T.P color="gray9" m={0}>
        - one lowercase letter
      </T.P>
      <T.P color="gray9" m={0}>
        - one number
      </T.P>
      <T.P color="gray9" m={0}>
        - one non alphabetical or numeric character
      </T.P>
    </>
  );
  return <Info {...args} m={{ mt: 1 }} body={body} />;
};

export const infoExampleJSX = InfoExampleJSX.bind({});
infoExampleJSX.args = {
  title: 'Password must contain:',
};

const InfoExamplePlainBody = (args) => {
  return <Info {...args} m={{ mt: 1 }} />;
};

export const infoExamplePlainBody = InfoExamplePlainBody.bind({});
infoExamplePlainBody.args = {
  title: 'Password must contain:',
  body:
    'Your information is safe with us. All materials are kept confidential and in line with the Data Protection Act 1998, we only keep your data for as long as we need it for, which will be at least for the duration of you receiving our services.',
};

const BasicExample = (args) => {
  return (
    <div style={{ maxWidth: '350px' }}>
      <Basic {...args} />
    </div>
  );
};

export const Therapist = BasicExample.bind({});
Therapist.args = {
  therapistInfo: { firstName: 'Elizabeth', lastName: 'Peters', id: '1' },
  variant: 'therapistInfo',
};

export const TextInfoShort = BasicExample.bind({});
TextInfoShort.args = {
  variant: 'textInfoShort',
};

export const TextInfoLong = BasicExample.bind({});
TextInfoLong.args = {
  variant: 'textInfoLong',
};

export const NoProgrammes = BasicExample.bind({});
NoProgrammes.args = {
  variant: 'noProgrammes',
};

const LinkExample = (args) => {
  return (
    <div style={{ maxWidth: '350px' }}>
      <Link {...args} />
    </div>
  );
};

export const Graphic1 = LinkExample.bind({});
Graphic1.args = {
  variant: 'graphic1',
  title: 'therapy plan',
};

export const Graphic2 = LinkExample.bind({});
Graphic2.args = {
  variant: 'graphic2',
  title: 'therapy goals',
};

export const Programme = LinkExample.bind({});
Programme.args = {
  variant: 'programme',
  programme: { date: moment(), id: 1 },
};

export const Client = LinkExample.bind({});
Client.args = {
  variant: 'client',
  client: { firstInitial: 'J', secondInitial: 'P', postcode: 'SW', id: 1 },
  borderColor: 'rainbowHorizontal',
};

const ExpandableExample = (args) => {
  const removeFunc = () => {
    console.log('Remove content');
  };
  const editFunc = () => {
    console.log('Edit content');
  };
  return (
    <div style={{ maxWidth: '350px' }}>
      <Expandable {...args} remove={removeFunc} edit={editFunc} />
    </div>
  );
};

export const ExpandableCard = ExpandableExample.bind({});
ExpandableCard.args = {
  borderColor: 'rainbowHorizontal',
  content: {
    fileType: 'video',
    streamable: true,
    download: '/file.mp4',
    instructions:
      'Hi J P SW! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.',
    categories: ['Category 1', 'Category 2'],
  },
  actions: true,
};

export const ExpandableCardv2 = ExpandableExample.bind({});
ExpandableCardv2.args = {
  content: {
    fileType: 'video',
    streamable: true,
    download: '/file.mp4',
    instructions:
      'Hi J P SW! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.',
    categories: ['Category 1', 'Category 2'],
    title: 'Title of content',
    date: moment(),
  },
  actions: true,
  withDate: true,
};

export const AudioExample = ExpandableExample.bind({});
AudioExample.args = {
  borderColor: 'rainbowHorizontal',
  content: {
    fileType: 'audio',
    streamable: true,
    download: '/file.mp4',
    instructions:
      'Hi J P SW! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.',
    categories: ['Category 1', 'Category 2'],
  },
  actions: true,
};

export const DocExample = ExpandableExample.bind({});
DocExample.args = {
  borderColor: 'rainbowHorizontal',
  content: {
    fileType: 'document',
    streamable: true,
    download: '/file.mp4',
    instructions:
      'Hi J P SW! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.',
    categories: ['Category 1', 'Category 2'],
  },
  actions: true,
};

const AddContentTypeExample = (args) => {
  return (
    <div style={{ maxWidth: '350px' }}>
      <AddContentType {...args} />
    </div>
  );
};

export const AddDocCard = AddContentTypeExample.bind({});
AddDocCard.args = {
  contentType: 'document',
};

export const AddVideoCard = AddContentTypeExample.bind({});
AddVideoCard.args = {
  contentType: 'video',
};

export const AddAudioCard = AddContentTypeExample.bind({});
AddAudioCard.args = {
  contentType: 'audio',
};
