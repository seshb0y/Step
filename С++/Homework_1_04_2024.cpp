
#include <iostream>
using namespace std;

void fillArray(int* const arr, const int size)
{
	for (int i = 0; i < size; i++)
	{
		arr[i] = rand() % 10;
	}
}

void printArr(const int* const arr, const int size)
{
	for (int i = 0; i < size; i++)
	{
		cout << arr[i] << ' ';
	}
	cout << endl;
}
void delInd(int*& arr, int& size, int index)
{
	int* newArr = new int[size - 1];
	for (int i = 0; i < size; i++)
	{
		if (i < index)
		{
			swap(newArr[i], arr[i]);
		}
		else swap(newArr[i], arr[i + 1]);
	}
	size--;
	delete[] arr;
	arr = newArr;
}

int main()
{
	int size = 5;
	int* myArr = new int[size];
	cout << size << " size" << endl;
	cout << myArr << " myArr adress" << endl;
	fillArray(myArr, size);
	printArr(myArr, size);
	delInd(myArr, size, 1);
	printArr(myArr, size);
	cout << size << " size" << endl;
	cout << myArr << " myArr adress" << endl;
}

