const Info = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
  >
    <path d="M13 6a1 1 0 11-2 0 1 1 0 012 0z" fill="url(#paint0_linear)" />
    <path
      d="M12 19a.75.75 0 01-.75-.75V10.5h-1a.75.75 0 010-1.5H12a.75.75 0 01.75.75v8.5A.75.75 0 0112 19z"
      fill="url(#paint1_linear)"
    />
    <path
      d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5z"
      fill="url(#paint2_linear)"
    />
    <path
      d="M14.25 19h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5z"
      fill="url(#paint3_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="12"
        y1="7"
        x2="12"
        y2="5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset=".024" stop-color="#5FCAF1" />
        <stop offset=".114" stop-color="#3DC0E2" />
        <stop offset=".207" stop-color="#22B9D7" />
        <stop offset=".301" stop-color="#0FB3CE" />
        <stop offset=".397" stop-color="#04B0CA" />
        <stop offset=".5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="11.124"
        y1="19"
        x2="11.124"
        y2="9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset=".024" stop-color="#5FCAF1" />
        <stop offset=".114" stop-color="#3DC0E2" />
        <stop offset=".207" stop-color="#22B9D7" />
        <stop offset=".301" stop-color="#0FB3CE" />
        <stop offset=".397" stop-color="#04B0CA" />
        <stop offset=".5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="11.996"
        y1="24"
        x2="11.996"
        y2=".001"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset=".024" stop-color="#5FCAF1" />
        <stop offset=".114" stop-color="#3DC0E2" />
        <stop offset=".207" stop-color="#22B9D7" />
        <stop offset=".301" stop-color="#0FB3CE" />
        <stop offset=".397" stop-color="#04B0CA" />
        <stop offset=".5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="11.999"
        y1="19"
        x2="11.999"
        y2="17.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset=".024" stop-color="#5FCAF1" />
        <stop offset=".114" stop-color="#3DC0E2" />
        <stop offset=".207" stop-color="#22B9D7" />
        <stop offset=".301" stop-color="#0FB3CE" />
        <stop offset=".397" stop-color="#04B0CA" />
        <stop offset=".5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
    </defs>
  </svg>
);

export default Info;
