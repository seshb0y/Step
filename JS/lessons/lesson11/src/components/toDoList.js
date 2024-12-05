import { appendEl } from "../utilities/addTask";


export const toDoList = async () => {
    const list = document.createElement("ul");
    list.className = "footer__toDo-list";
    list.style.listStyle = "none"
    try {
        const elements = await fetchData();
        console.log(elements)
        elements.forEach(element => {
            if(element.completed == true){
                appendEl(element.title, list, true)
            }else{
                appendEl(element.title, list)
            }
            
        });
        document.querySelector(".footer").append(list);
    } catch (error) {
        console.log(error);
    }
}

const searchParams = new URLSearchParams({
    _limit: 3,
    _page: 2,
  });
const fetchData = async () => {
    const url = `https://jsonplaceholder.typicode.com/todos?${searchParams.toString()}`;
    try{
        const response = await fetch(url);
        const result = await response.json()
        return result;
    }catch(error){
        console.log(error);
    }
}