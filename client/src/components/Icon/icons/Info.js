const Info = ({ width, height, color, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M12.9999 5.99994C12.9999 6.55219 12.5522 6.99988 11.9999 6.99988C11.4477 6.99988 11 6.55219 11 5.99994C11 5.44769 11.4477 5 11.9999 5C12.5522 5 12.9999 5.44769 12.9999 5.99994Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M11.9999 18.9999C11.5859 18.9999 11.2499 18.6639 11.2499 18.2499V10.5H10.25C9.836 10.5 9.5 10.164 9.5 9.75C9.5 9.336 9.836 9 10.25 9H11.9999C12.4139 9 12.7499 9.336 12.7499 9.75V18.2499C12.7499 18.6639 12.4139 18.9999 11.9999 18.9999Z"
      fill="url(#paint1_linear)"
    />
    <path
      d="M12 24C5.38293 24 0 18.6171 0 12C0 5.38293 5.38293 0 12 0C18.6171 0 24 5.38293 24 12C24 18.6171 18.6171 24 12 24ZM12 1.5C6.21002 1.5 1.5 6.21002 1.5 12C1.5 17.79 6.21002 22.5 12 22.5C17.79 22.5 22.5 17.79 22.5 12C22.5 6.21002 17.79 1.5 12 1.5Z"
      fill="url(#paint2_linear)"
    />
    <path
      d="M14.25 19H9.75C9.336 19 9 18.664 9 18.25C9 17.836 9.336 17.5 9.75 17.5H14.25C14.664 17.5 15 17.836 15 18.25C15 18.664 14.664 19 14.25 19Z"
      fill="url(#paint3_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="11.9996"
        y1="6.99985"
        x2="11.9996"
        y2="5.00005"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset="0.0238" stop-color="#5FCAF1" />
        <stop offset="0.1143" stop-color="#3DC0E2" />
        <stop offset="0.2067" stop-color="#22B9D7" />
        <stop offset="0.3007" stop-color="#0FB3CE" />
        <stop offset="0.3972" stop-color="#04B0CA" />
        <stop offset="0.5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="11.1244"
        y1="18.9998"
        x2="11.1244"
        y2="9.00024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset="0.0238" stop-color="#5FCAF1" />
        <stop offset="0.1143" stop-color="#3DC0E2" />
        <stop offset="0.2067" stop-color="#22B9D7" />
        <stop offset="0.3007" stop-color="#0FB3CE" />
        <stop offset="0.3972" stop-color="#04B0CA" />
        <stop offset="0.5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="11.9962"
        y1="23.9996"
        x2="11.9962"
        y2="0.000575043"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#69CDF5" />
        <stop offset="0.0238" stop-color="#5FCAF1" />
        <stop offset="0.1143" stop-color="#3DC0E2" />
        <stop offset="0.2067" stop-color="#22B9D7" />
        <stop offset="0.3007" stop-color="#0FB3CE" />
        <stop offset="0.3972" stop-color="#04B0CA" />
        <stop offset="0.5" stop-color="#00AFC8" />
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
        <stop offset="0.0238" stop-color="#5FCAF1" />
        <stop offset="0.1143" stop-color="#3DC0E2" />
        <stop offset="0.2067" stop-color="#22B9D7" />
        <stop offset="0.3007" stop-color="#0FB3CE" />
        <stop offset="0.3972" stop-color="#04B0CA" />
        <stop offset="0.5" stop-color="#00AFC8" />
        <stop offset="1" stop-color="#5DC09A" />
      </linearGradient>
    </defs>
  </svg>
);

export default Info;
