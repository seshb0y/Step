// const date = new Date();
// console.log("date", date);

class UserP{
    constructor(name, email, address) {
        this.name = name;
        this.email = email;
        this.address = address;
    }
    getEmail(){
        return this.email;
    }
    greeting(){
        return `Hello ${this.name}`;
    }
    changeEmail(newEmail){
        this.email = newEmail;
    }
}

const obj = {
    name: "Andrew",
    email: "adnrew@gmail.coom",
    address: "asdasfaslk",
}
const andrew = new UserP("andrew", "awdawd@awd.ru");
const alice = new UserP("alice", "ahajhasdh@fdh.ru");

// console.log(andrew.greeting.call(UserP, andrew.name));
// console.log(andrew);
// console.log(alice);

// const {email} = obj;
// console.log(email)

class Animal {
    constructor(name){
        this.name = name;
    }
    makeSound(){
        console.log(`${name} makes sound`);
    }
}
const cat = new Animal("barsik");

class Dog extends Animal{
    makeSound(){
        console.log("Gav Gav");
    }
}

const dog = new Dog("Palkan");
