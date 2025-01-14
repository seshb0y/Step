import { AnyAction, configureStore } from "@reduxjs/toolkit";
import {
  SHOPPING_ADD_PRODUCT,
  SHOPPING_CALCULATE_TOTAL,
  SHOPPING_CHANGE_AMOUNT,
  SHOPPING_DELETE_PRODUCT,
  SHOPPING_ADD_TO_BASKET as SHOPPING_ADD_TO_BASKET,
  SHOPPING_USE_DISCOUNT,
  SHOPPING_DELETE_FROM_BASKET,
  SHOPPING_UPDATE_BASKET,
} from "./constants";
// import { act } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  describe: string;
  status: boolean;
  amount: number;
};

export type AppState = {
  showCase: Product[];
  basket: Product[];
  totalPrice: number;
  discountPrice: number;
};

const loadStateFromLocalStorage = () => {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
    return undefined;
    }
    return JSON.parse(serializedState);
  };
  
  const saveStateToLocalStorage = (state: AppState) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  };

const initialState: AppState = loadStateFromLocalStorage() || {
  showCase: [
    {
      id: 1,
      name: "tomato",
      price: 10,
      category: "vegetables",
      describe: "good and tasty tomato",
      status: false,
      amount: 123,
    },
    {
      id: 2,
      name: "TV",
      price: 55,
      category: "electronics",
      describe: "smart TV",
      status: false,
      amount: 5,
    },
    {
      id: 3,
      name: "Coca-Cola",
      price: 8,
      category: "soda",
      describe: "good and tasty soda",
      status: false,
      amount: 126,
    },
    {
      id: 4,
      name: "Pizza",
      price: 15,
      category: "frozen product",
      describe: "frozen pizza",
      status: false,
      amount: 125,
    },
    {
      id: 5,
      name: "Nvidia GeForce 5090",
      price: 500,
      category: "computer components",
      describe: "good video card",
      status: false,
      amount: 262,
    },
  ],
  basket: [],
  totalPrice: 0,
  discountPrice: 0,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SHOPPING_ADD_PRODUCT:
      return {
        ...state,
        showCase: [...state.showCase, action.payload],
      };
    case SHOPPING_ADD_TO_BASKET: {
      const productToMove = state.showCase.find(
        (product) => product.id === action.payload.id
      );
      const productInBasket = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!productToMove) return state;
      return {
        ...state,
        showCase: state.showCase.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
        basket: productInBasket
          ? state.basket.map((product) =>
              product.id === action.payload.id
                ? { ...product, amount: product.amount + 1 }
                : product
            )
          : [...state.basket, { ...productToMove, amount: 1 }],
        // totalPrice: state.basket.reduce(
        //     (acc, product) => acc + product.price * product.amount,
        //     productToMove.price
        // )
      };
    }
    case SHOPPING_CHANGE_AMOUNT: {
      const productToChangeInShowCase = state.showCase.find(
        (product) => product.id === action.payload.id
      );
      const productToChangeInBasket = state.basket.find(
        (product) => product.id === action.payload.id
      );

      if (!productToChangeInBasket || !productToChangeInShowCase) return state;

      return {
        ...state,
        basket: state.basket.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                amount: action.payload.isIncrease
                  ? product.amount + 1
                  : product.amount - 1,
              }
            : product
        ),
        showCase: state.showCase.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                amount: action.payload.isIncrease
                  ? product.amount - 1
                  : product.amount + 1,
              }
            : product
        ),
        // totalPrice: state.basket.reduce(
        //     (accumulator, product) => accumulator + product.price * product.amount,
        //     0
        // ),
      };
    }
    case SHOPPING_USE_DISCOUNT: {
      const discountValue = action.payload.value;
      return {
        ...state,
        discountPrice:
          state.totalPrice - (state.totalPrice * discountValue) / 100,
      };
    }
    case SHOPPING_DELETE_PRODUCT:
      return {
        ...state,
        showCase: state.showCase.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case SHOPPING_CALCULATE_TOTAL: {
      const withoutTax = state.basket.reduce(
        (accumulator, product) => accumulator + product.price * product.amount,
        0
      );
      return {
        ...state,
        totalPrice: withoutTax + withoutTax * 0.1,
      };
    }
    case SHOPPING_DELETE_FROM_BASKET: {
      const selectedProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!selectedProduct) return state;
      const amountInBasket = selectedProduct?.amount;
      return {
        ...state,
        basket: state.basket.filter(
          (product) => product.id !== selectedProduct?.id
        ),
        showCase: state.showCase.map((product) =>
          product.id === selectedProduct?.id
            ? {
                ...product,
                amount: product.amount + amountInBasket,
              }
            : product
        ),
      };
    }
    case SHOPPING_UPDATE_BASKET:
      return {
        ...state,
        basket: action.payload.updatedBasket,
      };
    default:
      break;
  }
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
    saveStateToLocalStorage(store.getState())
})
