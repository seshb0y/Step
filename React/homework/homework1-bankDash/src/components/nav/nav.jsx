import React from "react";
import Elements from "./elements";
import style from "./nav.module.css"
import { FaHome } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";




const elements = [
    {
        id: 1,
        img: <FaHome />,
        title: "Dashboard",
    },
    {
        id: 2,
        img: <FaMoneyBillTransfer />,
        title: "Transactions",
    },
    {
        id: 3,
        img: <FaUser />,
        title: "Accounts",
    },
    {
        id: 3,
        img: <FaSackDollar />,
        title: "Investments",
    },
    {
        id: 4,
        img: <CiCreditCard1 />,
        title: "Credit Cards",
    },
    {
        id: 5,
        img: <FaSackDollar />,
        title: "Loans",
    },
    {
        id: 6,
        img: <FaHandHoldingDollar />,
        title: "Services",
    },
    {
        id: 7,
        img: <MdOutlineMiscellaneousServices />,
        title: "My Privileges",
    },
    {
        id: 8,
        img: <FaRegLightbulb />,
        title: "Setting",
    },
    {
        id: 9,
        img: <MdOutlineMiscellaneousServices />,
        title: "Setting",
    },

]

const Nav = () => {
  return <div className={style.container}>
    <div>
        <div className={style.bankDash}>
            <h1>{<FaRegCreditCard />}</h1>
            <h1>BankDash.</h1>
        </div>
        <ul className={style.ul}>    
            {elements.map((element) => {
                console.log(element);
                return <Elements key = {element.id} element = {element} />
            })}
        </ul>
    </div>
  </div>;
};

export default Nav;
