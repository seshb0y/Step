import { useEffect, useRef, useState } from 'react'
import './App.css'
import Player from './components/Player'

function App() {
  const [count, setCount] = useState(0)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  })

  const handleBlur = () => inputRef.current?.blur();

  return (
    <>
      <form action="">
        <input ref={inputRef} type="text" />
        <button onClick={handleBlur}>blur</button>
      </form>

      <h1>Vite + React</h1>
      <Player source='http://media.w3.org/2010/05/sintel/trailer.mp4'/>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
