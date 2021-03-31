const Copy = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      d="M12.719 4H5.78C4.797 4 4 4.797 4 5.781v6.938c0 .984.797 1.781 1.781 1.781h6.938c.984 0 1.781-.797 1.781-1.781V5.78C14.5 4.797 13.703 4 12.719 4z"
      stroke={color || 'currentColor'}
      strokeLinejoin="round"
    />
    <path
      d="M11.984 4L12 3.25a1.755 1.755 0 00-1.75-1.75H3.5a2.006 2.006 0 00-2 2v6.75A1.755 1.755 0 003.25 12H4"
      stroke={color || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Copy;
