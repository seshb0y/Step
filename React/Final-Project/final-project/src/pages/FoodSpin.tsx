import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// import { fetchGetFood } from "../redux/operations";
import { fetchGetFood } from "../redux/operations";
import style from '../styles/Styles.module.css'
// import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import circle from '../image/Group 1 (4).png'


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

  const [rotation, setRotation] = useState(0);

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
    rotateCircle('right')
    setCurrentProduct((prev) => (prev + 1) % food.length);
  };

  const handlePreviousProduct = () => {
    rotateCircle('left')
    setCurrentProduct((prev) => {
      if (prev === 0) {
        return food.length - 1;
      }
      return prev - 1;
    });
  };

  const rotateCircle = (direction: "left" | "right") => {
    const newRotation = rotation + (direction === "left" ? -36 : 36);
    setRotation(newRotation); 
  };

  console.log(food)
  // const radius = 250;
  
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
                  <img className={style.figmaImage} src={circle} alt="" style={{ transform: `rotate(${rotation}deg)` }} />
                </div>
                  <div className={style.buttons}>
                      <button style={{backgroundColor: background}} className={style.buttonLeft} onClick={handlePreviousProduct}>
                        <img className={style.changeButtonImage}  src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Arrow_Bottom-256.png" alt="" />
                      </button>
                      <button style={{backgroundColor: background}} className={style.buttonRight} onClick={handleNextProduct}>
                        <img className={style.changeButtonImage} src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Arrow_Bottom-256.png" alt="" />
                      </button>
                  </div>
                <div className={style.centerImage}>
                {centerImage && (
                <img src={centerImage.image} alt={centerImage.name} />
                )}
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