import './style.css'
import { numGuess } from './utilities/numGuess'
document.querySelector('#app').innerHTML = `
    <div>
      <form>
        <input class="input" type="text">
        <button class="check">check</button>
      </form>
      <p class="tip">Tip </p>
      <p class="counts">0</p>
      <button class="reset">reset</button>
    </div>
`
numGuess();