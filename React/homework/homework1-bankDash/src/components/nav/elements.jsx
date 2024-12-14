import React from 'react'
import style from "./nav.module.css"

const Elements = (props) => {
  return (
    <li className={style.list}>
      <div className={style.sideBar}>
        <button className={style.button}>
          <p>{props.element.img}</p>
          <h3>{props.element.title}</h3>
        </button>
      </div>
        
        
        {/* <button className={style.button}>{props.element.title}</button> */}
    </li>
  )
}

export default Elements