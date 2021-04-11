import Video from '.';

export default {
  title: 'Common Components/Video',
  component: Video,
};

const Template = (args) => (
  // should be handled in the grid
  <div style={{ height: '300px', width: '300px' }}>
    <Video {...args} />
  </div>
);

export const video = Template.bind({});
video.args = {
  url: 'http://techslides.com/demos/sample-videos/small.mp4',
  type: 'video',
};

export const audio = Template.bind({});
audio.args = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  type: 'audio',
};
