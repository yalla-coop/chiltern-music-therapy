import { useRef, useEffect } from 'react';
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
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
      },
      () => {
        player.src(url);
      }
    );

    return () => {
      player.dispose();
    };
  }, [url]);

  const audioStyle = {
    width: '100%',
    height: '2rem',
    overflow: 'hidden',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  return (
    <>
      <div style={type === 'audio' ? audioStyle : videoStyle}>
        <div
          data-vjs-player
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        >
          <video
            ref={playerRef}
            className={`video-js  vjs-default-skin ${
              type === 'audio' ? 'vjs-audio' : ''
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default Video;
