

#include <iostream>
using namespace std;

int main()
{
        /*Задание 1
        Написать функцию, которая удаляет из строки символ с заданным номером, i zamenaet yeyo na probel i perevodit v konec stroki..*/

    char str[100];
    cout << "Enter a string: ";
    cin.getline(str, 100, '\n');
    cout << "Enter the number of symbol: ";
    int u_ind;
    cin >> u_ind;
    int ind = 0;
    int b;  
    u_ind--;
    for (int i = 0; str[i] != '\0'; i++)
    {
        if (str[i] == str[u_ind])
        {
            for (int j = ind; str[j] != '\0'; j++)
            {
                str[j] = ' ';
                int b = str[j + 1];
                str[j + 1] = str[j];
                str[j] = b;
            }
            break;
        }
        ind++;
    }



        //Задание 2
        //Написать программу, которая заменяет все символы точки "." в строке, введенной пользователем, на символы восклицательного знака "!".
    

    //char str[100];
    //cout << "Enter a string: ";
    //cin.getline(str, 100, '\n');
    //for (int i = 0; str[i] != '\0'; i++)
    //{
    //    if (str[i] == '.')
    //    {
    //        str[i] = '!';
    //    }
    //}

        /*Задание 3
        //Пользователь вводит строку символов и искомый символ, посчитать сколько раз он встречается в строке.*/

    //char str[] = { "Hello. world! python! step. !! acade..my" };
    //char search;
    //cout << "Enter a symbol: ";
    //cin >> search;
    //int count = 0;
    //for (int i = 0; str[i] != '\0'; i++)
    //{
    //    if (str[i] == search)
    //    {
    //        count++;
    //    }
    //}

        /*Задание 4
        Пользователь вводит строку.Определить количество букв, количество цифр и количество остальных символов, присутствующих в строке.*/

    //char u_arr[]{ "Hello, world, ***, 92,14,!,..." };
    //int alpha = 0;
    //int num = 0;
    //int symb = 0;
    //for (int i = 0; u_arr[i] != '\0'; i++)
    //{
    //    if (u_arr[i] >= 48 && u_arr[i] <= 57)
    //    {
    //        num++;
    //    }
    //    else if ((u_arr[i] >= 65 && u_arr[i] <= 90) || (u_arr[i] >= 97 && u_arr[i] <= 122))
    //    {
    //        alpha++;
    //    }
    //    else
    //    {
    //        symb++;
    //    }
    //}
    //cout << num << endl << alpha << endl << symb << endl;
}
