const Inbox = ({ width, height, color, error, ...props }) => (
  <svg
    width={width || '48'}
    height={height || '48'}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M41.4939 20.92L41.4845 20.8825L36.2252 7.51841C35.9908 6.76372 35.2923 6.24341 34.5002 6.24341H13.1814C12.3845 6.24341 11.6767 6.7731 11.4517 7.53716L6.53453 20.7653L6.52047 20.7981L6.51109 20.8356C6.45016 21.0653 6.43141 21.2997 6.46422 21.5293C6.45953 21.6043 6.45484 21.6793 6.45484 21.7543V38.9059C6.45608 39.6614 6.75675 40.3856 7.29096 40.9198C7.82517 41.454 8.54936 41.7547 9.30484 41.7559H38.7048C40.2752 41.7559 41.5548 40.4762 41.5595 38.9059V21.7543C41.5595 21.6934 41.5595 21.6325 41.5548 21.5809C41.5736 21.3512 41.5548 21.1309 41.4939 20.92ZM27.6283 18.9043L27.6142 19.6403C27.5767 21.745 26.1236 23.1606 24.0002 23.1606C22.9642 23.1606 22.0736 22.8278 21.4314 22.195C20.7892 21.5622 20.4377 20.6809 20.4189 19.6403L20.4048 18.9043H10.758L14.4845 9.84341H33.197L37.0267 18.9043H27.6283ZM10.0502 22.5043H17.4236C18.5627 25.1809 20.9861 26.7606 24.0048 26.7606C25.5845 26.7606 27.0517 26.32 28.2377 25.4856C29.2783 24.7543 30.0892 23.7325 30.6142 22.5043H37.9502V38.1559H10.0502V22.5043Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      {error ? (
        <linearGradient
          id="paint0_linear"
          x1="23.9971"
          y1="41.7581"
          x2="23.9971"
          y2="6.24403"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE444F" />
          <stop offset="0.5" stop-color="#C84196" />
          <stop offset="1" stop-color="#63469B" />
        </linearGradient>
      ) : (
        <linearGradient
          id="paint0_linear"
          x1="23.9994"
          y1="41.7554"
          x2="23.9994"
          y2="6.24426"
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
      )}
    </defs>
  </svg>
);

export default Inbox;
