import * as React from "react"
interface Props extends React.SVGProps<SVGSVGElement> { }
export const DeleteIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <path d="M5.662 23 .293 17.635a.996.996 0 0 1 0-1.414L15.222 1.293a1.001 1.001 0 0 1 1.414 0l7.071 7.073a.994.994 0 0 1 .293.708.995.995 0 0 1-.293.707L12.491 21h5.514v2H5.662zm3.657-2-5.486-5.486-1.419 1.414L6.49 21h2.829zm6.605-17.581L5.247 14.099l5.658 5.659L21.581 9.076l-5.657-5.657z" />
  </svg>
)
