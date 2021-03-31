import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import Context from "../../context";

export default function NewTodoInput() {
  const [inputValue, setInputValue] = useState("");
  const { newTodo } = useContext(Context);

  const [btnClass, setBtnClass] = useState("");
  const rows = inputValue.split("\n").length;

  const addNewTodo = (e) => {
    if (inputValue.trim()) {
      newTodo(inputValue);
    }
    setInputValue("");
  };

  const textareaEnterSubmit = (e) => {
    // Enter для добавление ToDo, Shift + Enter для то что-бы перейти на новую строку
    if (e.key == "Enter" && e.shiftKey) return false;
    else if (e.key == "Enter") {
      e.preventDefault();
      addNewTodo();
    }
  };

  return (
    <form onSubmit={addNewTodo} className="new-todo-input">
      <textarea
        className="text-input"
        placeholder="Add new ToDo!"
        onChange={({ target }) => setInputValue(target.value)}
        onKeyDown={textareaEnterSubmit}
        value={inputValue}
        rows={rows}
      ></textarea>
      <div
        className={`submit-button ${btnClass}`}
        onMouseDown={() => setBtnClass("activeButton")}
        onMouseUp={() => setBtnClass("")}
        onClick={addNewTodo}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
    </form>
  );
}
