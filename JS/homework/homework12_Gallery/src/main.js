import './style.css'
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import axios from 'axios';

iziToast.success({
  title: 'OK',
  message: 'Successfully inserted record!',
});

const apiKey = "47419937-9f04f29adf351466240a80859";
const url = 'https://pixabay.com/api/'

const form = document.createElement("form");

const input = document.createElement("input");
input.placeholder = "image type"

const searchBtn = document.createElement("button");
searchBtn.type = "button"

searchBtn.textContent = "search";
const app = document.querySelector("#app");

const ul = document.createElement("ul");
ul.className = "image-container__images-list";
ul.style.display = "flex";
ul.style.flexWrap = "wrap";
ul.style.gap = "10px"
ul.style.justifyContent = "center"

const imageContainer = document.createElement("div");
imageContainer.className = "image-container"

const returnBtn = document.createElement("button");
returnBtn.className = "image-container__return-button"
// returnBtn.style.backgroundColor = "red";
returnBtn.textContent = "back";

imageContainer.style.display = "none";

imageContainer.append(ul);
imageContainer.append(returnBtn);

app.append(imageContainer);
app.append(form);

form.append(input);
form.append(searchBtn);

const fetchImagesAsync = async (query) => {
  try{
    
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      }
    })
    const imagesArr = response.data.hits;
    if(imagesArr.length == 0){
      iziToast.error({
        title: 'No photo',
        message: "Could not find photo for this tag",
    });
    }else{
      imagesArr.forEach(element => {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        const img = document.createElement("img");
        img.style.height = "250px";
        img.src = element.webformatURL;
        li.append(img);
        ul.append(li);
      });
    }

  }catch(error){
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
  });
  }
}

searchBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if(input.value){
    fetchImagesAsync(input.value);
    form.style.display = "none";
    imageContainer.style.display = "block";
  }
  else{
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data',
  });
  }
})

returnBtn.addEventListener("click", (event) => {
  input.value = "";
  imageContainer.style.display = "none";
  form.style.display = "block";
  const imageArr = document.querySelectorAll("li");
  imageArr.forEach((element) => {
    element.remove();
  })
})

