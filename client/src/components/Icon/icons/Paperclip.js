const Paperclip = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      d="M8.49 1.067l-6 6.001a5.173 5.173 0 007.356 7.274l4.876-4.877a.574.574 0 10-.812-.812L9.033 13.53a4.024 4.024 0 01-5.69-5.69l5.96-5.96a2.49 2.49 0 113.523 3.522l-5.96 5.96a.958.958 0 01-1.355-1.355l5.96-5.96a.575.575 0 10-.813-.813l-5.96 5.96a2.108 2.108 0 002.794 3.145l.01.01.156-.154.12-.113-.005-.003 5.866-5.865A3.64 3.64 0 108.49 1.067z"
      fill={color || 'currentColor'}
    />
  </svg>
);

export default Paperclip;
