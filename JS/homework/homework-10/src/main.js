import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { addElements } from './components/elements'
import { currentCounter } from './timeTracker/utilities/currentTimeCounter';
import { saveChanges } from './timeTracker/utilities/saveChanges';
import { lastVisit } from './timeTracker/utilities/lastVisit';
import { totalTime } from './timeTracker/utilities/totalTime';
import { reset } from './timeTracker/utilities/reset';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
// setupCounter(document.querySelector('#counter'))
// localStorage.clear()
addElements();
currentCounter();
saveChanges();
lastVisit();
totalTime();
reset();