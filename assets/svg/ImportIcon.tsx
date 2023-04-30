const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <path d="M8 11H2v10h20V11h-6V9h8v14H0V9h8v2zm5 2h4l-5 6-5-6h4V1h2v12z" />
  </svg>
)
export default SvgComponent