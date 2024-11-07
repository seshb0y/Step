#include <iostream>

using namespace std;
int main()
{
		//Задание 1
		//Сжать(сдвинуть элементы) массив, удалив из него все 0, и заполнить освободившиеся справа элементы значениями - 1.
	//const int size = 10;
	//int count = 0;
	//int arr[size]{ 5,3,4,0,2,6,9,0,12,1, };
	//for (int i = 0; i < size; i++)
	//{
	//	if (arr[i] == 0)
	//	{
	//		count += 1;
	//		arr[i] = arr[size - count];	
	//		arr[size - count] = -1;
	//	}
	//}


		//Задание 2
		//Написать программу, копирующую элементы 2 - х массивов размером 5 элементов каждый в один массив размером 10 
		//элементов следующим образом : сначала копируются последовательно все элементы, большие 0, затем последовательно
		//все элементы, равные 0, а затем последовательно все элементы, меньшие 0.
	const int size = 5;
	const int size2 = 10;
	int arr1[size]{ -5,-3,0,2,6 };
	int count = 11;
	int arr2[size]{ 6,-4,0,7,-9 };
	int arr3[size2]{};
	for (int i = 0; i < size; i++)
	{
		if (arr1[i] > 0)
		{
			count -= 1;
			arr3[size2 - count] = arr1[i];
		}
		if (arr2[i] > 0)
		{
			count -= 1;
			arr3[size2 - count] = arr2[i];
		}
	}
	for (int i = 0; i < size; i++)
	{
		if (arr1[i] == 0)
		{
			count -= 1;
			arr3[size2 - count] = arr1[i];
		}
		if (arr2[i] == 0)
		{
			count -= 1;
			arr3[size2 - count] = arr2[i];
		}
	}
	for (int i = 0; i < size; i++)
	{
		if (arr1[i] < 0)
		{
			count -= 1;
			arr3[size2 - count] += arr1[i];
		}
		if (arr2[i] < 0)
		{
			count -= 1;
			arr3[size2 - count] += arr2[i];
		}
	}
	for (int i = 0; i < size2; i++)
	{
		cout << arr3[i] << endl;
	}


	return 0;
}