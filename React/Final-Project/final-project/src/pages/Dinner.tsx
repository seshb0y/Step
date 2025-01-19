import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import NavBar from '../components/NavBar';
import styles from '../styles/FoodPage.module.css';

const Dinner = () => {
  const { food } = useSelector((state: RootState) => state.food);

  return (
    <div className={styles.container} style={{backgroundColor: food[3].theme}}>
      <NavBar />
      <h1 className={styles.title}>{food[3].name}</h1>
      <div className={styles.details}>
        <h2>Price: {food[3].price}</h2>
        <h2>Description: {food[3].description}</h2>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={food[3].image} alt={food[3].name} />
      </div>
    </div>
  );
};

export default Dinner;
