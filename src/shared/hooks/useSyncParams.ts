import { useSearchParams } from "react-router";
import { useTypedDispatch } from "./redux";
import {
  setParams,
  setSearch,
  setSkills,
  configureTextParam,
} from "../store/vacanciesSlice";

export const useSyncParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  const setSyncSearchParam = (searchParam: string) => {
    dispatch(setSearch(searchParam));
    dispatch(configureTextParam());

    const newSearchParam = new URLSearchParams(searchParams);

    if (searchParam !== "" && searchParam !== undefined) {
      newSearchParam.set("text", searchParam);
    } else {
      newSearchParam.delete("text");
    }

    setSearchParams(newSearchParam);
  };

  const setSyncCityParam = (cityParam: { area: string; page: number }) => {
    dispatch(setParams(cityParam));
    const { area } = cityParam;

    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("area", area);
    setSearchParams(newSearchParam);
  };

  const setSyncSkillSetParam = (skillsParam: string[]) => {
    dispatch(setSkills(skillsParam));
    dispatch(configureTextParam());

    const newSearchParam = new URLSearchParams(searchParams);

    if (
      skillsParam !== null &&
      skillsParam !== undefined &&
      skillsParam.length > 0
    ) {
      const newSkillsParam = skillsParam.join(",");
      newSearchParam.set("skill_set", newSkillsParam);
    } else {
      newSearchParam.delete("skill_set");
    }

    setSearchParams(newSearchParam);
  };

  return {
    setSyncSearchParam,
    setSyncCityParam,
    setSyncSkillSetParam,
  };
};
