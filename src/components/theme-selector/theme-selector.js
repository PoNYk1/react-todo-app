import React, { useContext, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Context from "../../context";

export default function ThemeSelector() {
  const { setGlobalClass, globalClickState } = useContext(Context);
  const [menuState, setMenuState] = useState(false);

  let delay = 0;

  useEffect(() => {
    setMenuState(false);
  }, [globalClickState]);

  const themeArr = [
    "dark-model",
    "light-model",
    "test",
    "test",
    "test",
    "test",
  ].map((theme, index) => {
    delay += 70;

    return (
      <CSSTransition
        classNames="show-theme-btn"
        timeout={200 + delay}
        key={index}
      >
        <div
          onClick={() => {
            setGlobalClass(theme);
            setMenuState(false);
            localStorage.setItem("theme", theme);
          }}
          className="theme"
        >
          {theme}
        </div>
      </CSSTransition>
    );
  });

  return (
    <div className="theme-selector">
      <div className="theme-selector-theme-arr">
        <TransitionGroup>{menuState && themeArr}</TransitionGroup>
      </div>
      <div
        className="theme-selector-btn"
        onClick={(e) => {
          setMenuState(!menuState);
        }}
      ></div>
    </div>
  );
}
