import classNames from "classnames";
import styles from "./style.module.scss";
import { Button } from "@mantine/core";
import type { VacancyType } from "../../shared/types";
import { useNavigate } from "react-router";

interface VacancyCardType {
  vacancy: VacancyType;
  isLoading?: boolean;
  isOpened?: boolean;
  city?: string;
}

const VacancyCard = ({
  vacancy: { employerName, name, experience, workFormat, area, salary, id },
  isLoading,
  isOpened,
  city,
}: VacancyCardType) => {
  const navigate = useNavigate();

  const handleVacancyClick = () => {
    navigate(`/vacancies/${city}/${id}`);
  };

  const handleHHRedirect = () => {
    window.open(`https://hh.ru/vacancy/${id}`);
  };

  const experienceMap: Record<string, string> = {
    noExperience: "Без опыта",
    between1And3: "Опыт 1 - 3 года",
    between3And6: "Опыт 3 - 6 лет",
    moreThan6: "Опыт более 6 лет",
  };

  const workFormatMap: Record<string, string> = {
    ON_SITE: "Офис",
    REMOTE: "Можно удаленно",
    HYBRID: "Гибрид",
  };

  if (isLoading) {
    return (
      <div
        className={classNames(styles["vacancy-card"], styles["loading"])}
        data-testid="vacancy-card"
      ></div>
    );
  }

  return (
    <div className={styles["vacancy-card"]}>
      <h3 className={styles["vacancy-card-heading"]}>{name}</h3>
      <div className={styles["salary-container"]}>
        {salary.from ? (
          salary.to ? (
            <span className={styles["salary"]}>
              {`${salary.from} - ${salary.to} ₽`}
            </span>
          ) : (
            <span className={styles["salary"]}>{`От ${salary.from} ₽`}</span>
          )
        ) : (
          <span className={styles["salary"]}>Зарплата не указана</span>
        )}
        <span className={styles["experience"]}>
          {experienceMap[experience] || "Не указано"}
        </span>
      </div>
      <div className={styles["employer-name"]}>{employerName}</div>
      <div className={classNames(styles["work-format"], styles[workFormat])}>
        {workFormatMap[workFormat] || "Не указано"}
      </div>
      <span className={styles["city"]}>{area}</span>
      <div className={styles["buttons-container"]}>
        {isOpened ? (
          <Button
            className={styles["vacancy-button"]}
            onClick={handleHHRedirect}
          >
            Откликнуться на hh.ru
          </Button>
        ) : (
          <>
            <Button
              className={styles["vacancy-button"]}
              onClick={handleVacancyClick}
            >
              Смотреть вакансию
            </Button>
            <Button
              className={styles["response-button"]}
              onClick={handleHHRedirect}
            >
              Откликнуться
            </Button>
            )
          </>
        )}
      </div>
    </div>
  );
};

export default VacancyCard;
