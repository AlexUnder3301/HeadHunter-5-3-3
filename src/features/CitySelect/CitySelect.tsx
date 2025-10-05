import styles from "./style.module.scss";
import LocationIcon from "../../shared/assets/location-icon.svg?react";
import { useSyncParams } from "../../shared/hooks/useSyncParams";
import { useSearchParams } from "react-router";

const CitySelect = () => {
  const [search] = useSearchParams();
  const cityUrl = search.get("area");
  const { setSyncCityParam } = useSyncParams();

  return (
    <div className={styles["select-container"]}>
      <LocationIcon className={styles["location-icon"]} />
      <select
        name="Выбор города"
        id=""
        onChange={(e) => {
          setSyncCityParam({ area: e.target.value, page: 0 });
        }}
        className={styles["custom-select"]}
        value={cityUrl ? cityUrl : 113}
      >
        <option value="113">Все города</option>
        <option value="1">Москва</option>
        <option value="2">Санкт-Петербург</option>
      </select>
    </div>
  );
};

export default CitySelect;
