export const addElements = () => {
    document.querySelector("#app").innerHTML = `
        <div>
            <div style="display: flex;">
                <p>Current time: </p>
                <p class="current" style="margin-left: 10px;"></p>
            </div>
            <div style="display: flex;">
                <p>Last visit time: </p>
                <p class="last-visit" style="margin-left: 10px;"></p>
            </div>
            <div style="display: flex;">
                <p>Total time: </p>
                <p class="total" style="margin-left: 10px;"></p>
            </div>
            <div>
                <button class="reset">reset</button>
            </div>
        </div>
    `
}