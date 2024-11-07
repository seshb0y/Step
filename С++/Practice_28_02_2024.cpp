#include <iostream>

using namespace std;

//Задание 1
//Написать функцию, реализующую алгоритм линейного поиска заданного ключа в одномерном массиве.
int keySearch(int arr[], int size, int key)
{
	for (int i = 0; i < size; i++)
	{
		if (arr[i] == key)
		{
			return arr[i];
		}
	}
}


//Задание 3
//Написать функцию для перевода числа, записанного в двоичном виде, в десятичное представление.
//int pow(int a, int b)
//{
//    int c = a;
//    for (int i = 0; i < b - 1; i++)
//    {
//        c *= a;
//    }
//    return c;
//}

int decimal(int a)
{
    int count = 0;
    int b = a;
    while (b != 0)
    {
        b /= 10;
        count++;
    }
    int div = 10;
    for (int i = 0; i < count - 2; i++)
    {
        div *= 10;
    }
    int res = 0;
    b = count;
    count--;
    for (int i = 0; i < b; i++)
    {
        res += (a/div % 10 * pow(2, count));
        div /= 10;
        count--;
    }
    return res;
}

int main()
{
    int arr[10]{ 0,1,2,3,4,5,6,7,8,9 };
    cout << decimal(110);
}

