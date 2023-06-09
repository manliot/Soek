interface Props extends React.SVGProps<SVGSVGElement> { }
export const UserIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5A5.006 5.006 0 0 1 12 2zm0-2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm6.369 13.353a9.057 9.057 0 0 1-1.658 1.302c2.872 1.874 4.378 5.083 4.972 7.346H2.296c.572-2.29 2.058-5.503 4.973-7.358a9.008 9.008 0 0 1-1.658-1.312C1.353 16.403 0 21.837 0 24h24c0-2.142-1.44-7.557-5.631-10.647z" />
  </svg>
)

