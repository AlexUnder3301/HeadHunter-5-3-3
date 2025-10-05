import "./App.css";
import VacanciesPage from "../pages/VacanciesPage/VacanciesPage";
import VacancyPage from "../pages/VacancyPage/VacancyPage";
import { Routes, Route, Navigate } from "react-router";
import Layout from "./Layout";
import NotFoundPage from "../pages/NotFoundPage/NotToundPage";
import AboutPage from "../pages/AboutPage/AboutPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={"/vacancies/moscow"} />}></Route>
          <Route path="vacancies/:city" element={<VacanciesPage />} />
          <Route path="vacancies/:city/:id" element={<VacancyPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
