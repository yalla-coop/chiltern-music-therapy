import { useRef, useEffect } from 'react';
import videojs from 'video.js';

import * as T from '../Typography';
import Icon from '../Icon';

import 'video.js/dist/video-js.css';

import styled from '@emotion/styled';

export const LinkWrapper = styled.a`
  display: flex;
  margin-top: ${({ theme }) => theme.spacings[4]};
`;

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
        }}
      >
        <video
          ref={playerRef}
          className={`video-js  vjs-default-skin vjs-big-play-centered ${
            type === 'audio' ? 'vjs-audio' : ''
          }`}
        />
      </div>

      <LinkWrapper href={url} download target="_blank" rel="noreferrer">
        <Icon icon="download" width="16" height="16" color="blue" />
        <T.P color="blue" bold ml="2" weight="700">
          Download {type}
        </T.P>
      </LinkWrapper>
    </div>
  );
};

export default Video;
