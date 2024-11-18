// Document object model

// window => document => html => head => meta / body => h1
const obj = {
    window:{
        document: {
            html: {
                head: {
                    meta: "",
                    meta: "",
                },
                body: {
                    h1: "",
                },
            },
        },
    },
};

// Nodes(узлы), Element (элементы)

// const body = document.body;
// const div = body.children;

const div = document.querySelector(".second_div ")
console.log("div", div)