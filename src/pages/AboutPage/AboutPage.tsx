import styles from "./style.module.scss";

const AboutPage = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["about"]}>
        <h2 className={styles["about-heading"]}>Александр Меньшов</h2>
        <p className={styles["about-text"]}>
          Привет, я фронтенд разработчик. Стек: TypeScript, React, RTK.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
