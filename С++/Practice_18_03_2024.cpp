#include <iostream>
using namespace std;
//Polzovatel vvodit stroku.(char massiv)
//
//
//i imeyetsa ukazatel na funkciyu .
//
//Takje sozdat 3 funkcii kajdaya iz kotorix budet vivodit tekst s
//1) - mejdu bukvami
//2) # mejdu bukvami
//3) $ mejdu bukvami
//
//Posle vvoda polzovatelem massiva charov, polzovatel vibiraet dekaraciyu togo kak budet vivoditsa tekst.
//
//Vizov konecnoy funkcii doljen proizoyti cerez ukazatel na funkciyu.

void hyphen(char arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		if (arr[i] < 97 || arr[i] > 122)
		{
			arr[i] = '-';
		}
	}
	for (int i = 0; i < size; i++)
	{
		cout << arr[i];
	}
}

void lattice(char arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		if (arr[i] < 97 || arr[i] > 122)
		{
			arr[i] = '#';
		}
	}
	for (int i = 0; i < size; i++)
	{
		cout << arr[i];
	}
}

void dollar(char arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		if (arr[i] < 97 || arr[i] > 122)
		{
			arr[i] = '$';
		}
	}
	for (int i = 0; i < size; i++)
	{
		cout << arr[i];
	}
}

int main()
{
	char u_str[] = {"hello my name is user"};
	int size = sizeof(u_str) / sizeof(char);
	void (*(decor[3]))(char arr[], int size) = {hyphen, lattice, dollar};
	cout << "1) - mejdu bukvami \n2) # mejdu bukvami \n3) $ mejdu bukvami";
	int u_choice = 0;
	cin >> u_choice;
	if (u_choice == 1)
	{
		decor[0](u_str, size);
	}
	else if (u_choice == 2)
	{
		decor[1](u_str, size);
	}
	else decor[2](u_str, size);
}
