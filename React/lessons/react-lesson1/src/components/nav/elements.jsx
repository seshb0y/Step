import React from 'react'
import style from "./nav.module.css"

const Elements = (props) => {
  return (
    <li className={style.list}>
        <p>{props.element.img}</p>
        <p>{props.element.title}</p>
    </li>
  )
}

export default Elements