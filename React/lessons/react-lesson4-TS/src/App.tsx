// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'
// import Counter from './components/Counter'
// import Timer from './components/Timer'



function App() {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };
  return(
    <div>
      <button onClick={toggleModal}>
        {isModal ? 'Close Modal' : 'Open Modal'}
      </button>
      {isModal && <Modal setIsModal={setIsModal} />}
    </div>
  )

  // const [inputTime, setInputTime] = useState(10);
  // const [timerKey, setTimerKey] = useState(0);

  // const handleInputChange = (event) => {
  //   setInputTime(Number(event.target.value));
  // };

  // const handleSetTime = () => {
  //   setTimerKey((prevKey) => prevKey + 1);
  // };

  // return (
  //   <div>
  //     <h1>Timer Control</h1>
  //     <div>
  //       <label>
  //         Set time (seconds):
  //         <input
  //           type="number"
  //           value={inputTime}
  //           onChange={handleInputChange}
  //           placeholder="Enter seconds"
  //         />
  //       </label>
  //       <button onClick={handleSetTime}>Start Timer</button>
  //     </div>
  //     <Timer key={timerKey} initialTime={inputTime} />
  //   </div>
  // );
};

  // const [isShown, setIsShown] = useState(false);
  // const [products, setProducts] = useState([
  //   { id: 1, title: 'Product 1' },
  //   { id: 2, title: 'Product 2' },
  //   { id: 3, title: 'Product 3' },
  // ]);

  // const toggleCounter = () => {
  //   setIsShown((prev) => !prev); 
  // };

  // return (
  //   <div>
  //     <h1>Products page</h1>
  //     <ul>
  //       {products.map((product) => (
  //         <li key={product.id}>{product.title}</li>
  //       ))}
  //     </ul>
  //     <button onClick={toggleCounter}>
  //       {isShown ? 'Close' : 'Open'}
  //     </button>
  //     {isShown && <Counter />}
  //   </div>
  // );

export default App
