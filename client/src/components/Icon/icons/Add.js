const Add = ({ width, height, color, ...props }) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M2.338 2.338a7.981 7.981 0 1011.287 11.287A7.981 7.981 0 002.338 2.338zm8.3 5.174a.469.469 0 11-.001.939H8.455l.001 2.19a.468.468 0 11-.938.002l-.002-2.192h-2.19a.469.469 0 11-.001-.939h2.19l-.003-2.186a.469.469 0 11.939-.001l.003 2.187h2.184z"
        fill="#2D57A5"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Add;
