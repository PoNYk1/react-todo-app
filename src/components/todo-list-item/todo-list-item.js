import React, { useState, useContext, useEffect } from 'react'

import Context from '../../context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


export default function TodoListItem ({id, important, done, label, date}) {
  const [btnArr, setBtnArr] = useState ([
    {action:'important', icon: <FontAwesomeIcon icon={faBolt} />,     isActive:false },
    {action:'done',      icon: <FontAwesomeIcon icon={faCheck} />,    isActive:false },
    {action:'delete',    icon: <FontAwesomeIcon icon={faTrashAlt} />}
  ])
  const { updateTodoList } = useContext (Context)

  const todoAction = (action) => { // срабатывает при клике и передает в глобальный стейт
    const newArr = btnArr.map (el => {
      if (action == el.action) {
        updateTodoList (id, action)
        return {
          ...el,
          isActive: !el.isActive
        }
      } else return el
    })

    setBtnArr (newArr)
  }

  useEffect (()=> { // Нужно для того что бы расставить классы при перезагрузке
    setBtnArr (btnArr.map (el => {
      if (important && el.action == 'important') {
        return {
          ...el,
          isActive: true
        }
      } else if (done && el.action == 'done') {
        return {
          ...el,
          isActive: true
        }
      } else return el
    }))
  },[])

  const btn = btnArr.map ((el, index) => {
    const classs = el.isActive && el.action != 'delete' ? 'activeButton' : null
    if (done && el.action == 'important') {
      el.isActive = false
      return false
    }
    return (
      <Buttons 
        label={el.icon} 
        key={index}
        classs={classs}
        action={el.action}
        todoAction={todoAction} />
    )
  })

  return (
    <div className={`TodoListItem ${done ? 'doneTodo' : null}`} key={id}>
      <div className='TodoListItemTop'>
        <div className='TodoListItemDate'>
          {date}
        </div>
        <div className='TodoListItemBtn'>
          {btn}
        </div>
      </div>
      
      <div 
        className={`TodoListItemLine ${ important ? 'importantLine' : '' }`
      }></div>
      <div className='content'>
        {label}
      </div> 
    </div>
  )
}

function Buttons ({ label, classs, todoAction, action }) {
  const classss = action == 'delete' ? `delBtn ${classs}` : classs
  return (
    <div 
      className={classss}
      onClick={() => todoAction(action)}>
      { label }
    </div>
  )
}