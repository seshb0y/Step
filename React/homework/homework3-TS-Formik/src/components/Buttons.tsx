import React from 'react'
import style from './Form.module.css'

const Buttons = () => {
  return (
    <div className={style.buttonsContainer}>
        <button className={style.cancel}>Cancel</button>
        <button className={style.next}>Next</button>
    </div>
  )
}

export default Buttons