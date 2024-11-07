
#include <iostream>
using namespace std;
//Задание 3
//Написать функцию, принимающую в качестве аргумента, указатели на два массива(А и В) и размеры массивов.Функция проверяет,
//является ли массив В подмножеством массива А и возвращает указатель на начало найденного фрагмента, либо возвращает 0 в противном случае.
int* returnFirstEl(int* const f_arr, const int f_size, const int* const s_arr, const int s_size)
{
    int* ind = nullptr;
    bool flag = true;
    for (int i = 0; i < s_size; i++)
    {
        for (int j = 0; j < f_size; j++)
        {
            if (s_arr[i] == f_arr[j])
            {
                if (flag)
                {
                    ind = &f_arr[j];
                    flag = false;
                }
                break;
            }
            if (j + 1 == f_size)
            {
                return 0;
            }
        }
    }
    return ind;
}
//Задание 4
//Написать функцию, которая получает указатель на динамический массив и его размер.Функция должна удалить из массива все отрицательные числа и вернуть указатель на новый динамический массив.
void delNegative(int*& arr, int& size)
{
    int count = 0;
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < 0)
        {
            count++;
        }
    }
    int* newArr = new int[size - count];
    for (int i = 0, j = 0; i < size; i++)
    {
        if (arr[i] > 0)
        {
            newArr[j] = *(arr + i);
            j++;
        }
    }
    delete[] arr;
    size = size - count;
    arr = newArr;
}
//Задание 5
//Создать функцию, позволяющую добавлять блок элементов в конец массива.
//
void addBlock(int*& arr, int& size, int* add_arr, int add_size)
{
    int j = 0;
    int* newArr = new int[size + add_size];
    for (int i = 0; i < size; i++)
    {
        newArr[i] = arr[i];
        j++;
    }
    for (int i = 0; i < add_size; i++)
    {
        newArr[j] = add_arr[i];
        j++;
    }
    size = size + add_size;
    delete[] arr;
    arr = newArr;
}
//Задание 6
//Создать функцию, позволяющую вставлять блок элементов, начиная с произвольного индекса массива.
//
void addBlockByInd(int*& arr, int& size, int* add_arr, int add_size, int index)
{
    int f_count = 0;
    int s_count = 0;
    int* newArr = new int[size + add_size];
    for (f_count; f_count < size + add_size; f_count++)
    {
        if (f_count == index)
        {
            for (int j = 0; j < add_size; j++)
            {
                newArr[f_count] = add_arr[j];
                f_count++;
                s_count++;
            }
            f_count--;
            continue;
        }
        newArr[f_count] = arr[f_count - s_count];
    }
    size = size + add_size;
    delete[] arr;
    arr = newArr;
}
//Задание  7
//Создать функцию, позволяющую удалять блок элементов, начиная с произвольного индекса массива.
void delBlockByInd(int*& arr, int& size, int start, int end)
{
    int f_count = 0;
    int* newArr = new int[size - (end - start)];
    for (int i = 0; i < size; i++)
    {
        if (i >= start && i <= end)
        {
            continue;   
        }
        newArr[f_count] = arr[i];
        f_count++;
    }
    size = size - (end - start) - 1;
    delete[] arr;
    arr = newArr;
}

int main()
{
    int f_size = 10;
    int s_size = 5;
    int* f_arr = new int[f_size] {2, 6, 7, 9, 10, 11, 36,25,66,32};
    int* s_arr = new int[s_size] {8,10,11,6,13};
    delBlockByInd(f_arr, f_size, 1, 9);
    for (int i = 0; i < f_size; i++)
    {
        cout << f_arr[i] << ' ';
    }
}

