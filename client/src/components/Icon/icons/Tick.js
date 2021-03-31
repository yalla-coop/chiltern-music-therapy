const Tick = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M.981 8.981a8 8 0 1016 0 8 8 0 00-16 0zm10.454-3.115a.47.47 0 11.739.583l-3.719 4.706a.47.47 0 01-.698.045L5.828 9.308a.47.47 0 11.66-.672l1.554 1.525 3.393-4.295z"
        fill={color || 'currentColor'}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" transform="translate(.981 .981)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Tick;
