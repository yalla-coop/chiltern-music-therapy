const Backup = ({ width, height, color, ...props }) => (
  <svg
    width={width || '18'}
    height={height || '16'}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.49058 1.06667L2.4891 7.06814C0.509701 9.09352 0.525885 12.3371 2.52975 14.3417C4.55034 16.3617 7.82556 16.3617 9.84543 14.3417L14.7221 9.4652C14.9465 9.24064 14.9465 8.87669 14.7221 8.65287C14.4976 8.42759 14.1343 8.42759 13.9098 8.65287L9.0331 13.5296C7.46143 15.1003 4.9143 15.1003 3.34354 13.5296C1.77186 11.9571 1.77186 9.41076 3.34354 7.83982L9.3029 1.87972C10.2761 0.906483 11.8532 0.906483 12.8262 1.87972C13.798 2.85205 13.798 4.42906 12.8262 5.40156L6.86538 11.3617C6.49131 11.7357 5.88441 11.7357 5.51053 11.3617C5.13738 10.9878 5.13738 10.3809 5.51053 10.007L11.4706 4.04671C11.6952 3.82216 11.6952 3.45821 11.4706 3.23366C11.2463 3.0091 10.8821 3.0091 10.6577 3.23366L4.69747 9.19393C3.87448 10.0177 3.87448 11.351 4.69747 12.1747C5.46069 12.9365 6.66308 12.9938 7.49214 12.3395L7.5028 12.3494L7.65766 12.1946L7.7772 12.082L7.77333 12.0789L13.6385 6.2137C15.06 4.79228 15.06 2.48809 13.6385 1.06667C12.9274 0.356414 11.9964 0 11.0646 0C10.1327 0 9.20101 0.356414 8.49058 1.06667Z"
      fill={color || '#2D57A5'}
    />
  </svg>
);

export default Backup;
