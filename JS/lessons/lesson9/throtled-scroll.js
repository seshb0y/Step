const outputBasic = document.querySelector(".output.basic");
const outputThrottled = document.querySelector(".output.throttled");
const outputDebounced = document.querySelector(".output.debounced");
 
const eventCounter = {
  basic: 0,
  throttled: 0,
  debounced: 0,
};
 
document.addEventListener("scroll", () => {
  eventCounter.basic += 1;
  outputBasic.textContent = eventCounter.basic;
});
 
//Throttle
document.addEventListener(
  "scroll",
  _.throttle(() => {
    eventCounter.throttled += 1;
    outputThrottled.textContent = eventCounter.throttled;
  }, 500)
);
 
//Debounce
document,
  addEventListener(
    "scroll",
    _.debounce(() => {
      eventCounter.debounced += 1;
      outputDebounced.textContent = eventCounter.debounced;
    }, 2000,{
        leading: true,
        trailing: false
    })
  );