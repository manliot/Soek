import * as React from "react"
interface Props extends React.SVGProps<SVGSVGElement> { }
export const CommentsIcon = (props?: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M18.5 5H10V0H5.5v2H8v3h-.5C3.378 5 0 8.065 0 12v7h11v5h1.989v-5H24v-7.5C24 8.283 21.72 5 18.5 5ZM13 11.5V17H2v-5c0-2.832 2.49-5 5.5-5H8v3.5c-.6.347-1 .761-1 1.5 0 1.104.839 2 1.954 2C10.068 14 11 13.104 11 12c0-.739-.4-1.153-1-1.5V7h4.5C13.497 8.223 13 9.875 13 11.5Zm9 5.5h-7v-5.5C15 9.383 16.479 7 18.5 7S22 9.383 22 11.5V17Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)