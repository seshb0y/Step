#include <iostream>
using namespace std;

//Задание 1
//Написать функцию, которая принимает две даты(т.е.функция принимает шесть параметров) и вычисляет разность в днях между этими датами.
//Для решения этой задачи необходимо также написать функцию, которая определяет, является ли год високосным.
int isLeap(int a)
{
	if (a % 4 == 0)
	{
		return true;
	}
	return false;
}

int dayDif(int day, int month, int year, int d, int m, int y)
{
	cout << day << '.' << month << '.' << year << endl << d << '.' << m << '.' << y << endl;
	if (year > y)
	{
		swap(year, y);
		swap(month, m);
		swap(day, d);
	}
	int l_res = 0;
	if (isLeap(year) == true)
	{
		switch (month)
		{
		case 1:
			l_res += day;
			break;
		case 2:
			l_res = 31 + day;
			break;
		case 3:
			l_res = 60 + day;
			break;
		case 4:
			l_res = 91 + day;
			break;
		case 5:
			l_res = 121 + day;
			break;
		case 6:
			l_res = 152 + day;
			break;
		case 7:
			l_res = 182 + day;
			break;
		case 8:
			l_res = 213 + day;
			break;
		case 9:
			l_res = 244 + day;
			break;
		case 10:
			l_res = 274 + day;
			break;
		case 11:
			l_res = 305 + day;
			break;
		case 12:
			l_res = 335 + day;
			break;
		}
	}
	else
	{
		switch (month)
		{
		case 1:
			l_res += day;
			break;
		case 2:
			l_res = 31 + day;
			break;
		case 3:
			l_res = 59 + day;
			break;
		case 4:
			l_res = 90 + day;
			break;
		case 5:
			l_res = 120 + day;
			break;
		case 6:
			l_res = 151 + day;
			break;
		case 7:
			l_res = 181 + day;
			break;
		case 8:
			l_res = 212 + day;
			break;
		case 9:
			l_res = 243 + day;
			break;
		case 10:
			l_res = 273 + day;
			break;
		case 11:
			l_res = 304 + day;
			break;
		case 12:
			l_res = 334 + day;
			break;
		}
	}
	int r_res = 0;
	if (isLeap(y) == true)
	{
		switch (m)
		{
		case 1:
			r_res += d;
			break;
		case 2:
			r_res = 31 + d;
			break;
		case 3:
			r_res = 60 + d;
			break;
		case 4:
			r_res = 91 + d;
			break;
		case 5:
			r_res = 121 + d;
			break;
		case 6:
			r_res = 152 + d;
			break;
		case 7:
			r_res = 182 + d;
			break;
		case 8:
			r_res = 213 + d;
			break;
		case 9:
			r_res = 244 + d;
			break;
		case 10:
			r_res = 274 + d;
			break;
		case 11:
			r_res = 305 + d;
			break;
		case 12:
			r_res = 335 + d;
			break;
		}
	}
	else
	{
		switch (m)
		{
		case 1:
			r_res += d;
			break;
		case 2:
			r_res = 31 + d;
			break;
		case 3:
			r_res = 59 + d;
			break;
		case 4:
			r_res = 90 + d;
			break;
		case 5:
			r_res = 120 + d;
			break;
		case 6:
			r_res = 151 + d;
			break;
		case 7:
			r_res = 181 + d;
			break;
		case 8:
			r_res = 212 + d;
			break;
		case 9:
			r_res = 243 + d;
			break;
		case 10:
			r_res = 273 + d;
			break;
		case 11:
			r_res = 304 + d;
			break;
		case 12:
			r_res = 334 + d;
			break;
		}
	}
	int res = 0;
	res = r_res - l_res;
	for (int i = year; i != y; i++)
	{
		if (i % 4 == 0)
		{
			res += 366;
		}
		else res += 365;
	}

	return res;
}

//
//
//zADANIE 2
//
//Napisat funkciyu kototraya sortiruye massiv po ubivaniyu po obe storoni ot naydennogo cisla vvenniy polzovatelem.
void sort(int arr[], int size, int num)
{
	int ind;
	for (int i = 0; i < size; i++)
	{
		if (arr[i] == num)
		{
			ind = i;
			break;
		}
	}
	for (int i = 1; i < ind; i++)
	{
		int j = i - 1;
		while (j >= 0 && arr[j] > arr[j + 1])
		{
			swap(arr[j], arr[j + 1]);
			j--;
		}
	}
	for (int i = ind + 2; i < size; i++)
	{
		int j = i - 1;
		while (j >= ind + 1 && arr[j] < arr[j + 1])
		{
			swap(arr[j], arr[j + 1]);
			j--;
		}
	}
}

//
//
//Zadanioe 3
//
//Sozdat dvumerniy massiv 3x5.
//Napisat funkciyu kotoraya budet sortirovat vnutrennie massivi po vtoroy kolonke.
//
//1 5 6
//2 4 3
//9 7 2
//8 1 4
//
//Reziultat:
//8 1 4
//2 4 3
//1 5 6
//9 7 2

void doubleSort(int arr[][3], int size)
{
	for (int i = 1; i < size; i++)
	{
		int j = i - 1;
		while (j>= 0 && arr[j][1] > arr[j+1][1])
		{
			swap(arr[j][1], arr[j + 1][1]);
			j--;
		}
	}
}

int main()
{
	
	int arr[5][3]{  {1,5,6},
					{2,4,3},
					{9,7,2},
					{8,1,4},
					{3,6,9} };
	doubleSort(arr, 5);
	for (int i = 0; i < 5; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			cout << arr[i][j] << " ";
		}
		cout << endl;
	}
}
