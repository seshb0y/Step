#include <iostream>
using namespace std;

int main()
{
    /*Zadaniye 4
    Пользователь вводит с клавиатуры время в секундах, прошедшее с начала дня.Вывести на экран текущее время в часах, минутах и секундах.
    Посчитать, сколько часов, минут и секунд осталось до полуночи.*/
    
    /*int user_sec;
    cout << "Enter a time: " << endl;
    cin >> user_sec;
    int now_hour = user_sec / 3600;
    int now_min = user_sec / 60 % 60;
    int now_sec = user_sec % 60;
    int hour_remain = 23 - now_hour;
    int min_remain = (86400 - user_sec) / 60 % 60;
    int sec_remain = (86400 - user_sec) % 60;
    cout << now_hour << ":" << now_min << ":" << now_sec << " now" << endl;
    cout << hour_remain << ":" << min_remain << ":" << sec_remain << " remain" << endl;*/


    //Задание 1
    //    Пользователь с клавиатуры вводит 5 оценок студента.Определить, допущен ли студент к экзамену.Студент получает допуск, если его средний балл 4 балла и выше.
   /* int first;
    cout << "Enter the first grade: ";
    cin >> first;
    int second;
    cout << "Enter the second grade: ";
    cin >> second;
    int third;
    cout << "Enter the third grade: ";
    cin >> third;
    int fourth;
    cout << "Enter the fourth grade: ";
    cin >> fourth;
    int fifth;
    cout << "Enter the fifth grade: ";
    cin >> fifth;
    int res = (first + second + third + fourth + fifth) / 5;
    if (res >= 4)
    {
        cout << "Allowed";
    }
    else
    {
        cout << "Not allowed";
    }*/


    //    Задание 2
    //    Пользователь вводит с клавиатуры число.Если оно четное, умножить его на три, иначе – поделить на два.Результат вывести на экран.

    /*int num;
    cout << "Enter a num: ";
    cin >> num;
    float num1 = num;
    if (num % 2 == 0)
    {
        cout << num * 3 << endl;
    }
    else
    {
        cout << num1 / 2 << endl;
    }*/

    //    Задание 3
    //    Написать программу - калькулятор.Пользователь вводит два числа и выбирает арифметическое действие.Вывести на экран результат.

    float num1;
    float num2;
    char act;
    cout << "Enter a num: ";
    cin >> num1;
    cout << "Enter a num: ";
    cin >> num2;
    cout << "Select an action: ";
    cin >> act;
    if (act == '+')
    {
        cout << num1 + num2 << endl;
    }
    else if (act == '-')
    {
        cout << num1 - num2 << endl;
    }
    else if (act == '*')
    {
        cout << num1 * num2 << endl;
    }
    else if (act == '/')
    {
        cout << num1 / num2 << endl;
    }
}

