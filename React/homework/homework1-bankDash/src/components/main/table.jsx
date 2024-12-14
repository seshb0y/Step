import React from 'react'
import style from "./table.module.css"
import TableElements from './table.elements';
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const tableData = [
    {
        id: 1,

        Description: <p ><IoArrowUpCircleOutline className={style.pointer}/> Spotify Subscription</p>,
        TransactionID: "#12548796",
        Type: "Shopping",
        Card: "1234 ****",
        Date: "28 Jan, 12.30 AM",
        Amount: <p className={style.redAmount}>-$2,500</p>,
        Receipt: <button className={style.downloadButton}>Download</button>
    },
    {
        id: 2,
        Description: <p><IoArrowDownCircleOutline className={style.pointer}/> Freepik Sales</p>,
        TransactionID: "#12548796",
        Type: "Transfer",
        Card: "1234 ****",
        Date: "25 Jan, 10.40 PM",
        Amount: <p className={style.greenAmount}>+$750</p>,
        Receipt: <button className={style.downloadButton}>Download</button>
    },
    {
        id: 3, 
        Description: <p><IoArrowUpCircleOutline className={style.pointer}/> Mobile Service</p>,
        TransactionID: "#12548796",
        Type: "Service",
        Card: "1234 ****",
        Date: "20 Jan, 10.40 PM",
        Amount: <p className={style.redAmount}>-$150</p>,
        Receipt: <button className={style.downloadButton}>Download</button>
    },
    {
        id: 4,
        Description: <p><IoArrowUpCircleOutline className={style.pointer}/> Wilson</p> ,
        TransactionID: "#12548796",
        Type: "Transfer",
        Card: "1234 ****",
        Date: "15 Jan, 03.29 PM",
        Amount: <p className={style.redAmount}>-$1,500</p>,
        Receipt: <button className={style.downloadButton}>Download</button>
    },
    {
        id: 5,
        Description: <p><IoArrowDownCircleOutline className={style.pointer}/> Emilly</p>,
        TransactionID: "#12548796",
        Type: "Transfer",
        Card: "1234 ****",
        Date: "14 Jan, 10.40 PM",
        Amount: <p className={style.greenAmount}>+$840</p>,
        Receipt: <button className={style.downloadButton}>Download</button>
    },
    
]

const Table = () => {
  return (
    <div className={style.tableContainer}>
        <table>
            <thead className={style.thread}>
                <tr>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Card</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Receipt</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((element) => {
                    return <TableElements key = {element.id} element = {element}/>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Table