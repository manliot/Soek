interface Props extends React.SVGProps<SVGSVGElement> { }
const SvgComponent = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M20 7h-4V4a4 4 0 0 0-8 0v3H4L2 24h20L20 7zM9 4c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V4zM4.249 22 5.778 9H8v1.5a.5.5 0 0 0 1 0V9h6v1.5a.5.5 0 0 0 1 0V9h2.222l1.529 13H4.249z" />
  </svg>
)
export default SvgComponent
