import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import * as S from './style';
import * as T from '../Typography';

const Copy = () => {
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(true);

  useEffect(() => {
    // API call to get link to go here
    setInviteLink('https://www.test.com/sdfsdfsdf');
  }, []);

  const copyCodeToClipboard = () => {
    setCopied(false);
    const el = document.createElement('textArea');
    el.value = inviteLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 750);
    }
  }, [copied]);

  return (
    <>
      <S.Wrapper>
        <T.P color="gray8" bold>
          {inviteLink}
        </T.P>
        <S.CopyBtn ml="3" onClick={copyCodeToClipboard}>
          <T.H5 color="gray9">COPY</T.H5>
          <Icon icon="copy" color="gray9" width="16" height="16" ml="1" />
        </S.CopyBtn>
      </S.Wrapper>
      {copied && (
        <Icon
          icon="tick"
          text="Copied!"
          color="primary"
          width="16"
          height="16"
          mr="4"
          mt="2"
          style={{ justifyContent: 'flex-end' }}
        />
      )}
    </>
  );
};

export default Copy;
