const Programme = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
  >
    <path
      d="M11.082 4v27.74H9.07A2.086 2.086 0 007 33.81V6.704A2.711 2.711 0 019.711 4h1.37z"
      fill="#2D57A5"
    />
    <path
      d="M33.242 4h-22.16v27.74h22.16V4zM33.242 31.74v4.14H9.07A2.07 2.07 0 017 33.81a2.086 2.086 0 012.07-2.07h24.172z"
      fill="#fff"
    />
    <path
      d="M23.663 9.914l3.367.5-2.436 2.368.566 3.352-3.009-1.587-3.017 1.58.581-3.352-2.428-2.377 3.367-.484 1.512-3.046 1.497 3.046z"
      fill="#A0CD4E"
    />
    <g style={{ mixBlendMode: 'multiply' }}>
      <path
        d="M12.69 4H9.712A2.711 2.711 0 007 6.704V33.81a2.071 2.071 0 002.07 2.07h2.98a2.071 2.071 0 01-2.07-2.07V6.704A2.711 2.711 0 0112.69 4z"
        fill="#0E0F11"
        opacity=".25"
      />
    </g>
    <path
      d="M11.082 4v27.74H9.07A2.086 2.086 0 007 33.81V6.704A2.711 2.711 0 019.711 4h1.37z"
      stroke="#231F20"
      strokeWidth="1.49"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.242 4h-22.16v27.74h22.16V4zM33.242 31.74v4.14H9.07A2.07 2.07 0 017 33.81a2.086 2.086 0 012.07-2.07h24.172z"
      stroke="#231F20"
      strokeWidth="1.49"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.208 19.948h6.585M14.657 24.82H30.1"
      stroke="#67BE65"
      strokeWidth="1.49"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.663 9.914l3.367.5-2.436 2.368.566 3.352-3.009-1.587-3.017 1.58.581-3.352-2.428-2.377 3.367-.484 1.512-3.046 1.497 3.046z"
      stroke="#231F20"
      strokeWidth="1.49"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Programme;
