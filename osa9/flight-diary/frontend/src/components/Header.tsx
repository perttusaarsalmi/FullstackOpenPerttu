import type { HeaderProps } from "../types";

const Header = (props: HeaderProps) => {
  return <h2>{props.headerText}</h2>;
};

export default Header;
