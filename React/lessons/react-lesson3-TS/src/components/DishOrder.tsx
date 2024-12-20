// Задача: Генератор заказа на обед
// Описание:
// Создайте приложение, в котором пользователь может составить заказ на обед.
// Форма должна включать несколько типов полей: текстовые поля, выпадающий список,
// флажки и радиокнопки. После отправки формы заказ должен отображаться в формате чека.
 
// Требования:
// Поля ввода:
 
// Имя пользователя (текстовое поле)
// Адрес доставки (текстовое поле)
// Комментарии к заказу (textarea)
// Выпадающий список:
 
// Основное блюдо (выбор из списка: "Пицца", "Суши", "Бургер", "Салат")
// Флажки:
 
// Дополнительно (несколько опций, например: "Соус", "Сыр", "Хлеб")
// Радиокнопки:
 
// Тип напитка (выбор одного из вариантов: "Вода", "Чай", "Кофе")
// Кнопка отправки:
 
// Отправить заказ
// Результат: После отправки формы данные должны выводиться в формате чека с перечислением выбранных пунктов.
import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";
 
const Drinks = {
  WATER: "water",
  TEA: "tea",
  COFFEE: "coffee",
};
 
const INITIAL_STATE = {
  name: "",
  address: "",
  comment: "",
  sauce: false,
  cheese: false,
  bread: false,
  food: "",
  drinks: "",
};
 
export const OrderForm = () => {
  const [orderValue, setOrderValue] = useState({ ...INITIAL_STATE });
  const { name, address, comment, sauce, cheese, bread, drinks, food } =
    orderValue;
 
  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
 
    setOrderValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(orderValue);
    let extra;
    if (sauce) {
      extra = "sauce";
    } else if (bread) {
      extra = "bread";
    } else if (cheese) {
      extra = "cheese";
    } else {
      extra = "";
    }
    const orderSummary = `
        Order for: ${name}
        Address: ${address}
        Comment: ${comment}
 
        Main Dish: ${food}
        Extra: ${extra}
        Drink: ${drinks}
    `;
    Swal.fire({
      title: "Your Order Summary",
      text: orderSummary,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };
  return (
    <form action="">
      <input
        type="text"
        name="name"
        placeholder="username"
        value={name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="comment"
        placeholder="commentary"
        value={comment}
        onChange={handleChange}
      />
 
      <select name="food" id="" value={food} onChange={handleChange}>
        <option value="" disabled></option>
        <option value="pizza">Pizza</option>
        <option value="sushi">Sushi</option>
        <option value="burger">Burger</option>
        <option value="salad">Salad</option>
      </select>
 
      <label htmlFor="">
        Sauce
        <input
          type="checkbox"
          name="sauce"
          checked={sauce}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Cheese
        <input
          type="checkbox"
          name="cheese"
          checked={cheese}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Bread
        <input
          type="checkbox"
          name="bread"
          checked={bread}
          onChange={handleChange}
        />
      </label>
 
      <label htmlFor="">
        Drinks
        <label htmlFor="">
          Water
          <input
            type="radio"
            name="drinks"
            value={Drinks.WATER}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Tea
          <input
            type="radio"
            name="drinks"
            value={Drinks.TEA}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Coffee
          <input
            type="radio"
            name="drinks"
            value={Drinks.COFFEE}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>Order</button>
      </label>
    </form>
  );
};