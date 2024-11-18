// Задание 1
// Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:
// ■ поле, хранящее радиус окружности;
// ■ get-свойство, возвращающее радиус окружности;
// ■ set-свойство, устанавливающее радиус окружности;
// ■ get-свойство, возвращающее диаметр окружности;
// ■ метод, вычисляющий площадь окружности;
// ■ метод, вычисляющий длину окружности.
// Продемонстрировать работу свойств и методов.
// class Circle{
//     constructor(radius){
//         this.radius = radius;
//     }
//     getRadius(){
//         return this.radius;
//     }
//     setRadius(value){
//         this.radius = value;
//     }
//     getDiameter(){
//         return 2 * this.radius;
//     }
//     findArea(){
//         return Math.PI * Math.pow(this.radius, 2);
//     }
//     findLength(){
//         return 2 * this.radius * Math.PI;
//     }
// }
// const obj = new Circle();
// obj.setRadius(10);
// console.log(obj.getRadius())
// console.log(obj.getDiameter())
// console.log(obj.findArea())
// console.log(obj.findLength())

// Задание 2
// Реализовать класс, описывающий html элемент.
// Класс HtmlElement должен содержать внутри себя:
// ■ название тега;
// ■ самозакрывающийся тег или нет;
// ■ текстовое содержимое;
// ■ массив атрибутов;
// ■ массив стилей;
// ■ массив вложенных таких же тегов;
// ■ метод для установки атрибута;
// ■ метод для установки стиля;
// ■ метод для добавления вложенного элемента в конец текущего элемента;
// ■ метод для добавления вложенного элемента в начало текущего элемента;
// ■ метод getHtml(), который возвращает html код в виде
// строки, включая html код вложенных элементов.
// С помощью написанного класса реализовать следующий блок
// и добавить его на страницу с помощью document.write().
// Обратите внимание. Чтобы получить весь этот html в виде
// строки должно быть достаточно вызвать метод getHtml только
// у тега с идентификатором wrapper.
class HtmlElement {
    constructor(tagName, isSelfClosing = false, textContent = '') {
        this.tagName = tagName;
        this.isSelfClosing = isSelfClosing
        this.textContent = textContent
        this.attributes = {};
        this.styles = {};
        this.children = [];
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    setStyle(property, value) {
        this.styles[property] = value;
    }
    appendChild(child) {
        this.children.push(child);
    }
    prependChild(child) {
        this.children.unshift(child);
    }
    getHtml() {
        const attributesString = Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        const stylesString = Object.entries(this.styles)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
        const openingTag = `<${this.tagName}${attributesString ? ' '
         + attributesString : ''}${stylesString ? ' style="' + 
         stylesString + '"' : ''}${this.isSelfClosing ? ' /' : ''}>`

        const childrenHtml = this.children.map(child => child.getHtml()).join('')
        const content = this.isSelfClosing ? '' : this.textContent + childrenHtml;
        const closingTag = this.isSelfClosing ? '' : `</${this.tagName}>`
        return openingTag + content + closingTag;
    }
}
// const div = new HtmlElement('div');
// div.setAttribute('class', 'container');
// div.setStyle('width', '100px');
// div.setStyle('height', '100px');
// div.setStyle('background-color', 'red')
// const span = new HtmlElement('span', false, 'Hello, World!');
// span.setStyle('color', 'white')
// div.appendChild(span);
// document.write(div.getHtml());


// Задание 3
// Реализовать класс, который описывает css класс.
// Класс CssClass должен содержать внутри себя:
// ■ название css класса;
// ■ массив стилей;
// ■ метод для установки стиля;
// ■ метод для удаления стиля;
// ■ метод getCss(), который возвращает css код в виде строки.
class CssClass{
    constructor(cssName) {
        this.cssName = cssName;
        this.styles = {};
    }
    setStyle(property, value) {
        this.styles[property] = value;
    }
    delStyle(property){
        delete this.styles[property]
    }
    getCss(){
        let cssString = `${this.cssName} {`
        for(let property in this.styles){
            cssString += `\n ${property}: ${this.styles[property]};`
        }
        cssString += "\n}"
        return cssString
    }
}
// const obj = new CssClass("test-object");
// obj.setStyle("color", "white");
// obj.setStyle("background-color", "black");
// console.log(obj.getCss());
// obj.delStyle("background-color");
// console.log(obj.getCss());

// Задание 4
// Реализовать класс, описывающий блок html документ.
// Класс HtmlBlock должен содержать внутри себя:
// ■ коллекцию стилей, описанных с помощью класса CssClass;
// ■ корневой элемент, описанный с помощью класса
// HtmlElement;
// ■ метод getCode(), который возвращает строку с html кодом (сначала теги style с описанием всех классов, а потом
// все html содержимое из корневого тега и его вложенных
// элементов).
// С помощью написанных классов реализовать следующий блок
// (см. рис. 2) и добавить его на страницу с помощью document.write().
class HtmlBlock {
    constructor() {
        this.cssClasses = [];
        this.rootElement = null
    }
    addCssClass(cssClass) {
        this.cssClasses.push(cssClass);
    }
    setRootElement(element) {
        this.rootElement = element;
    }
    getCode() {
        let cssCode = '<style>';
        for (let cssClass of this.cssClasses) {
            cssCode += `\n${cssClass.getCss()}`;
        }
        cssCode += '\n</style>';
        let htmlCode = this.rootElement.getHtml();
        return cssCode + htmlCode;
    }
}
let css1 = new CssClass(".wrap");
css1.setStyle("display", "flex");

let css2 = new CssClass(".block");
css2.setStyle("width", "300px");
css2.setStyle("margin", "10px");

let css3 = new CssClass(".img");
css3.setStyle("width", "100%");

let css4 = new CssClass(".text");
css4.setStyle("text-align", "justify");

let div = new HtmlElement("div");
div.setAttribute("id", "wrapper")
div.setAttribute("class", "wrap")

let div2 = new HtmlElement("div")
div2.setAttribute("class", "block")

let h = new HtmlElement("h3", false, "What is Lorem Ipsum?")

let img = new HtmlElement("img")
img.setAttribute("class", "img")
img.setAttribute("src", "lipsum.jpg")
img.setAttribute("alt", "Lorem Ipsum")

let p = new HtmlElement("p", false, "Some text about lorem ipsum");

let a = new HtmlElement("a", false, "Moree");
a.setAttribute("href", "https://www.lipsum.com")
a.setAttribute("target", "_blank")


p.setAttribute("class", "text")
let block = new HtmlBlock();
block.addCssClass(css1);
block.addCssClass(css2);
block.addCssClass(css3);
block.addCssClass(css4);
block.setRootElement(div);
div.appendChild(div2)
div2.appendChild(h);
div2.appendChild(img);
div2.appendChild(p);
div2.appendChild(a);
div.appendChild(div2);
document.write(block.getCode());