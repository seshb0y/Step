
import { appendEl } from "./appendEl";

export const loadTasks = async () => {
  const list = document.querySelector(".app__todo-list");
  const elements = await fetchData();
  elements.forEach((element) => {
    if (element.completed == true) {
      appendEl(element.title, list, true);
    } else {
      appendEl(element.title, list);
    }
  });
};
const searchParams = new URLSearchParams({
  _page: 2,
  _limit: 3,
});
const fetchData = async () => {
  try {
    const url = `https://jsonplaceholder.typicode.com/todos?${searchParams.toString()}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
