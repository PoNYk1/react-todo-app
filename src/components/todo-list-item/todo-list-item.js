import React, { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import Context from "../../context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheck,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default function TodoListItem({
  id,
  important,
  done,
  label,
  date,
  delay,
}) {
  const [btnArr, setBtnArr] = useState([
    {
      action: "important",
      icon: <FontAwesomeIcon icon={faBolt} />,
      isActive: important,
    },
    {
      action: "done",
      icon: <FontAwesomeIcon icon={faCheck} />,
      isActive: done,
    },
    {
      action: "delete",
      icon: <FontAwesomeIcon icon={faTrashAlt} />,
      isActive: false,
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [modalDelActive, setModalDelActive] = useState(false);
  const { updateTodoList, updateTodoLabel, globalClickState } = useContext(
    Context
  );

  useEffect(() => {
    setModalDelActive(false);
    updateDelBtn(false);
  }, [globalClickState]);

  const updateDelBtn = (bool) => {
    const newArr = btnArr.map((el) => {
      return el.action == "delete"
        ? {
            ...el,
            isActive: bool,
          }
        : el;
    });
    setBtnArr(newArr);
  };

  const todoAction = (action) => {
    // срабатывает при клике и передает в глобальный стейт
    if (action == "delete") {
      setModalDelActive(true);
      updateDelBtn(true);
    } else {
      const newArr = btnArr.map((el) => {
        if (action == el.action) {
          updateTodoList(id, action);
          return {
            ...el,
            isActive: !el.isActive,
          };
        } else return el;
      });
      action == "done" && setEditMode(false);
      setBtnArr(newArr);
    }
  };

  const btn = btnArr.map((el, index) => {
    const classs =
      el.action == "delete" && el.isActive
        ? "active-button-del"
        : el.isActive && "active-button";

    if (done && el.action == "important") {
      el.isActive = false;
      return false;
    }
    return (
      <Buttons
        label={el.icon}
        key={index}
        classs={classs}
        action={el.action}
        todoAction={todoAction}
      />
    );
  });

  const [newLabelBuffer, setNewLabelBuffer] = useState(label);
  const rows = newLabelBuffer.split("\n").length;

  const updateLabel = () => {
    editMode && updateTodoLabel(id, newLabelBuffer);
    setEditMode(!editMode);
    const test = newLabelBuffer.split("\n");
    console.log(test);
  };

  return (
    <div
      className={`todo-list-item ${done ? "done-todo" : ""}`}
      key={id}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CSSTransition
        classNames="show-modal"
        timeout={200}
        in={modalDelActive}
        unmountOnExit
      >
        <ToDoModalDel
          delToDo={(e) => {
            updateTodoList(id, e);
            setModalDelActive(false);
          }}
        />
      </CSSTransition>

      <div className="todo-list-item-top">
        <div className="todo-list-item-date">{date}</div>
        <div className="todo-list-item-btn">{btn}</div>
      </div>

      <div
        className={`todo-list-item-line ${important ? "important-line" : ""}`}
      ></div>
      <div className="content">
        {!done && (
          <div className={`edit-mode ${editMode ? "edit-mode-active" : ""}`}>
            <FontAwesomeIcon icon={faEdit} onClick={() => updateLabel()} />
          </div>
        )}
        <textarea
          disabled={!editMode}
          onInput={({ target }) => setNewLabelBuffer(target.value)}
          rows={rows}
          value={newLabelBuffer}
        >
          {label}
        </textarea>
      </div>
    </div>
  );
}

function Buttons({ label, classs, todoAction, action }) {
  const classss = action == "delete" ? `del-btn ${classs}` : classs;
  return (
    <div className={classss} onClick={() => todoAction(action)}>
      {label}
    </div>
  );
}

function ToDoModalDel({ closeModal, delToDo }) {
  return (
    <div className="todo-modal-del">
      Are you sure?
      <div onClick={() => delToDo("delete")}>Yes</div>
    </div>
  );
}
