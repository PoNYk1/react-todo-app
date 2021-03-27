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
    "darkModel",
    "lightModel",
    "test",
    "test",
    "test",
    "test",
  ].map((theme, index) => {
    delay += 70;

    return (
      <CSSTransition
        classNames="ShowThemeBtn"
        timeout={200 + delay}
        key={index}
      >
        <div
          onClick={() => {
            setGlobalClass(theme);
            setMenuState(false);
            localStorage.setItem("theme", theme);
          }}
          className="Theme"
        >
          {theme}
        </div>
      </CSSTransition>
    );
  });

  return (
    <div className="ThemeSelector">
      <div className="ThemeSelectorThemeArr">
        <TransitionGroup>{menuState && themeArr}</TransitionGroup>
      </div>
      <div
        className="ThemeSelectorBtn"
        onClick={(e) => {
          setMenuState(!menuState);
        }}
      ></div>
    </div>
  );
}
