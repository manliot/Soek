import * as React from "react"
interface Props extends React.SVGProps<SVGSVGElement> { }
export const MenuIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M24 6H0V2h24v4zm0 4H0v4h24v-4zm0 8H0v4h24v-4z" />
  </svg>
)
