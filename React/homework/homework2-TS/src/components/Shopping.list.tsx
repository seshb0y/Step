import React, { useState } from 'react'
import ShoppingItem from './Shopping.item';
import style from "./Shoping.module.css"

const ShoppingList = () => {
    const [product, setProduct] = useState(["Product 1", "Product 2", "Product 3", "Product 4"]);

    const deleteProduct = (index: number):void => {
        setProduct((prev) => prev.filter((_, i) => i != index))
    }

    // const rendProduct = () => {
    //     return(
    //         <div>
    //             {product.map((element, index) => {
    //                 return(
    //                     <div key = {index} className={style.container}>
    //                         <h3>{element}</h3>
    //                         <ShoppingItem deleteProduct={() => deleteProduct(index)}/>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // }

    return (
        <div>
            {product.map((element, index) => {
                return(
                    <div key = {index} className={style.container}>
                        <h3>{element}</h3>
                        <ShoppingItem deleteProduct={() => deleteProduct(index)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default ShoppingList