const Menu = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
  >
    <path
      d="M1 .5h20M1 5.5h20M1 10.5h20"
      stroke={color || 'currentColor'}
      strokeLinecap="round"
    />
  </svg>
);

export default Menu;
