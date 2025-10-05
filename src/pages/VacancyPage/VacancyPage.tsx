import styles from "./style.module.scss";
import { useParams } from "react-router";
import { useTypedSelector } from "../../shared/hooks/redux";
import VacancyCard from "../../entities/VacansyCard/VacancyCard";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import NotFoundPage from "../NotFoundPage/NotToundPage";

const VacancyPage = () => {
  const { id } = useParams();
  const { vacancies } = useTypedSelector((state) => state.vacancies);
  const currentVacancy = vacancies.filter((item) => item.id === id)[0];

  if (!currentVacancy) {
    return <NotFoundPage />;
  }

  const safeRequirement = DOMPurify.sanitize(currentVacancy.requirement);
  const safeResponsibility = DOMPurify.sanitize(currentVacancy.responsibility);

  return (
    <div className={styles["vacancy-container"]}>
      <VacancyCard vacancy={currentVacancy} isOpened />
      <div className={styles["description"]}>
        <h2 className={styles["company-name"]}>Требования</h2>
        <p>{parse(safeRequirement.replace(/highlighttext/g, "span"))}</p>
        <h2>Обязанности</h2>
        <p>{parse(safeResponsibility.replace(/highlighttext/g, "span"))}</p>
      </div>
    </div>
  );
};

export default VacancyPage;
