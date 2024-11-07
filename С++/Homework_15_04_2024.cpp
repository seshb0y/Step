#include <iostream>
using namespace std;

//Задание 1
//Создайте класс Book
//Необходимо хранить данные : Автор, Название, Издательство,
//Год, Количество, страниц.
//Создать массив объектов.Вывести :
//■ список книг заданного автора;
//■ список книг, выпущенных заданным издательством;
//■ список книг, выпущенных после заданного года.
//Используйте explicit конструктор и константные функции - члены(например, для отображения данных о книге и т.д.)



class Book
{
public:
    string author;
    string name;
    string publisher;
    int year;
    int amount;
    int page;
    Book(string author, string name, string publisher, int year, int amount, int page)
    {
        this->author = author;
        this->name = name;
        this->publisher = publisher;
        this->year = year;
        this->amount = amount;
        this->page = page;
    }
    void showInfo()
    {
        cout << "Author: " << author << endl;
        cout << "Name: " << name << endl;
        cout << "Publisher: " << publisher << endl;
        cout << "Year: " << year << endl;
        cout << "Amount: " << amount << endl;
        cout << "Page: " << page << endl << endl;

    }
};

void delBook(Book**& arr, int& size, string author, string name, string publisher)
{
    Book** newArr = new Book * [size - 1];
    for (int i = 0, j = 0; i < size; i++)
    {
        if (arr[i]->author != author && arr[i]->name != name && arr[i]->publisher != publisher)
        {
            newArr[j] = arr[i];
            j++;
        }
    }
    size--;
    delete[] arr;
    arr = newArr;
}

void addBook(Book**& arr, int& size, string author, string name, string publisher, int year, int amount, int page)
{
    Book** newArr = new Book * [size + 1];
    for (int i = 0; i < size; i++)
    {
        newArr[i] = arr[i];
    }
    newArr[size] = new Book(author, name, publisher, year, amount, page);
    size++;
    delete[] arr;
    arr = newArr;
}

//int main()
//{
//    int size = 5;
//    Book* pBook1 = new Book("Abnett", "Eisenhorn", "Era", 2005, 1000, 569);
//    Book* pBook2 = new Book("Vazovski", "Monsters Co", "Jin", 2000, 1500, 380);
//    Book* pBook3 = new Book("Higs", "Reivenor", "Rose", 2002, 10000, 784);
//    Book* pBook4 = new Book("Pelevin", "S.N.A.F.F", "Flower", 2012, 1050, 1092);
//    Book* pBook5 = new Book("Pelevin", "Number", "Era", 2020, 2000, 486);
//    Book** pArrBook = new Book * [size];
//    pArrBook[0] = pBook1;
//    pArrBook[1] = pBook2;
//    pArrBook[2] = pBook3;
//    pArrBook[3] = pBook4;
//    pArrBook[4] = pBook5;
//    int u_choice;
//    string author;
//    string name;
//    string publisher;
//    int year;
//    int amount;
//    int page;
//    while (true)
//    {
//        cout << "Menu \n1. Show Author\'s books \n2. Show publisher\'s books \n3. Show books after your age \n4. Delete book \n5. Add book \n6. Exit" << endl;
//        cin >> u_choice;
//        switch (u_choice)
//        {
//        case 1:
//            cout << "Enter name: ";
//            cin >> name;
//            for (int i = 0; i < size; i++)
//            {
//                if (pArrBook[i]->author == name)
//                {
//                    pArrBook[i]->showInfo();
//                }
//            }
//            continue;
//        case 2:
//            cout << "Enter publsiher name: ";
//            cin >> publisher;
//            for (int i = 0; i < size; i++)
//            {
//                if (pArrBook[i]->publisher == publisher)
//                {
//                    pArrBook[i]->showInfo();
//                }
//            }
//            continue;
//        case 3:
//            cout << "Enter year: ";
//            cin >> u_choice;
//            for (int i = 0; i < size; i++)
//            {
//                if (pArrBook[i]->year > u_choice)
//                {
//                    pArrBook[i]->showInfo();
//                }
//            }
//            continue;
//        case 4:
//            cout << "Enter the author: ";
//            cin >> author;
//            cout << "Enter the book title: ";
//            cin >> name;
//            cout << "Enter the publisher: ";
//            cin >> publisher;
//            for (int i = 0; i < size; i++)
//            {
//                if (pArrBook[i]->author == author && pArrBook[i]->name == name && pArrBook[i]->publisher == publisher)
//                {
//                    pArrBook[i]->showInfo();
//                    break;
//                }
//            }
//            cout << "Delete?(1 for yes / 0 for no): ";
//            cin >> u_choice;
//            if (u_choice == 1)
//            {
//                delBook(pArrBook, size, author, name, publisher);
//            }
//            cout << "Deleted" << endl;
//            continue;
//        case 5:
//            cout << "Enter new data" << endl;
//            cout << "Enter the author: ";
//            cin >> author;
//            cout << "Entert thebook title: ";
//            cin >> name;
//            cout << "Enter the publisher: ";
//            cin >> publisher;
//            cout << "Enter the year of publication: ";
//            cin >> year;
//            cout << "Enter circulation: ";
//            cin >> amount;
//            cout << "Enter number of pages: ";
//            cin >> page;
//            addBook(pArrBook, size, author, name, publisher, year, amount, page);
//            cout << "The book added" << endl;
//            pArrBook[size-1]->showInfo();
//            continue;
//        case 6:
//            break;
//        }
//        break;
//    }
//}






//Задание 2
//Создайте класс Worker.
//Необходимо хранить данные : ФИО, Должность, Год поступления на работу, Зарплата.
//Создать массив объектов.Вывести:
//■ список работников, стаж работы которых на данном предприятии превосходит заданное число лет;
//■ список работников, зарплата которых превосходит заданную;
//■ список работников, занимающих заданную должность.

class Worker
{
public:
    string surname;
    string name;
    string patronymic;
    string post;
    int entryYear;
    int salary;

    Worker(string surname, string name, string patronymic, string post, int entryYear, int salary)
    {
        this->surname = surname;
        this->name = name;
        this->patronymic = patronymic;
        this->post = post;
        this->entryYear = entryYear;
        this->salary = salary;
    }
    void showInfo()
    {
        cout << "surname: " << surname << endl;
        cout << "name: " << name << endl;
        cout << "patronymic: " << patronymic << endl;
        cout << "post: " << post << endl;
        cout << "year of entry into service: " << entryYear << endl;
        cout << "salary: " << salary << endl << endl;

    }
};

void delWorker(Worker**& arr, int& size, string surname, string name, string patronymic, int entryYear)
{
    Worker** newArr = new Worker * [size - 1];
    for (int i = 0, j = 0; i < size; i++)
    {
        if (arr[i]->surname != surname && arr[i]->name != name && arr[i]->patronymic != patronymic && arr[i]->entryYear != entryYear)
        {
            newArr[j] = arr[i];
            j++;
        }
    }
    size--;
    delete[] arr;
    arr = newArr;
}

void addWorker(Worker**& arr, int& size, string surname, string name, string patronymic, string post, int entryYear, int salary)
{
    Worker** newArr = new Worker * [size + 1];
    for (int i = 0; i < size; i++)
    {
        newArr[i] = arr[i];
    }
    newArr[size] = new Worker(surname, name, patronymic, post, entryYear, salary);
    size++;
    delete[] arr;
    arr = newArr;
}

int main()
{
    int size = 5;
    Worker* pWorker1 = new Worker("Ivanov", "Ivan", "Ivanovich", "Engineer", 2005, 35000);
    Worker* pWorker2 = new Worker("Paul", "Mahdi", "Atreides", "Designer", 2001, 50000);
    Worker* pWorker3 = new Worker("Geralt", "From", "Riviya", "Witcher", 2007, 350000);
    Worker* pWorker4 = new Worker("Thomas", "Vircetti", "-", "Gangster", 1998, 75000);
    Worker* pWorker5 = new Worker("Mike", "Vazovski", "-", "Monster", 2015, 115000);
    Worker** pArrWorker = new Worker * [size];
    pArrWorker[0] = pWorker1;
    pArrWorker[1] = pWorker2;
    pArrWorker[2] = pWorker3;
    pArrWorker[3] = pWorker4;
    pArrWorker[4] = pWorker5;
    int u_choice;
    string surname;
    string name;
    string patronymic;
    string post;
    int entryYear;
    int salary;
    while (true)
    {
        //■ список работников, стаж работы которых на данном предприятии превосходит заданное число лет;
//■ список работников, зарплата которых превосходит заданную;
//■ список работников, занимающих заданную должность.
        cout << "Menu \n1. Find by work expirience \n2. Find by salary \n3. Find by post \n4. Delete worker \n5. Add worker \n6. Exit" << endl;
        cin >> u_choice;
        switch (u_choice)
        {
        case 1:
            cout << "Enter work expirience: ";
            cin >> entryYear;
            for (int i = 0; i < size; i++)
            {
                if (pArrWorker[i]->entryYear < 2024 - entryYear)
                {
                    pArrWorker[i]->showInfo();
                }
            }
            continue;
        case 2:
            cout << "Enter salary: ";
            cin >> salary;
            for (int i = 0; i < size; i++)
            {
                if (pArrWorker[i]->salary > salary)
                {
                    pArrWorker[i]->showInfo();
                }
            }
            continue;
        case 3:
            cout << "Enter post: ";
            cin >> post;
            for (int i = 0; i < size; i++)
            {
                if (pArrWorker[i]->post == post)
                {
                    pArrWorker[i]->showInfo();
                }
            }
            continue;
        case 4:
            cout << "Enter full name: ";
            cin >> surname;
            cin >> name;
            cin >> patronymic;
            cout << "Enter year of entry into service: ";
            cin >> entryYear;
            for (int i = 0; i < size; i++)
            {
                if (pArrWorker[i]->surname == surname && pArrWorker[i]->name == name && pArrWorker[i]->patronymic == patronymic && pArrWorker[i]->entryYear == entryYear)
                {
                    pArrWorker[i]->showInfo();
                    break;
                }
            }
            cout << "Delete?(1 for yes / 0 for no): ";
            cin >> u_choice;
            if (u_choice == 1)
            {
                delWorker(pArrWorker, size, surname, name, patronymic, entryYear);
            }
            cout << "Deleted" << endl;
            continue;
        case 5:
            cout << "Enter new data" << endl;
            cout << "Enter full name: ";
            cin >> surname;
            cin >> name;
            cin >> patronymic;
            cout << "Enter year of entry into service: ";
            cin >> entryYear;
            cout << "Enter position: ";
            cin >> post;
            cout << "Enter salary: ";
            cin >> salary;
            addWorker(pArrWorker, size, surname, name, patronymic, post, entryYear, salary);
            cout << "The worker added" << endl;
            pArrWorker[size - 1]->showInfo();
            continue;
        case 6:
            break;
        }
        break;
    }
}
