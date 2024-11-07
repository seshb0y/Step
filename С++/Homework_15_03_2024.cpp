#include <iostream>

using namespace std;

//Задание 1
//Используя указатели и оператор разыменования, определить наибольшее из двух чисел.
int max(int a, int b)
{
    int* ptrA = &a;
    int* ptrB = &b;
    if (*ptrA > *ptrB)
    {
        return *ptrA;
    }
    return *ptrB;
}


//
//Задание 2
//Используя указатели и оператор разыменования, определить знак числа, введённого с клавиатуры.
void posOrNeg(int a)
{
    int* ptrA = &a;
    if (*ptrA > 0)
    {
        cout << "positive";
    }
    else cout << "negative";
}
//
//Задание 3
//Используя указатели и оператор разыменования, обменять местами значения двух переменных.
void swapping(int a, int b)
{
    int* ptrA = &a;
    int* ptrB = &b;
    swap(*ptrA, *ptrB);
}

//
//Задание 4
//Написать примитивный калькулятор, пользуясь только указателями.
int calculate(int a, char oper, int b)
{
    int* ptrA = &a;
    int* ptrB = &b;
    switch (oper)
    {
    case '-':
        return *ptrA - *ptrB;
    case '+':
        return *ptrA + *ptrB;
    }
}

int main()
{
    cout << calculate(10, '+', 12);
}

