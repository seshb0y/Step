import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import {
  calculateTotal,
  changeAmount,
  deleteFromBasket,
  updateBasket,
  useDiscount,
} from "../redux/action";
import styles from "./styles.module.css";

const BasketList = () => {
  const [input, setInput] = useState("");
  const [ship, setShip] = useState(0);

  const [coupon, setCoupon] = useState({
    DISCOUNT10: true,
    BUY2GET1: true,
    FREESHIP: true,
  });

  const basket = useSelector((state: AppState) => state.basket);
  const totalPrice = useSelector((state: AppState) => state.totalPrice);
  const discountPrice = useSelector((state: AppState) => state.discountPrice);
  const dispatch = useDispatch();

  const handleChangeAmount = (id: number, isIncrease: boolean) => {
    dispatch(changeAmount({ id, isIncrease }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const calculate = () => {
    dispatch(calculateTotal());
  };

  const calculateShip = () => {
    setShip((totalPrice / 100) * 5);
  };

  useEffect(() => {
    calculate();
    if (coupon.FREESHIP) {
      calculateShip();
    }
  }, [basket]);

  const handleDeleteFromBasket = (id: number) => {
    dispatch(deleteFromBasket({ id }));
  };

  const handleUseCoupon = (e: FormEvent) => {
    e.preventDefault();
    let discount = 0;
    switch (input) {
      case "DISCOUNT10":
        if (coupon.DISCOUNT10) {
          discount = 10;
          setCoupon((prev) => ({ ...prev, DISCOUNT10: false }));
        }
        break;
      case "BUY2GET1":
        if (basket.length >= 3) {
          if (coupon.BUY2GET1) {
            const updatedBasket = basket.map((product, index) =>
              index === 2 ? { ...product, price: product.price / 2 } : product
            );
            setCoupon((prev) => ({ ...prev, BUY2GET1: false }));
            dispatch(updateBasket({ updatedBasket }));
          }
        }
        break;
      case "FREESHIP":
        if (coupon.FREESHIP) {
          setCoupon((prev) => ({ ...prev, FREESHIP: false }));
          setShip(0);
        }
        break;
      default:
        break;
    }

    if (discount > 0 && discount <= 100) {
      dispatch(useDiscount({ value: discount }));
    }
    setInput("");
  };

  return (
    <div className={styles.container}>
      <ul>
        {basket
          .filter((product) => product.amount >= 1)
          .map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}$</p>
              <div>
                <p>{product.category}</p>
                <p>{product.describe}</p>
                <p>Amount: {product.amount}</p>
              </div>
              <button onClick={() => handleChangeAmount(product.id, true)}>
                +
              </button>
              <button onClick={() => handleChangeAmount(product.id, false)}>
                -
              </button>
              <button onClick={() => handleDeleteFromBasket(product.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
      <div className={styles.basketSummary}>
        <h1>Ship price: {ship}$</h1>
        <h1>
          Total price:{" "}
          {discountPrice > 0
            ? discountPrice
            : totalPrice + (ship > 0 ? ship : 0)}
          $
        </h1>
        <p>Tax 10$</p>
        <form onSubmit={handleUseCoupon}>
          <input
            type="text"
            placeholder="sale coupon"
            value={input}
            onChange={handleChange}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default BasketList;
