export const footer  = () => {
    const div = document.createElement("div");
    div.className = "footer";
    div.style.position = "relative"
    div.style.height = "400px"
    const app = document.querySelector("#app");
    const p = document.createElement('p');
    p.textContent = "TODO LIST";
    p.style.fontSize = "26px"
    const input = document.createElement('input');
    input.textContent = "TODO LIST";
    input.style.height = "25px"
    input.style.width = "500px"
    input.style.marginRight = "200px";
    const btn = document.createElement("button");
    btn.className = "footer__add-btn"
    btn.type = "button";
    btn.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/flat-design-database-set-1/24/button-filledcircle-add-256.png')";
    btn.style.position = "absolute"
    btn.style.bottom = "10px"
    btn.style.right = "10px"
    btn.style.backgroundSize = "cover";
    btn.style.height = "40px";
    btn.style.borderRadius = "50%"
 
    div.append(p);
    div.append(input);
    div.append(btn);
    app.append(div);
}
