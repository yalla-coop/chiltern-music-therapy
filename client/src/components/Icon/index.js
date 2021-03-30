import theme from './../../theme';

// ICONS
import Email from './icons/Email';
import User from './icons/User';

const Icon = (props) => {
  const { icon, color } = props;

  const IconMap = {
    email: Email,
    user: User,
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
