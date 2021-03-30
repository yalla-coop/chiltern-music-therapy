import theme from './../../theme';

// ICONS
import Email from './icons/Email';
import Inbox from './icons/Inbox';
import Attachment from './icons/Attachment';

const Icon = (props) => {
  const { icon, color } = props;

  const IconMap = {
    email: Email,
    inbox: Inbox,
    attachment: Attachment,
  };

  const StyledIcon = IconMap[icon];

  return (
    <StyledIcon
      {...props}
      color={theme.colors[color] || color || 'currentColor'}
    />
  );
};

export default Icon;
