import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// import { fetchGetFood } from "../redux/operations";
import { motion } from "framer-motion";
import { fetchGetFood } from "../redux/operations";
import style from '../styles/Styles.module.css'

const FoodSpin: React.FC = () => {
  const [currentProduct, setCurrentProduct] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const { food, isLoading} = useSelector(
    (state: RootState) => state.food
  );
  

  useEffect(() => {
    dispatch(fetchGetFood())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleNextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % food.length);
  };

  const handlePreviousProduct = () => {
    setCurrentProduct((prev) => {
      if (prev === 0) {
        return food.length - 1;
      }
      return prev - 1;
    });
  };

  const product = food[currentProduct];
  return (
    isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <h2>Food Menu</h2>
            <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            >
            <h3>{product.description}</h3>
            <img
                className={style.imgCircle}
                src={food[(currentProduct - 2 + food.length) % food.length].image}
                alt={product.name}
            />
            <img
                className={style.imgCircle}
                src={food[(currentProduct - 1 + food.length) % food.length].image}
                alt={product.name}
            />
            <img
                className={style.imgMainCircle}
                src={product.image}
                alt={product.name}
            />
            <img
                className={style.imgCircle}
                src={food[(currentProduct + 1) % food.length].image}
                alt={product.name}
            />
            <img
                className={style.imgCircle}
                src={food[(currentProduct + 2) % food.length].image}
                alt={product.name}
            />
            <p>{product.description}</p>
            <p>${product.price}</p>
            </motion.div>
            <button onClick={handlePreviousProduct}>previous</button>
            <button onClick={handleNextProduct}>next</button>
        </div>
    )

  );
};

export default FoodSpin;
