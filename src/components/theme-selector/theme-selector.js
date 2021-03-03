import React, {useContext, setState, useState} from 'react'

import Context from '../../context'

export default function ThemeSelector () {
  const {setGlobalClass} = useContext (Context)
  const [showMenu, setShowMenu] = useState (false)

  const themeArr = ['darkModel', 'lightModel']
    .map (el => {
      return (
        <div 
          onClick={() => {
            setGlobalClass(el) 
            setShowMenu (false)
          }} className='Theme'>
          {el}
        </div>
      )
    })
  return (
    <div className='ThemeSelector'>
      <div className='ThemeSelectorThemeArr'>
        {showMenu ? themeArr : null}
      </div>
      <div 
        className='ThemeSelectorBtn'
        onClick={() =>setShowMenu(!showMenu)}></div>
    </div>
  )
}