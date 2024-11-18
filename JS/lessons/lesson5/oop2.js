// Реализовать класс, описывающий простой карандаш. В классе должны быть следующие компоненты:

// Поле, которое хранит твёрдость грифеля (например, "HB", "2B").
// Поле, которое хранит оставшуюся длину карандаша (в сантиметрах).
// Метод для письма:
// Метод принимает строку и выводит её в консоль.
// Каждый символ, кроме пробела, уменьшает длину карандаша на 0,1 см.
// Если длина карандаша закончилась, вывод прекращается.
// Метод для заточки карандаша:
// Метод уменьшает длину карандаша на 1 см, но восстанавливает возможность писать.
// Создать класс, описывающий механический карандаш, унаследовав его от простого карандаша, с добавлением:

// Поля, которое хранит запас сменных грифелей.
// Метода для замены грифеля (если грифель закончился).

class Pencil{
    constructor(solid, length, grip){
        this.solid = solid;
        this.length = length;
        this.grip = grip;
    }
    print(text){
        for (const char of [...text]) {
            console.log(char);
            if (char !== " ") {
                this.grip -= 0.1;
            }
            if (this.grip <= 0) {
                console.log("grip length is run out");
                break;
            }
        }
    }
    sharpen(){
        if(this.length > 0){
            this.length -= 1;
            this.grip += 1;
        }
        console.log("length: ", this.length, "\ngrip: ", this.grip);
    }
    getSolid(){
        return this.solid;
    }
    getLength(){
        return this.length;
    }
    getGrip(){
        return this.grip
    }
}
// let pencil = new Pencil("HB", 5, 2);
// pencil.print("random text");
// pencil.sharpen();
// console.log(pencil.getGrip(), pencil.getLength(), pencil.getSolid());

class MechPencil extends Pencil{
    constructor(solid, length, grip, gripRemain){
        super(solid, length, grip)
        this.gripRemain = gripRemain;
    }
    getGripRemain(){
        return this.gripRemain;
    }
    sharpen(){
        if(this.gripRemain > 0){
            this.gripRemain -= 1;
            this.grip += 1;
        }
        else{
            console.log("no grip remains to change");
        }
    }
}

let mechPencil = new MechPencil("HB", 5, 2, 10);
console.log(mechPencil.getGripRemain(), mechPencil.getLength(), mechPencil.getSolid(), mechPencil.getGrip());
mechPencil.print("random text");
console.log(mechPencil.getGripRemain(), mechPencil.getLength(), mechPencil.getSolid(), mechPencil.getGrip());
mechPencil.print("random text");
mechPencil.sharpen();
console.log(mechPencil.getGripRemain(), mechPencil.getLength(), mechPencil.getSolid(), mechPencil.getGrip());
mechPencil.print("random text");
mechPencil.sharpen();
console.log(mechPencil.getGripRemain(), mechPencil.getLength(), mechPencil.getSolid(), mechPencil.getGrip());