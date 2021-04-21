import { useRef, useEffect } from 'react';
import ReactGA from 'react-ga';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';

const Video = ({ url, type }) => {
  const playerRef = useRef();

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      {
        controls: true,
        autoplay: false,
        preload: 'auto',
        controlBar: {
          fullscreenToggle: type === 'video',
          pictureInPictureToggle: type === 'video',
        },
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
      },
      () => {
        player.src(url);
      }
    );

    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Viewing content',
        action: type === 'video' ? 'Watching video' : 'Listening to audio',
      });
    }

    return () => {
      player.dispose();
    };
  }, [type, url]);

  const audioStyle = {
    width: '100%',
    height: '2rem',
    // overflow: 'hidden',
  };

  const videoStyle = {
    width: '100%',
    height: '268px',
    // overflow: 'hidden',
  };

  return (
    <div style={type === 'audio' ? audioStyle : videoStyle}>
      <div
        data-vjs-player
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <video
          ref={playerRef}
          className={`video-js  vjs-default-skin vjs-big-play-centered ${
            type === 'audio' ? 'vjs-audio' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Video;
