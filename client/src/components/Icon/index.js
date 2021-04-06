import styled from '@emotion/styled';
import theme from './../../theme';
import setMargin from '../../helpers/set-margin';
import * as T from '../Typography';

// ICONS
import Email from './icons/Email';
import User from './icons/User';
import Attachment from './icons/Attachment';
import Add from './icons/Add';
import Audio from './icons/Audio';
import Bin from './icons/Bin';
import Copy from './icons/Copy';
import Cross from './icons/Cross';
import Document from './icons/Document';
import Download from './icons/Download';
import GoBack from './icons/GoBack';
import Inbox from './icons/Inbox';
import Info from './icons/Info';
import Menu from './icons/Menu';
import Paperclip from './icons/Paperclip';
import Programme from './icons/Programme';
import QuestionMark from './icons/QuestionMark';
import Search from './icons/Search';
import Star from './icons/Star';
import Tick from './icons/Tick';
import Video from './icons/Video';
import Edit from './icons/Edit';

const Icon = (props) => {
  const { icon, color, text, jc } = props;

  const IconMap = {
    email: Email,
    user: User,
    attachment: Attachment,
    add: Add,
    audio: Audio,
    bin: Bin,
    copy: Copy,
    cross: Cross,
    document: Document,
    download: Download,
    goBack: GoBack,
    inbox: Inbox,
    info: Info,
    menu: Menu,
    paperclip: Paperclip,
    programme: Programme,
    questionMark: QuestionMark,
    search: Search,
    star: Star,
    tick: Tick,
    video: Video,
    edit: Edit,
  };

  if (!IconMap[icon]) {
    // eslint-disable-next-line no-console
    console.warn(`<Icon /> called with invalid icon prop "${icon}"`);
    return null;
  }

  const StyledIcon = IconMap[icon];

  const Parent = styled.div`
    ${setMargin}
    display: flex;
    align-items: center;
    justify-content: ${jc || 'flex-start'};
  `;

  return (
    <Parent {...props}>
      <StyledIcon
        {...props}
        color={theme.colors[color] || color || 'currentColor'}
      />
      {text && (
        <T.P weight="bold" ml="1" color={color}>
          {text}
        </T.P>
      )}
    </Parent>
  );
};

export default Icon;
