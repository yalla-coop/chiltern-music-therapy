import Video from '.';

export default {
  title: 'Common Components/Video',
  component: Video,
};

const Template = (args) => (
  <div style={{ height: '300px' }}>
    <Video {...args} />;
  </div>
);

export const video = Template.bind({});
video.args = {
  url: 'http://vjs.zencdn.net/v/oceans.mp4',
  type: 'video',
};

export const audio = Template.bind({});
audio.args = {
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  type: 'audio',
};
