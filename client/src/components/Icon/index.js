import theme from './../../theme';

// ICONS
import Email from './icons/Email';
import Search from './icons/Search';
import CirclePlus from './icons/CirclePlus';
import Trash from './icons/Trash';
import Info from './icons/Info';
import QuestionMark from './icons/QuestionMark';

const Icon = (props) => {
  const { icon, color } = props;

  const IconMap = {
    email: Email,
    search: Search,
    circlePlus: CirclePlus,
    trash: Trash,
    info: Info,
    questionMark: QuestionMark,
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
