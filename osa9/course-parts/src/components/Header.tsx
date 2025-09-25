import type { HeaderProps } from "../types";

const Header = (props: HeaderProps) => {
  return <h1>Hello, {props.text}</h1>;
};

export default Header