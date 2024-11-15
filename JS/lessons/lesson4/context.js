// this

// const petya = {
//     username: 'Petya',
//     showName(){
//         console.log(this.username)
//     }
// }
// petya.showName();


// const bookShelf = {
//     authors: ["Pelevin", "Tolkien", "Chehov"],
//     getAuthors(){
//         return this.authors;
//     },
//     addAuthor(name){
//         this.authors.push(name);
//     },
// };
// console.log('authors', bookShelf.getAuthors());
// bookShelf.addAuthor("Nabokov");
// console.log('authors', bookShelf.getAuthors());

// const customer = {
//     firstName: "Jacob",
//     lastName: "Mercer",
//     getFullName(){
//         return `${this.firstName} ${this.lastName}`;
//     },
// }
// function makeMessage(callback){
//     return callback();
// }
// console.log(makeMessage(customer.getFullName.bind(customer)));

//Call, Apply, Bind
// function greetGuest(greeting){
//     console.log(`${greeting} ${this.username}`);
// }

// const user1 = {
//     username: "Andrew",
// };
// const user2 = {
//     username: "Anna"
// }

// greetGuest.apply(user1, ['Добро пожаловать']);
// greetGuest.call(user2, "Hello");

// const bindedGreet = greetGuest.bind(user1, "Welcome");
// bindedGreet()



// const mage = {
//     name: "Mari",
//     hp: 100,
// };
// const warrior = {
//     name: "Gats",
//     hp: 100,
// };

// function heal(amount){
//     this.hp += amount; 
// };
// function takeDamage(amount){
//     this.hp -= amount;
// }
// function getInfo(){
//     console.log(this.name, this.hp);
// }
// getInfo.call(mage);
// takeDamage.apply(mage, [20]);
// getInfo.call(mage);
// heal.call(mage, 10)
// getInfo.call(mage);

// getInfo.call(warrior);
// takeDamage.call(warrior, 50);
// getInfo.call(warrior);
// heal.call(warrior, 12)
// getInfo.call(warrior);


const hotel = {
    username: "Resort Hotel",
    showThis(){
        const foo = () => {
            console.log("this in foo", this);
        };
        foo();
        console.log("this inside showThis", this)
    }
};
hotel.showThis();

function normalFunction(){
    console.log("normal", this);
}
const arrowFunction = () => {
    console.log("arrow", this);
}
const obj = {
    name: "Test",
};
// normalFunction.call(obj);
// arrowFunction.call(obj);

const user3 = {
    name: "Andrew",
    hobbies: ["guitar", "reading", "painting"],
    showHobbies() {
        this.hobbies.forEach((hobby) => {
            console.log(`${this.name} enjoys ${hobby}`)
        });
    }
};
user3.showHobbies();