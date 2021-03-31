const Download = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      d="M0 7.981a7.981 7.981 0 1015.962 0A7.981 7.981 0 000 7.981z"
      fill={color || 'currentColor'}
    />
    <path
      d="M7.472 4.472v5.777l-1.08-1.08a.473.473 0 00-.668.668l1.887 1.883a.473.473 0 00.666 0l1.887-1.883a.472.472 0 00-.666-.668l-1.082 1.08V4.472a.472.472 0 00-.944 0z"
      fill="#fff"
    />
  </svg>
);

export default Download;
