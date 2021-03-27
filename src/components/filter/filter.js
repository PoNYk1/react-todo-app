import React, { useState, useEffect, useContext } from "react";
import Context from "../../context";

export default function () {
  const { setFilterState, filterState, todoArr } = useContext(Context);
  const { showUnmarked, showImportant, showDone } = filterState;
  const [btnArr, setBtnArr] = useState([
    { label: "unmark", isActive: showUnmarked },
    { label: "important", isActive: showImportant },
    { label: "done", isActive: showDone },
  ]);

  const setFilter = (label) => {
    // Обновляет состояние кнопок и отправляет в глобальный стейт
    const newArr = btnArr.map((el) => {
      if (el.label == label) {
        const { showUnmarked, showImportant, showDone } = filterState;
        setFilterState({
          showUnmarked: el.label == "unmark" ? !el.isActive : showUnmarked,
          showImportant: el.label == "important" ? !el.isActive : showImportant,
          showDone: el.label == "done" ? !el.isActive : showDone,
        });
        return {
          label: el.label,
          isActive: !el.isActive,
        };
      } else return el;
    });
    setBtnArr(newArr);
  };

  const elements = btnArr.map((item, index) => {
    const classs = item.isActive && "activeButton";

    return (
      <FilterBtn
        key={index}
        label={item.label}
        classs={classs}
        setFilter={setFilter}
      />
    );
  });

  const todoInfo = () => {
    const info = {
      important: 0,
      done: 0,
      all: todoArr.length,
    };
    todoArr.forEach((item) => {
      if (item.important && item.done) {
        ++info.important;
        ++info.done;
      } else if (item.important) ++info.important;
      else if (item.done) ++info.done;
    });

    return (
      <>
        a: <span> {info.all} </span>
        i: <span> {info.important} </span>
        d: <span> {info.done} </span>
      </>
    );
  };

  return (
    <div className="Filter">
      <div className="FilterInfo">{todoInfo()}</div>
      <div className="FilterBtn">{elements}</div>
    </div>
  );
}

function FilterBtn({ label, classs, setFilter }) {
  return (
    <div className={classs} onClick={() => setFilter(label)}>
      {label}
    </div>
  );
}
