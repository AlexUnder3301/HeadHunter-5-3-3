import { useTypedSelector } from "../../shared/hooks/redux";
import styles from "./style.module.scss";
import { useState } from "react";
import { useSyncParams } from "../../shared/hooks/useSyncParams";
import { useSearchParams } from "react-router";

const SkillSet = () => {
  const { skills } = useTypedSelector((store) => store.vacancies);
  const [skill, setSkill] = useState("");
  const { setSyncSkillSetParam } = useSyncParams();
  const [search] = useSearchParams();
  const skillsUrl = search.get("skill_set");

  const skillsArray = () => {
    if (skillsUrl) {
      return skillsUrl.split(",");
    }
    return skills;
  };

  const handleSkillAdd = () => {
    const newSkills = [...skills, skill];

    setSyncSkillSetParam(newSkills);
  };

  const handleSkillRemove = (skill: string) => {
    const newSkills = skills.filter((item) => item !== skill);

    setSyncSkillSetParam(newSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSkillAdd();
      setSkill("");
    }
  };

  return (
    <div className={styles["skill-set"]}>
      <h3 className={styles["skill-set-heading"]}>Ключевые навыки</h3>
      <div className={styles["input-container"]}>
        <input
          onChange={(e) => {
            setSkill(e.target.value);
          }}
          type="text"
          placeholder="Навык"
          className={styles["input"]}
          value={skill}
          onKeyUp={handleKeyPress}
        />
        <button
          onClick={() => {
            handleSkillAdd();
            setSkill("");
          }}
          className={styles["input-button"]}
        ></button>
      </div>
      <div className={styles["skill-set-container"]}>
        {skillsArray().map((item) => {
          return (
            <span key={item} className={styles["pill"]}>
              {item}
              <span
                onClick={() => {
                  handleSkillRemove(item);
                }}
              >
                X
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSet;
