const Info = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9999 5.99994c0 .55225-.4477.99994-1 .99994-.5522 0-.9999-.44769-.9999-.99994C11 5.44769 11.4477 5 11.9999 5c.5523 0 1 .44769 1 .99994z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M11.9999 18.9999c-.414 0-.75-.336-.75-.75V10.5H10.25c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.7499c.414 0 .75.336.75.75v8.4999c0 .414-.336.75-.75.75z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M12 24C5.38293 24 0 18.6171 0 12 0 5.38293 5.38293 0 12 0c6.6171 0 12 5.38293 12 12 0 6.6171-5.3829 12-12 12zm0-22.5C6.21002 1.5 1.5 6.21002 1.5 12c0 5.79 4.71002 10.5 10.5 10.5 5.79 0 10.5-4.71 10.5-10.5 0-5.78998-4.71-10.5-10.5-10.5z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M14.25 19h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="11.9962"
        y1="23.9996"
        x2="11.9962"
        y2=".00058"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#69CDF5" />
        <stop offset=".0238" stopColor="#5FCAF1" />
        <stop offset=".1143" stopColor="#3DC0E2" />
        <stop offset=".2067" stopColor="#22B9D7" />
        <stop offset=".3007" stopColor="#0FB3CE" />
        <stop offset=".3972" stopColor="#04B0CA" />
        <stop offset=".5" stopColor="#00AFC8" />
        <stop offset="1" stopColor="#5DC09A" />
      </linearGradient>
    </defs>
  </svg>
);

export default Info;
