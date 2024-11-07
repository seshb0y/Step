#include <iostream>
using namespace std;

	//Задание №1
	//Реализуйте класс “Студент”.Необходимо хранить в переменных - членах класса : ФИО, дату рождения, контактный телефон,
	//город, страну, название учебного заведения, город и страну(где
 //   находится учебное заведение), номер группы.Реализуйте функции - члены класса для ввода данных, вывода данных

 //   Задание №2
 //   Реализуйте класс “Точка”.Необходимо хранить координаты
 //   x, y, z в переменных - членах класса.Реализуйте функции - члены
 //   класса для ввода данных, вывода данных


 //   zADANIYE 3.

 //   sOZDAT MASSIV IZ 5ti sTUDENTOV


 //   Dat vozmojsniost polzovatelu pronincilizoravt(vvesti imena vozrast i td) vsex studentov cerez cikl.


class Student
	{
	public:
		string name;
		string surname;
		string bDate;
		string pNumber;
		string country;
		string city;
		string inst;
		string i_country;
		string i_city;
		string gNum;
	
		Student()
		{

		}
	
		Student(string name, string surname, string bDate, string pNumber, string country, string city, string inst, string i_country, string i_city, string gNum)
		{
			this->name = name;
			this->surname = surname;
			this->bDate = bDate;
			this->pNumber = pNumber;
			this->country = country;
			this->city = city;
			this->inst = inst;
			this->i_country = i_country;
			this->i_city = i_city;
			this->gNum = gNum;
		}
	
		void showInfo()
		{
			cout << "Name: " << name << endl;
			cout << "Surname: " << surname << endl;
			cout << "Date of birth: " << bDate << endl;
			cout << "Phone number: " << pNumber << endl;
			cout << "Country: " << country << endl;
			cout << "City: " << city << endl;
			cout << "Education institute: " << inst << endl;
			cout << "Education institute location: " << i_country << '\t' << i_city << endl;
			cout << "Group number: " << gNum << endl;
			cout << "-------------------------------------------------" << endl;
		};
	};
class Dot
{
public:
	int x;
	int y;
	int z;
	void dChange(int x, int y, int z)
	{
		this->x = x;
		this->y = y;
		this->z = z;
	};

	void showInfo()
			{
				cout << "X: " << x << endl;
				cout << "Y: " << y << endl;
				cout << "Z: " << z << endl;
			};
};
int main()
{

	//Student stu1 = Student("Johnny", "Sikverhand", "21.09.1980", +7861546456, "USA", "Los-Angeles", "MIT", "USA", "Meriland", 23);
	Student stu1;
	Student stu2;
	Student stu3;
	Student stu4;
	Student stu5;
	const int size = 5;
	Student* stu = new Student[size]{ stu1, stu2, stu3, stu4, stu5 };
	for (int i = 0; i < size; i++)
	{
		cin >> stu[i].name;
		cin >> stu[i].surname;
		cin >> stu[i].bDate;
		cin >> stu[i].pNumber;
		cin >> stu[i].country;
		cin >> stu[i].city;
		cin >> stu[i].inst;
		cin >> stu[i].i_country;
		cin >> stu[i].i_city;
		cin >> stu[i].gNum;
	}
	for (int i = 0; i < size; i++)
	{
		stu[i].showInfo();
	}
}
