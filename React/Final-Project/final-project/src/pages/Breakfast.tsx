// import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import NavBar from '../components/NavBar'
import styles from '../styles/FoodPage.module.css';

const Breakfast = () => {
    
    const {food} = useSelector((state: RootState) => state.food)

  return (
    <div className={styles.container} style={{backgroundColor: food[1].theme}}>
      <NavBar />
      <h1 className={styles.title}>{food[1].name}</h1>
      <div className={styles.details}>
        <h2>Price: {food[1].price}</h2>
        <h2>Description: {food[1].description}</h2>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={food[1].image} alt={food[1].name} />
      </div>
    </div>
  )
}

export default Breakfast