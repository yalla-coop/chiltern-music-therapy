const QuestionMark = ({ width, height, color, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <circle cx="8" cy="8" r="8" fill={color} />
    <path
      d="M6.125 6.20311C6.125 6.20311 6.15312 5.55858 6.78008 5.04178C7.15234 4.73495 7.59941 4.64608 8 4.64061C8.36582 4.63612 8.69277 4.69803 8.88828 4.79334C9.22246 4.95702 9.875 5.35545 9.875 6.20311C9.875 7.0951 9.30508 7.4994 8.65723 7.94491C8.00937 8.39041 7.84375 8.82733 7.84375 9.32811"
      stroke="white"
      stroke-width="0.78125"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M7.84375 11.4375C8.18893 11.4375 8.46875 11.1577 8.46875 10.8125C8.46875 10.4673 8.18893 10.1875 7.84375 10.1875C7.49857 10.1875 7.21875 10.4673 7.21875 10.8125C7.21875 11.1577 7.49857 11.4375 7.84375 11.4375Z"
      fill="white"
    />
  </svg>
);

export default QuestionMark;
