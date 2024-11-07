#include <iostream>
using namespace std;


int main()
{
    //Задание 1
    //    Пользователь вводит с клавиатуры две границы диапазона и число.Если число не попадает в диапазон, 
    //    программа просит пользователя повторно ввести число, и так до тех пор, пока он не введет число правильно.
    //    Esli cislo naxoditsa v diapazone videlitie yego vosklicatelnimi znakami.

    //    1, 10 i cislo 6
    //    Vivod: 1 2 3 4 5 !6!7 8 9 10
    //int f_num;
    //int l_num;
    //int user_num;
    //cout << "Enter the first num: ";
    //cin >> f_num;
    //cout << "Enter the last num: ";
    //cin >> l_num;
    //while (true)
    //{
    //    cout << "Enter the num between the first and the last number: ";
    //    cin >> user_num;
    //    if (user_num > f_num && user_num < l_num)
    //    {
    //        for (int i{ f_num }; i <= l_num; i++)
    //        {
    //            if (i == user_num)
    //            {
    //                cout << "!" << i << "! ";
    //            }
    //            else
    //            {
    //                cout << i << " ";
    //            }
    //        }
    //        break;
    //    }
    //}
    //return 0;



        /*Задание 2
        Написать программу – конвертер валют.Реализовать общение с пользователем через меню.*/
    int user_choice;
    float user_quantity;
    cout << "Welcome to the currenct converter app!" << endl;
    while (true)
    {

        cout << "Select the currency to convert" << endl << endl;
        cout << "1. Azn" << endl;
        cout << "2. Dollar" << endl;
        cout << "3. Euro" << endl;
        cout << "4. Exit" << endl << endl;
        cin >> user_choice;
        if (user_choice == 4)
        {
            break;
        }
        else if (user_choice == 1)
        {
            cout << "What currency should I convert to?" << endl << endl;
            cout << "1. Dollar" << endl;
            cout << "2. Euro" << endl;
            cin >> user_choice;
            if (user_choice == 1)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 1.7 << " $" << endl << endl;
            }
            else if (user_choice == 2)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 1.83 << " €" << endl << endl;
            }
        }
        else if (user_choice == 2)
        {
            cout << "What currency should I convert to?" << endl << endl;
            cout << "1. Azn" << endl;
            cout << "2. Euro" << endl;
            cin >> user_choice;
            if (user_choice == 1)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 1.7 << " ₼" << endl << endl;
            }
            else if (user_choice == 2)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 0.93 << " €" << endl << endl;
            }
        }
        else if (user_choice == 3)
        {
            cout << "What currency should I convert to?" << endl << endl;
            cout << "1. Dollar" << endl;
            cout << "2. Azn" << endl;
            cin >> user_choice;
            if (user_choice == 1)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 1.08 << " $" << endl << endl;
            }
            else if (user_choice == 2)
            {
                cout << "Enter the quantity of your currency: ";
                cin >> user_quantity;
                cout << user_quantity * 1.83 << " ₼" << endl << endl;
            }
        }

    }
    return 0;
}
