#include <iostream>
using namespace std;

//Napisat funkciyu kotoraya budet dobavlat cislo v dvumernom dinamiceskom massive v ukazannoye polzovateloem row col.
//
//
//Funckiya doiljan vigladit
//
//add_number(arr, size, row, col, value)

void add_number(int** arr, int& size, const int row, const int col, const int value)
{
	int* newArr = new int[size + 1];
	for (int i = 0, j = 0; i < size + 1; i++)
	{
		if (i == col)
		{
			newArr[i] = value;
			continue;
		}
		newArr[i] = arr[row][j];
		j++;
	}
	delete[] arr[row];
	arr[row] = newArr;
}

int main()
{
	int size = 4;
	int* ptrA = new int[size];
	int* ptrB = new int[size];
	int* ptrC = new int[size];
	int* ptrD = new int[size];
	int** ppArr = new int* [size] {ptrA, ptrB, ptrC, ptrD};
	for (int i = 0; i < 4; i++)
	{
		for (int j = 0; j < 4; j++)
		{
			ppArr[i][j] = rand() % 10;
		}
	}
	add_number(ppArr, size, 2, 2, 25);
	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < 5; j++)
		{
			cout << ppArr[i][j] << ' ';
		}
		cout << endl;
	}
}