import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import Context from "../../context";

export default function NewTodoInput() {
  const [inputValue, setInputValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(50);
  const { newTodo } = useContext(Context);

  const [btnClass, setBtnClass] = useState("");

  const addNewTodo = (e) => {
    if (inputValue.trim()) {
      newTodo(inputValue);
    }
    setInputValue("");
  };

  const textareaUpdate = ({ target }) => {
    setInputValue(target.value);
    setTextareaHeight(target.scrollHeight);
  };

  useEffect(() => {
    // Если в TextArea нет текста он становится нормального размера
    if (!inputValue.trim()) {
      setTextareaHeight(50);
    }
  }, [inputValue]);

  const textareaEnterSubmit = (e) => {
    // Enter для добавление ToDo, Shift + Enter для то что-бы перейти на новую строку
    if (e.key == "Enter" && e.shiftKey) return false;
    else if (e.key == "Enter") {
      e.preventDefault();
      addNewTodo();
    }
  };

  return (
    <form onSubmit={addNewTodo} className="NewTodoInput">
      <textarea
        className="textInput"
        placeholder="Add new ToDo!"
        onChange={(e) => textareaUpdate(e)}
        onKeyDown={textareaEnterSubmit}
        value={inputValue}
        style={{ height: `${textareaHeight}px` }}
      ></textarea>
      <div
        className={`submitButton ${btnClass}`}
        onMouseDown={() => setBtnClass("activeButton")}
        onMouseUp={() => setBtnClass("")}
        onClick={addNewTodo}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
    </form>
  );
}
