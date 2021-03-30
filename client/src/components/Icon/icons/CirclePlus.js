const CirclePlus = ({ width, height, color, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <g clip-path="url(#clip0)">
      <path
        d="M2.33757 2.33772C-0.778956 5.45425 -0.779593 10.5075 2.33773 13.6248C5.45426 16.7413 10.5081 16.7413 13.6247 13.6248C16.742 10.5075 16.7414 5.45425 13.6248 2.33772C10.5075 -0.779605 5.4549 -0.779605 2.33757 2.33772ZM10.6377 7.51175C10.8966 7.51191 11.1063 7.72161 11.1065 7.98055C11.1065 8.24093 10.8966 8.45079 10.6364 8.45063L8.45462 8.45063L8.4559 10.6417C8.45733 10.9019 8.24683 11.1124 7.9871 11.1117C7.72895 11.1124 7.51766 10.9027 7.51782 10.6437L7.51575 8.45063L5.32599 8.45063C5.06657 8.44999 4.85671 8.24013 4.85591 7.98055C4.85607 7.72161 5.06577 7.51191 5.32471 7.51175H7.51447L7.51192 5.32613C7.51112 5.06656 7.72162 4.85606 7.98056 4.8559C8.2395 4.85606 8.45064 5.06592 8.45064 5.3247L8.45335 7.51175L10.6377 7.51175Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CirclePlus;
