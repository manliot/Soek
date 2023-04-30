import * as React from "react"
interface Props extends React.SVGProps<SVGSVGElement> { }
const SvgComponent = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M24 10H14V0h-4v10H0v4h10v10h4V14h10z" />
  </svg>
)
export default SvgComponent