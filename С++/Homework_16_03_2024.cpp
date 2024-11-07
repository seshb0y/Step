#include <iostream>

using namespace std;

//Задание 1
//Написать рекурсивную функцию нахождения степени числа.
int degree(int num, int power)
{
	if (power == 1)
	{
		return num;
	}
	return num * degree(num, power - 1);
}


//Задание 2
//Написать рекурсивную функцию, которая выводит N звезд в ряд, число N задает пользователь.Проиллюстрируйте работу функции примером.
void stars(int num)
{
	if (num > 1)
	{
		stars(num-1);
	}
	cout << "*";
}


//
//Задание 3
//Написать рекурсивную функцию, которая вычисляет сумму всех чисел в диапазоне от a до b.Пользователь вводит a и b.Проиллюстрируйте работу функции примером.
int recSum(int a, int b)
{
	if (a < b-1)
	{
		a = recSum(a, b - 1);
	}
	return a + b;
}

//
//Задание 4
//Напишите рекурсивную функцию, которая принимает одномерный массив из 100 целых чисел 
// заполненных случайным образом и находит позицию, с которой начинается последовательность из 10 чисел, сумма которых минимальна.

int minSum(int arr[], int size)
{
	int current_sum = 0;
	if (size != - 1)
	{
		int min_sum = minSum(arr, size - 1);
		if (min_sum == size - 1 || size >= 90)
		{
			if (size >= 90 && size <= 99)
			{	
				return min_sum;
			}
			else if (size == 100)
			{
				int start = 0;
				int summary = 0;
				while (start + 10 != size)
				{
					for (int i = start; i < start + 10; i++)
					{
						summary += arr[i];
					}
					if (summary == min_sum)
					{
						return start;
					}
					summary = 0;
					start++;
				}
			}
			min_sum = 0;
			for (int i = size -1; i < size - 1 + 10; i++)
			{
				min_sum += arr[i];
			}	
		}
		for (int i = size; i < size + 10; i++)
		{
			current_sum += arr[i];
		}
		if (size == 0)
		{
			min_sum = current_sum;
		}
		if (min_sum > current_sum)
		{
			min_sum = current_sum;
		}
		return min_sum;
	}
}

//Задание 5
//Написать перегруженные функции и протестировать их в основной программе :
//
//Нахождения максимального значения в одномерном массиве;
//Нахождения максимального значения в двумерном массиве;
//Нахождения максимального значения в трёхмерном массиве;
//Нахождения максимального значения двух целых;
//Нахождения максимального значения трёх целых.

int maxValue(int arr[], int size)
{
	int max = arr[0];
	for (int i = 0; i < size; i++)
	{
		if (max > arr[i])
		{
			max = arr[i];
		}
	}
	return max;
}
int maxValue(int arr[][5], int size)
{
	int max = arr[0][0];
	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < 5; j++)
		{
			if (max > arr[i][j])
			{
				max = arr[i][j];
			}
		}
			
	}
	return max;
}

int maxValue(int arr[][5][5], int size)
{
	int max = arr[0][0][0];
	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < 5; j++)
		{
			for (int z = 0; z < 5; z++)
			{

				if (max > arr[i][j][z])
				{
					max = arr[i][j][z];
				}
			}

		}
		return max;
	}
}

int maxValue(int a, int b)
{
	if (a > b)
	{
		return a;
	}
	return b;
}

int maxValue(int a, int b, int c)
{
	if (a > b && a > c)
	{
		return a;
	}
	else if (b > a && b > c)
	{
		return b;
	}
	return c;
}

int main()
{
	//cout << degree(4, 4);
	//stars(10);
	//cout << recSum(10, 20);
	int arr[100] = {};
	for (int i = 0; i < 100; i++)
	{
		arr[i] = rand() % 10;
	}
	for (int i = 0; i < 100; i++)
	{
		cout << arr[i] << " ";
	}
	cout << endl << minSum(arr, 100);
}
