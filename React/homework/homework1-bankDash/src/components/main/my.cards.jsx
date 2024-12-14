import React from 'react'
import { FcSimCardChip } from "react-icons/fc";
import style from "./my.cards.module.css"
import Table from './table';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const MyCards = () => {
  return (
<div>
    <div className={style.mainContainer}>
        <div className={style.myCards}>
            <h2>My Cards</h2>
            <button className={style.addCard}>+ Add Card</button>
        </div>

        <div className={style.twoCards}>
            <div className={style.container}>
                <div className={style.cardData}>
                    <div>
                        <p>Balance</p>
                        <h3>$5,756</h3>
                    </div>
                    <h1 className={style.cardChip}><FcSimCardChip/></h1 >
                </div>
                <div className={style.cardHolder}>
                    <div>
                        <p className={style.cardDataText}>CARD HOLDER</p>
                        <p>Eddy Cusuma</p>
                    </div>
                    <div>
                        <p className={style.cardDataText}>VALID THRU</p>
                        <p>12/22</p>
                    </div>
                </div>
                
            </div>
            <div className={style.cardNumber}>
                <h2 className={style.numbers}>3778 **** **** 1234</h2>
                <div className={style.circle + ' ' + style.left}></div>
                <div className={style.circle + ' ' + style.right}></div>
            </div>

            <div className={style.secondCard}>
                <div className={style.cardData}>
                    <div>
                        <p>Balance</p>
                        <h3>$5,756</h3>
                    </div>
                    <h1 className={style.cardChip}><FcSimCardChip/></h1 >
                </div>
                <div className={style.cardHolder}>
                    <div>
                        <p className={style.cardDataText}>CARD HOLDER</p>
                        <p>Eddy Cusuma</p>
                    </div>
                    <div>
                        <p className={style.cardDataText}>VALID THRU</p>
                        <p>12/22</p>
                    </div>
                </div>
                
            </div>
            <div className={style.secondNumber}>
                <h2 className={style.numbers}>3778 **** **** 1234</h2>
                <div className={style.secondCircle + ' ' + style.left}></div>
                <div className={style.secondCircle + ' ' + style.right}></div>
            </div>
            <div className={style.expense}>
                <h2 className={style.expenseHeader}>My Expense</h2>
                <div className={style.expenseContainer}>
                    <div>
                        <div className={style.augDiv}></div>
                        <p>Aug</p>
                    </div>
                    <div>
                        <div className={style.sepDiv}></div>
                        <p>Sep</p>
                    </div>
                    <div>
                        <div className={style.octDiv}></div>
                        <p>Oct</p>
                    </div>
                    <div>
                        <div className={style.novDiv}></div>
                        <p>Nov</p>
                    </div>
                    <div>
                        <p className={style.decPrice}>$12,500</p>
                        <div className={style.decDiv}></div>
                        <p>Dec</p>
                    </div>
                    <div>
                        <div className={style.janDiv}></div>
                        <p>Jan</p>
                    </div>
                </div>
            </div>
        </div>

        <h3 className={style.recentTransactions}>Recent Transactions</h3>

        <div className={style.transactionsMenuContainer}>
            <div className={style.transactionsItem}>
                <h4>All Transactions</h4>
            </div>
            <div className={style.transactionsItem}>
                <h4>Income</h4>
            </div>
            <div className={style.transactionsItem}>
                <h4>Expense</h4>
            </div>
        </div>
        <Table/>

        <div className={style.pageCheck}>
            <MdKeyboardArrowLeft/>
            <div className={style.pageCheckButtons}>
                <button>Previous</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>Next</button>
            </div>
            <MdKeyboardArrowRight/>
        </div>
    </div>

</div>

  )
}

export default MyCards