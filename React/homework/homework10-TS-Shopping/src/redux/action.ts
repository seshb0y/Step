import { createAction } from "@reduxjs/toolkit";
import { SHOPPING_ADD_PRODUCT, SHOPPING_CALCULATE_TOTAL, SHOPPING_CHANGE_AMOUNT, SHOPPING_DELETE_PRODUCT, SHOPPING_ADD_TO_BASKET as SHOPPING_ADD_TO_BASKET, SHOPPING_USE_DISCOUNT, SHOPPING_DELETE_FROM_BASKET, SHOPPING_UPDATE_BASKET } from "./constants";

type AddProductPayload = {
    id: number;
    name: string;
    price: number;
    category: string;
    describe: string;
    status: boolean;
    amount: number;
}
const addProduct = createAction<AddProductPayload>(SHOPPING_ADD_PRODUCT)


type AddToBasketPayload = {
    id: number;
    status: boolean;
}
const moveProduct = createAction<AddToBasketPayload>(SHOPPING_ADD_TO_BASKET)


type ChangeAmountPayload = {
    id: number;
    isIncrease: boolean;
}
const changeAmount = createAction<ChangeAmountPayload>(SHOPPING_CHANGE_AMOUNT)


type UseDiscountPayload = {
    value: number;
}
const useDiscount = createAction<UseDiscountPayload>(SHOPPING_USE_DISCOUNT)


type DeleteProductPayload = {
    id: number;
}
const deleteProduct = createAction<DeleteProductPayload>(SHOPPING_DELETE_PRODUCT)

const calculateTotal = createAction(SHOPPING_CALCULATE_TOTAL)

type DeleteFromBasketPayload = {
    id: number;
}
const deleteFromBasket = createAction<DeleteFromBasketPayload>(SHOPPING_DELETE_FROM_BASKET)

type UpdateBasketPayload = {
    updatedBasket: AddProductPayload[]
}
const updateBasket = createAction<UpdateBasketPayload>(SHOPPING_UPDATE_BASKET)

export{addProduct, moveProduct, changeAmount, useDiscount, deleteProduct, calculateTotal, deleteFromBasket, updateBasket}