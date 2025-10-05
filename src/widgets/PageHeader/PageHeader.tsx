import styles from "./style.module.scss";
import Logo from "../../shared/assets/logo.svg?react";
import ProfileLogo from "../../shared/assets/profile-logo.svg?react";
import CustomLink from "../../shared/ui/CustomLink/CustomLink";

const PageHeader = () => {
  return (
    <header className={styles["page-header"]}>
      <div className={styles["logo-container"]}>
        <Logo className={styles["logo-img"]} />
        <span className={styles["logo-text"]}>.FrontEnd</span>
      </div>
      <CustomLink to="/vacancies/moscow" className={styles["page-header-item"]}>
        <span className={styles["item-text"]}>Вакансии FE</span>
      </CustomLink>
      <CustomLink to="/about" className={styles["page-header-item"]}>
        <ProfileLogo />
        <span className={styles["item-text"]}>Обо мне</span>
      </CustomLink>
    </header>
  );
};

export default PageHeader;
