import React, { useEffect, useState } from "react";
import Navbar from "./components/vacancies/nav/Navbar.jsx";
// import { useLocation } from "react-router";
import "./App.css";

// TODO: - make .applied_field conditional

// _ SIDEQUEST: update list when user scrolls

function ShortVacancy({ title, description }) {
  return (
    <div className="short_vacancy">
      <div className="short_vacancy__header">
        <div>{title}</div>
        <div className="applied_field">Applied</div>
      </div>
      <div>{description}</div>
      <div className="buttonFlex">
        <button className="apply_button">Apply</button>
      </div>
    </div>
  );
}

export default function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5173/api/vacancies").then((res) => res.json()).then(
      (res) => {
        console.log(res);
        setList(res);
      },
    );
  }, []);
  return (
    <>
      <div className="app">
        <Navbar />
        <main className="vacancy_list">
          {list.map((item) => {
            return (
              <ShortVacancy
                key={item.id}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
