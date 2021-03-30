const Star = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 37 37"
  >
    <path
      d="M32.812 12.757l-9.174-1.334-4.101-8.314a1.15 1.15 0 00-.524-.524 1.161 1.161 0 00-1.55.524l-4.101 8.314-9.175 1.334a1.154 1.154 0 00-.64 1.973l6.638 6.47-1.568 9.139a1.155 1.155 0 001.677 1.218l8.206-4.315 8.206 4.315a1.154 1.154 0 001.677-1.218l-1.57-9.138 6.639-6.471c.18-.178.3-.409.336-.662a1.152 1.152 0 00-.976-1.311z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="18.5"
        y1="31.692"
        x2="18.5"
        y2="2.467"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#BED635" />
        <stop offset=".013" stopColor="#BAD537" />
        <stop offset=".129" stopColor="#A0CD49" />
        <stop offset=".248" stopColor="#8DC756" />
        <stop offset=".37" stopColor="#82C45D" />
        <stop offset=".5" stopColor="#7EC360" />
        <stop offset="1" stopColor="#42B469" />
      </linearGradient>
    </defs>
  </svg>
);

export default Star;
