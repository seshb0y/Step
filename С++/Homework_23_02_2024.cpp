
#include <iostream>

using namespace std;
int main()
{
    //ЗАДАНИЕ 1
    //В одномерном массиве, заполненном случайными числами,
    //определить минимальный и максимальный элементы.

    /*const int size = 10;
    int arr[size]{ 11,42,15,52,67,98,4,64,756,236 };
    int min = arr[1];
    int max = arr[1];
    for (int i = 0; i < size; i++)
    {
        if (arr[i] > max)
        {
            max = arr[i];
        }
        else if (arr[i] < min)
        {
            min = arr[i];
        }
    }*/

   /* ЗАДАНИЕ 2
    В одномерном массиве, заполненном случайными числами
    в заданном пользователем диапазоне, найти сумму элементов,
    значения которых меньше указанного пользователем.*/

   /* const int size = 10;
    int arr[size]{ 113,4265,15,52126,6723,982,44,624,7566,36 };
    int u_num;
    int res = 0;
    cout << "Enter the number: ";
    cin >> u_num;
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < u_num)
        {
            res += arr[i];
        }
    }*/

    /* ЗАДАНИЕ 3
     Пользователь вводит прибыль фирмы за год(12 месяцев).
     Затем пользователь вводит диапазон(например, 3 и 6 — поиск
     между 3 - м и 6 - м месяцем).Необходимо определить месяц,
     в котором прибыль была максимальна и месяц, в котором
     прибыль была минимальна с учетом выбранного диапазона.*/

    //const int size = 12;
    //int arr[size];
    //int s_range;
    //int e_range;
    //for (int i = 0; i < size; i++)
    //{
    //    cout << 1 + i << ": ";
    //    cin >> arr[i];
    //}
    //cout << "Enter the range: " << endl;
    //cin >> s_range;
    //cin >> e_range;
    //int min = arr[s_range];
    //int max = arr[s_range];
    //for (int i = s_range; i < e_range; i++)
    //{
    //    if (arr[i] > max)
    //    {
    //        max = arr[i];
    //    }
    //    if (arr[i] < min)
    //    {
    //        min = arr[i];
    //    }
    //}
    //cout << max << endl << min;
    

     /*ЗАДАНИЕ 4
     В одномерном массиве, состоящем из N вещественных
     чисел вычислить :
     ■ Сумму отрицательных элементов.
     ■ Произведение элементов, находящихся между min и max
     элементами.
     ■ Произведение элементов с четными номерами.
     ■ Сумму элементов, находящихся между первым и последним отрицательными элементами*/

    const int size = 10;
    double arr[size]{ -2.5, 5.32, 5.2, -7.23, 12.4, -3.67, 2.45, -8.78, 9.43, -6.15 };

    double neg_sum = 0;
    
    int min_ind = 0;
    int max_ind = 0;
    double multiply;


    double e_multiply = arr[2];

    int f_neg_ind = -1;
    int l_neg_ind;
    double between_sum;

    for (int i = 0; i < size; i++)
    {
        if (arr[i] < 0)
        {
            neg_sum += arr[i];
            if (f_neg_ind == -1)
            {
                f_neg_ind = i;
            }
            l_neg_ind = i;
        }
        if (arr[i] < arr[min_ind])
        {
            min_ind = i;
        }
        if (arr[i] > arr[max_ind])
        {
            max_ind = i;
        }
        if (i % 2 == 0 && i != 2)
        {
            e_multiply *= arr[i];
        }
    }
    if (min_ind > max_ind)
    {
        int b = max_ind;
        max_ind = min_ind;
        min_ind = b;
        
    }
    multiply = arr[min_ind];


    for (int i = min_ind + 1; i < max_ind + 1; i++)
    {
        multiply *= arr[i];
    }

    between_sum = arr[f_neg_ind + 1];
    for (int i = f_neg_ind + 2; i < l_neg_ind; i++)
    {
        between_sum += arr[i];
    }

    cout << neg_sum << endl << multiply << endl << e_multiply << endl << between_sum;

    return 0;
}

