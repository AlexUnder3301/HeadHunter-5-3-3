import styles from "./style.module.scss";
import { NavLink, useMatch } from "react-router";

interface CustomLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const CustomLink = ({ children, to, className }: CustomLinkProps) => {
  const isVacanciesMatch = useMatch("/vacancies/*");
  const isExactMatch = useMatch(to);

  const isActive =
    isExactMatch || (to === "/vacancies/moscow" && isVacanciesMatch);

  return (
    <NavLink
      to={to}
      className={`${className} ${isActive ? styles["active-page"] : ""}`}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
