import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// import { fetchGetFood } from "../redux/operations";
import { fetchGetFood } from "../redux/operations";
import style from '../styles/Styles.module.css'
// import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";

// interface Food{
//     food: Array<{
//         id: number;
//         name: string;
//         price: number;
//         description: string;
//         theme: string;
//         image: string;
//       }>;
// }

const FoodSpin: React.FC = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
//   const [product, setProduct] = useState({});
  const [background, setBackground] = useState("");
  const [centerImage, setCenterImage] = useState<{
    image: string;
    name: string;
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { food, isLoading} = useSelector(
    (state: RootState) => state.food
  );
  

  useEffect(() => {
    if(food.length === 0){
        dispatch(fetchGetFood())
    }
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

  console.log(food)
  const radius = 250;
  
  if(!isLoading && centerImage != food[currentProduct]){
        // setProduct(food[currentProduct])
        setBackground(food[currentProduct].theme)
        setCenterImage(food[currentProduct])
  }
  const product = food[currentProduct]
  return (
    isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <>
            <div className={style.foodSpinContainer}>
                <NavBar/>

                <div className={style.foodCircle} style={{background: background}}>
                        {food.map((item, index) => {
                        const angle = (220 / food.length) * index;
                        const x = radius * Math.cos((angle * Math.PI) / 180);
                        const y = radius * Math.sin((angle * Math.PI) / 180);
                
                        return (
                <div
                            key={item.id}
                            className={style.foodItem}
                            style={{
                                transform: `translate(${x}px, ${-y + -100}px)`,
                                zIndex: index === currentProduct ? 10 : 1,
                            }}
                >
                <img
                                src={item.image}
                                alt={item.name}
                                className={
                                index === currentProduct ? style.foodItemActive : style.foodItemImage
                                }
                            />
                </div>
                        );
                        })}
                <div className={style.centerImage}>
                {centerImage && (
                <img src={centerImage.image} alt={centerImage.name} />
                )}
                </div>
                <div className={style.buttons}>
                    <button style={{backgroundColor: background}} className={style.buttonLeft} onClick={handlePreviousProduct}>Back</button>
                    <button style={{backgroundColor: background}} className={style.buttonRight} onClick={handleNextProduct}>Next</button>
                </div>
                </div>
                <div className={style.info}>
                    <h1 style={{color: background}}>${product.price}</h1>
                    <h1 style={{color: "black"}}>{product.name}</h1>
                    <h3>{product.description}</h3>
                    <button style={{ background: background }}>ORDER NOW</button>
                </div>
            </div>
        </>
    )

  );
};

export default FoodSpin;