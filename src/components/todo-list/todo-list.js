import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Context from "../../context";

import TodoListItem from "../todo-list-item";

export default function TodoList() {
  const { visibleArr } = useContext(Context);

  let delay = 0;

  const todoListItem = visibleArr.map((el) => {
    const { id, date, label, done, important } = el;
    delay += 70;
    return (
      <CSSTransition classNames="ShowNewTodo" timeout={300} key={id}>
        <TodoListItem
          delay={delay}
          id={id}
          key={id}
          date={date}
          done={done}
          label={label}
          important={important}
        />
      </CSSTransition>
    );
  });

  const NoTodo = <div className="NoTodo"> No Todo :) </div>;

  return (
    <div className="TodoList">
      <TransitionGroup>{todoListItem}</TransitionGroup>
      {todoListItem.length == 0 && NoTodo}
    </div>
  );
}
