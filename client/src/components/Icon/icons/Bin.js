const Bin = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <g clipPath="url(#clip0)" fill={color || 'currentColor'}>
      <path d="M1.875 1.879l.842 11.903a2.347 2.347 0 002.342 2.181h5.9a2.347 2.347 0 002.341-2.18l.851-11.904H1.875zm5.634 9.86V6.103a.47.47 0 01.939 0v5.634a.47.47 0 01-.94 0zm3.247.467a.468.468 0 01-.428-.507l.47-5.633a.47.47 0 11.934.078l-.47 5.634a.47.47 0 01-.466.43l-.04-.002zm-5.593-.428l-.47-5.634a.47.47 0 11.936-.078L6.1 11.7a.47.47 0 01-.43.507l-.039.002a.47.47 0 01-.467-.43z" />
      <path d="M6.103 0a.47.47 0 00-.42.26l-.808 1.618H.469a.47.47 0 000 .939h15.024a.47.47 0 000-.94h-4.405L10.28.26A.47.47 0 009.86 0H6.103zm.291.939H9.57l.47.939H5.923l.47-.939z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Bin;
