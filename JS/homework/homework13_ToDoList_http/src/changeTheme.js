export const changeTheme = () => {
    const changeBtn = document.querySelector(".app__theme-btn")
    changeBtn.addEventListener("click", () => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root)

        if(computedStyle.backgroundColor === "rgb(36, 36, 36)")
        {
            changeBtn.style.backgroundImage = "url('https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/moon-256.png')"
            root.style.color = "rgba(0, 0, 0, 0.87)";
            root.style.backgroundColor = "rgb(255, 255, 255)";
        }
        else{
            changeBtn.style.backgroundImage = "url('https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/sun-256.png')"
            root.style.color = "rgba(255, 255, 255, 0.87)";
            root.style.backgroundColor = "rgb(36, 36, 36)";
        }
    })
}