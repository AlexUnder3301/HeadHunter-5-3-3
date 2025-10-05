import styles from "./style.module.scss";
import SkillSet from "../../features/SkillSet/SkillSet";
import Search from "../../features/Search/Search";
import VacancyCard from "../../entities/VacansyCard/VacancyCard";
import { Pagination } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { setParams, fetchVacancies } from "../../shared/store/vacanciesSlice";
import { useEffect, useRef } from "react";
import mockData from "../../shared/mockData";
import { NavLink, useParams, useSearchParams } from "react-router";
import {
  setSearch,
  setSkills,
  configureTextParam,
} from "../../shared/store/vacanciesSlice";
import NotFoundPage from "../NotFoundPage/NotToundPage";

export const VacanciesPage = () => {
  const [searchParams] = useSearchParams();
  const { city } = useParams();
  const dispatch = useTypedDispatch();
  const {
    vacancies,
    isLoading,
    error,
    params,
    totalPages,
    page,
    skills,
    search,
  } = useTypedSelector((state) => state.vacancies);
  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      const textParam = searchParams.get("text");
      const skillSetParam = searchParams.get("skill_set");
      const areaParam = city === "moscow" ? 1 : 2;

      if (textParam !== null && textParam !== search) {
        dispatch(setSearch(textParam));
      }

      if (
        areaParam !== null &&
        areaParam.toString() !== params.area.toString()
      ) {
        dispatch(setParams({ area: areaParam }));
      }

      if (skillSetParam !== null && skillSetParam !== skills.join(",")) {
        dispatch(setSkills(skillSetParam.split(",").filter(Boolean)));
      }

      dispatch(configureTextParam());
      isMount.current = false;

      if (!textParam && !areaParam && !skillSetParam) {
        dispatch(fetchVacancies(params));
      }
    } else {
      dispatch(fetchVacancies(params));
    }
  }, [dispatch, params]);

  if (city !== "moscow" && city !== "petersburg") {
    return <NotFoundPage />;
  }

  const handlePageChange = (newPage: number) => {
    const apiPage = newPage - 1;
    const newParams = { ...params, page: apiPage };

    if (newPage !== page + 1) {
      dispatch(setParams(newParams));
      dispatch(fetchVacancies(newParams));
    }
    window.scrollTo({
      top: 0,
    });
  };

  const handleCityClick = (currentCity: string) => {
    dispatch(setParams({ area: currentCity, page: 0 }));
  };

  if (error) {
    return (
      <div>
        Возникла ошибка во время получения данных, перезагрузите страницу
      </div>
    );
  }

  return (
    <div className={styles["body-container"]}>
      <Search />
      <div className={styles["content-container"]}>
        <div className={styles["filters-container"]}>
          <SkillSet />
          {/* <CitySelect /> */}
        </div>
        <div className={styles["vacancies-container"]}>
          <div>
            <NavLink
              to={`/vacancies/moscow?${searchParams.toString()}`}
              onClick={() => {
                handleCityClick("1");
              }}
              className={({ isActive }) =>
                `${styles["city"]} ${isActive ? styles["active"] : ""}`
              }
            >
              Москва
            </NavLink>
            <NavLink
              to={`/vacancies/petersburg?${searchParams.toString()}`}
              onClick={() => {
                handleCityClick("2");
              }}
              className={({ isActive }) =>
                `${styles["city"]} ${isActive ? styles["active"] : ""}`
              }
            >
              Санкт-Петербург
            </NavLink>
          </div>
          {isLoading
            ? mockData.map((item) => {
                return <VacancyCard key={item.id} vacancy={item} isLoading />;
              })
            : vacancies.map((item) => {
                return <VacancyCard key={item.id} city={city} vacancy={item} />;
              })}
          <Pagination
            value={page + 1}
            onChange={handlePageChange}
            total={totalPages}
            className="custom-pagination"
            withEdges
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default VacanciesPage;
