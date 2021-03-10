import React, { useContext } from "react";
import Context from "../../context";

import TodoListItem from "../todo-list-item";

export default function TodoList() {
  const { visibleArr } = useContext(Context);

  const todoListItem = visibleArr.map((el) => {
    return (
      <TodoListItem
        id={el.id}
        key={el.id}
        date={el.date}
        done={el.done}
        label={el.label}
        important={el.important}
      />
    );
  });
  const NoTodo = <div className="NoTodo"> No Todo :) </div>;
  return (
    <div className="TodoList">{todoListItem == 0 ? NoTodo : todoListItem}</div>
  );
}
