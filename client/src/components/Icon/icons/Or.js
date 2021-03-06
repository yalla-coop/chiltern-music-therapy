const Or = ({ width, height, color, ...props }) => (
  <svg
    width={width || '84'}
    height={height || '24'}
    viewBox="0 0 84 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="26" y1="12.5" x2="4.37114e-08" y2="12.5" stroke="#67BE65" />
    <path
      d="M38.608 9.664C39.216 9.664 39.768 9.76267 40.264 9.96C40.7653 10.1573 41.192 10.4373 41.544 10.8C41.9013 11.1627 42.176 11.6053 42.368 12.128C42.56 12.6507 42.656 13.2347 42.656 13.88C42.656 14.5307 42.56 15.1173 42.368 15.64C42.176 16.1627 41.9013 16.608 41.544 16.976C41.192 17.344 40.7653 17.6267 40.264 17.824C39.768 18.0213 39.216 18.12 38.608 18.12C37.9947 18.12 37.4373 18.0213 36.936 17.824C36.4347 17.6267 36.0053 17.344 35.648 16.976C35.296 16.608 35.0213 16.1627 34.824 15.64C34.632 15.1173 34.536 14.5307 34.536 13.88C34.536 13.2347 34.632 12.6507 34.824 12.128C35.0213 11.6053 35.296 11.1627 35.648 10.8C36.0053 10.4373 36.4347 10.1573 36.936 9.96C37.4373 9.76267 37.9947 9.664 38.608 9.664ZM38.608 16.6C39.2907 16.6 39.7947 16.3707 40.12 15.912C40.4507 15.4533 40.616 14.7813 40.616 13.896C40.616 13.0107 40.4507 12.336 40.12 11.872C39.7947 11.408 39.2907 11.176 38.608 11.176C37.9147 11.176 37.4 11.4107 37.064 11.88C36.7333 12.344 36.568 13.016 36.568 13.896C36.568 14.776 36.7333 15.448 37.064 15.912C37.4 16.3707 37.9147 16.6 38.608 16.6ZM46.0275 11.216C46.2835 10.7253 46.5875 10.3413 46.9395 10.064C47.2915 9.78133 47.7075 9.64 48.1875 9.64C48.5662 9.64 48.8702 9.72267 49.0995 9.888L48.9715 11.368C48.9448 11.464 48.9048 11.5333 48.8515 11.576C48.8035 11.6133 48.7368 11.632 48.6515 11.632C48.5715 11.632 48.4515 11.6187 48.2915 11.592C48.1368 11.5653 47.9848 11.552 47.8355 11.552C47.6168 11.552 47.4222 11.584 47.2515 11.648C47.0808 11.712 46.9262 11.8053 46.7875 11.928C46.6542 12.0453 46.5342 12.1893 46.4275 12.36C46.3262 12.5307 46.2302 12.7253 46.1395 12.944V18H44.1635V9.792H45.3235C45.5262 9.792 45.6675 9.82933 45.7475 9.904C45.8275 9.97333 45.8808 10.1013 45.9075 10.288L46.0275 11.216Z"
      fill={color || '#5E6875'}
    />
    <line x1="84" y1="12.5" x2="58" y2="12.5" stroke="#67BE65" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="13"
        y1="10.9999"
        x2="13"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#BED635" />
        <stop offset="0.0132" stop-color="#BAD537" />
        <stop offset="0.1293" stop-color="#A0CD49" />
        <stop offset="0.2481" stop-color="#8DC756" />
        <stop offset="0.3701" stop-color="#82C45D" />
        <stop offset="0.5" stop-color="#7EC360" />
        <stop offset="1" stop-color="#42B469" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="71"
        y1="10.9999"
        x2="71"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#BED635" />
        <stop offset="0.0132" stop-color="#BAD537" />
        <stop offset="0.1293" stop-color="#A0CD49" />
        <stop offset="0.2481" stop-color="#8DC756" />
        <stop offset="0.3701" stop-color="#82C45D" />
        <stop offset="0.5" stop-color="#7EC360" />
        <stop offset="1" stop-color="#42B469" />
      </linearGradient>
    </defs>
  </svg>
);

export default Or;
