import theme from './../../theme';

// ICONS
import Email from './icons/Email';
import Search from './icons/Search';

const Icon = (props) => {
  const { icon, color } = props;

  const IconMap = {
    email: Email,
    search: Search,
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
