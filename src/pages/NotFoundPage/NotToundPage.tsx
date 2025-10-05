import styles from "./styles.module.scss";
import { useNavigate } from "react-router";
import sadCat from "../../shared/assets/sad-cat.gif";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/vacancies/moscow");
  };

  return (
    <div className={styles["wapper"]}>
      <div className={styles["page-container"]}>
        <div className={styles["heading-container"]}>
          <h1>Упс! Такой страницы не существует</h1>
          <button onClick={onClick}>На главную</button>
        </div>
        <p>Давайте перейдем к началу</p>
        <img src={sadCat} alt="Грустный котик" />
      </div>
    </div>
  );
};

export default NotFoundPage;
