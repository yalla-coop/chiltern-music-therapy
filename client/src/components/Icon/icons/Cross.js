const Cross = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      d="M1.613 1.641l14.744 14.744M16.358 1.642L1.614 16.386"
      stroke={color || 'currentColor'}
      strokeWidth="1.327"
      strokeLinecap="round"
    />
  </svg>
);

export default Cross;
