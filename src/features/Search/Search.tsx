import styles from "./style.module.scss";
import SearchIcon from "../../shared/assets/search-icon.svg?react";
import { useCallback, useState } from "react";
import { useSyncParams } from "../../shared/hooks/useSyncParams";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParamUrl] = useSearchParams();
  const textQuery = searchParamUrl.get("text");
  const [searchParam, setSearchParam] = useState(() =>
    textQuery ? textQuery : ""
  );
  const { setSyncSearchParam } = useSyncParams();

  const handleSearch = useCallback(() => {
    setSyncSearchParam(searchParam);
  }, [searchParam, setSyncSearchParam]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search"]}>
        <div className={styles["search-heading"]}>
          <h1>Список вакансий</h1>
          <span>по профессии Frontend-разработчик</span>
        </div>
        <div className={styles["search-form"]}>
          <SearchIcon className={styles["search-form--icon"]} />
          <input
            type="text"
            className={styles["search-form--input"]}
            placeholder="Должность или название компании"
            value={searchParam}
            onChange={(e) => {
              setSearchParam(e.target.value);
            }}
            onKeyUp={handleKeyPress}
          />
          <button
            className={styles["search-form--button"]}
            onClick={handleSearch}
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
