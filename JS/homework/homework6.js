// Задание 1
// Реализовать класс, описывающий простой маркер. В классе
// должны быть следующие компоненты:
// ■ поле, которое хранит цвет маркера;
// ■ поле, которое хранит количество чернил в маркере (в процентах);
// ■ метод для печати (метод принимает строку и выводит
// текст соответствующим цветом; текст выводится до тех
// пор, пока в маркере есть чернила; один не пробельный
// символ – это 0,5% чернил в маркере).
// Реализовать класс, описывающий заправляющийся маркер,
// унаследовав его от простого маркера и добавив метод для заправки
// маркера.
// Продемонстрировать работу написанных методов.
// class Marker{
//     constructor(color, inkCount){
//         this.color = color,
//         this.inkCount = inkCount
//     }
//     print(text){
//         let maxInk = this.inkCount;
//         for (const char of [...text]) {
//             console.log(char);
            
//             if (char !== " ") {
//                 this.inkCount -= maxInk * 0.005;
//                 console.log(this.inkCount);
//             }
//             if (this.inkCount <= 1) {
//                 console.log("ink count is run out");
//                 break;
//             }
//         }
//     }
// }
// const obg = new Marker("white", 100)
// // obg.print("random text")
// class RefillableMarker extends Marker{
//     constructor(color, inkCount){
//         super(color, inkCount);
//     }
//     refill(){
//         this.inkCount = 100;
//     }
// }
// const obj = new RefillableMarker("blue", 100);
// obj.print("random text");
// obj.refill();
// obj.print("random textasda");

// Задание 2
// Реализуйте класс ExtendedDate, унаследовав его от стандартного класса Date и добавив следующие возможности:
// ■ метод для вывода даты (числа и месяца) текстом;
// ■ метод для проверки – это прошедшая дата или будущая
// (если прошедшая, то метод возвращает false; если будущая или текущая, то true);
// ■ метод для проверки – високосный год или нет;
// ■ метод, возвращающий следующую дату.
// Создайте объект класса ExtendedDate и выведите на экран
// результаты работы новых методов.
// class ExtendedDate{
//     constructor(day, month, year){
//         this.day = day;
//         this.month = month - 1;
//         this.year = year;
//     }
//     dateToString(){
//         console.log(`day: ${this.day}\nmonth: ${this.month}\nyear: ${this.year}`);
//     }
//     isFuture(){
//         const obj = new Date();
//         if(this.year < obj.getFullYear()){
//             return false
//         }
//         else if(this.year == obj.getFullYear()){
//             if(this.month < obj.getMonth()){
//                 return false
//             }
//             else if(this.month == obj.getMonth()){
//                 if(this.day < obj.getDate()){
//                     return false
//                 }
//                 else if(this.day == obj.getDate()){
//                     return "equal";
//                 }
//                 else{return true}
//             }
//             else{return true}
//         }
//         else{return true}
//     }
//     isLeap(){
//         if(this.year % 4 === 0){
//             return true;
//         }
//         return false;
//     }
//     nextDate(){
//         this.day += 1;
//     }
// }

// const obj = new ExtendedDate(19, 10, 2025);
// obj.dateToString();
// console.log(obj.isFuture());
// console.log(obj.isLeap());
// obj.nextDate();
// obj.dateToString()


// Задание 3
// Реализовать класс Employee, описывающий работника, и создать массив работников банка.
// Реализовать класс EmpTable для генерации html кода таблицы
// со списком работников банка. Массив работников необходимо
// передавать через конструктор, а получать html код с помощью
// метода getHtml().
// Создать объект класса EmpTable и вывести на экран результат
// работы метода getHtml().
class Employee{
    constructor(name, surname, age, salary){
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.salary = salary;
    }
}
class EmpTable{
    constructor(employees){
        this.employees = employees;
    }
    getHtml(){
        let html = "<table border='1' cellspacing='0' cellpadding='5' class='styled-table'>";
        html += "<thead><tr><th>Name</th><th>Surname</th><th>Age</th><th>Salary</th></tr></thead>";
        html += "<tbody>";
        for (const employee of this.employees) {
            html += `
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.surname}</td>
                    <td>${employee.age}</td>
                    <td>${employee.salary}</td>
                </tr>`;
        }

        html += "</tbody></table>";
        return html;
    }
}

const emp1 = new Employee("John", "Baranovich", 23, 1000);
const emp2 = new Employee("Donald", "Trump", 27, 1500);
const emp3 = new Employee("Steve", "Butovsky", 33, 1300);
const emp4 = new Employee("Trevor", "Trevorov", 28, 1200);

const empArr =[emp1, emp2, emp3, emp4];



// Задание 4
// Реализовать класс StyledEmpTable, который наследуется от
// класса EmpTable. Добавить метод getStyles(), который возвращает
// строку со стилями для таблицы в тегах style. Переопределить
// метод getHtml(), который добавляет стили к тому, что возвращает
// метод getHtml() из родительского класса.
// Создать объект класса StyledEmpTable и вывести на экран
// результат работы метода getHtml().
class StyledEmpTable extends EmpTable{
    constructor(employees){
        super(employees);
    }
    getStyles(){
        return `
        <style>
            .styled-table {
                width: 100%;
                border-collapse: collapse;
                font-family: Arial, sans-serif;
            }
            .styled-table th {
                background-color: #4CAF50;
                color: white;
                text-align: rigth;
                padding: 8px;
            }
            .styled-table td {
                border: 2px solid #d9a71e;
                padding: 8px;
            }
            .styled-table tr:nth-child(even) {
                background-color: #d9a71e;
            }
            .styled-table tr:hover {
                background-color: #d9a71e;
            }
        </style>
        `;
    }
    getHtml(){
        return this.getStyles() + super.getHtml();
    }
}
const styledTable = new StyledEmpTable(empArr);
document.write(styledTable.getHtml());