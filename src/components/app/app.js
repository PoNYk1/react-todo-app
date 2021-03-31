import React, { useState, useEffect } from "react";
import Context from "../../context";

import ThemeSelector from "../theme-selector";
import NewTodoInput from "../new-todo-input";
import TodoList from "../todo-list";
import Filter from "../filter";

export default function App() {
  const [globalClass, setGlobalClass] = useState(
    localStorage.getItem("theme") || "dark-model"
  );

  const [counter, setCounter] = useState(
    JSON.parse(localStorage.getItem("counter")) || 0
  );
  const [todoArr, setTodoArr] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [filterState, setFilterState] = useState({
    showUnmarked: true,
    showImportant: true,
    showDone: false,
  });
  const [globalClickState, setGlobalClickState] = useState(null);

  useEffect(() => {
    // Обновление в localStorage
    localStorage.setItem("todos", JSON.stringify(todoArr));
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [todoArr]);

  useEffect(() => {
    document.addEventListener("click", globalClick);
    return () => {
      document.removeEventListener("click", globalClick);
    };
  }, []);

  const globalClick = (e) => {
    setGlobalClickState(e.target);
  };

  const updateTodoList = (id, action) => {
    // Удаление и пометка для выполненых и важных задач
    if (action == "delete") {
      const newArr = todoArr.filter((el) => el.id != id);
      setTodoArr(newArr);
    } else {
      const newArr = todoArr.map((el) => {
        if (id == el.id) {
          switch (action) {
            case "important":
              return {
                ...el,
                important: !el.important,
              };
            case "done":
              return {
                ...el,
                important: false,
                done: !el.done,
              };
          }
        } else return el;
      });
      setTodoArr(newArr);
    }
  };

  const updateTodoLabel = (id, newLabel) => {
    const newArr = todoArr.map((el) => {
      if (id == el.id) {
        return {
          ...el,
          label: newLabel,
        };
      } else return el;
    });

    setTodoArr(newArr);
  };

  const newTodo = (label) => {
    // Добавляет новое Todo
    setCounter(counter + 1);
    const date = new Date();
    setTodoArr([
      {
        id: counter,
        date: date.toLocaleString(),
        label: label,
        important: false,
        done: false,
      },
      ...todoArr,
    ]);
  };

  const visibleArr = todoArr
    .map((el) => {
      // Фильтр ToDo
      const { showUnmarked, showImportant, showDone } = filterState;

      if ((showImportant && el.important) || (showDone && el.done)) return el;
      else if (showUnmarked && !el.important && !el.done) return el;
    })
    .filter((el) => el != null);

  const globalContext = {
    newTodo, // NewTodoInput
    todoArr, // Filter
    visibleArr, // TodoList
    setFilterState, // Filter
    filterState, // Filter
    updateTodoList, // TodoListItem
    updateTodoLabel, // TodoListItem
    setGlobalClass, // ThemeSelector
    globalClickState, // ThemeSelector, TodoListItem
  };

  return (
    <Context.Provider value={globalContext}>
      <div className="container" onMouseDown={(e) => globalClick(e)}>
        <div className={`app ${globalClass} `}>
          <div className={`background`}></div>
          <ThemeSelector />
          <NewTodoInput />
          <Filter />
          <TodoList />
        </div>
      </div>
    </Context.Provider>
  );
}
