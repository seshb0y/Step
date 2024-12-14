import React from 'react'
import style from "./table.module.css"

const TableElements = (props) => {
  return (
    <tr className={style.tr}>
        <td>{props.element.Description}</td>
        <td>{props.element.TransactionID}</td>
        <td>{props.element.Type}</td>
        <td>{props.element.Card}</td>
        <td>{props.element.Date}</td>
        <td>{props.element.Amount}</td>
        <td>{props.element.Receipt}</td>
    </tr>
  )
}

export default TableElements