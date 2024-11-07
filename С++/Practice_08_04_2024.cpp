#include <iostream>
using namespace std;


//Zadaniye1
//
//Sozdat ukazatel na ukazatel kotoriy ukazivaet na massiv ukazateley.Kajdiy ukazatel Massiva doljen ukazivat na obyekt klassa Student.
//
//
//Doljniy funkcional.
//MENU
//1) Dobavleniye studenta
//2) Udaleniye studenta
//3) Poisk studenta.
//4) Vivod vsex studentov na ekran

class Student
{
public:
	string name;
	string surname;
	string age;

	Student()
	{

	}

	Student(string name, string surname, string age)
	{
		this->name = name;
		this->surname = surname;
		this->age = age;
	}

	void showInfo()
	{
		cout << "Name: " << name << endl;
		cout << "Surname: " << surname << endl;
		cout << "Age: " << age << endl;
	};
};

void stuDataChange(Student** arr, const int size, const int ind, const string name,  const int name_1__surname_2__age_3)
{
	Student* newStu = new Student();
	newStu = arr[ind];
	switch (name_1__surname_2__age_3)
	{
	case 1:
		newStu->name = name;
		break;
	case 2:
		newStu->surname = name;
		break;
	case 3:
		newStu->age = name;
		break;
	}
	delete[] arr[ind];
	arr[ind] = newStu;
	cout << "New student data" << endl;
	arr[ind]->showInfo();
}

int findStudent(Student** const arr, const int size, const string name, const string surname)
{
	int ind = 0;
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i]->name == name && arr[i]->surname == surname)
		{
			arr[i]->showInfo();
			flag = false;
			ind = i;
			cout << endl << "Student index - " << i << endl;
			return ind;
		}
	}
	if (flag)
	{
		
		return -1;
	}

}
void findStudent(Student** const arr, const int size, const int ind)
{
	if (ind <= size - 1)
	{
		arr[ind]->showInfo();
	}
	else
	{
		cout << "invalid index" << endl;
	}

}
void findStudent(Student** const arr, const int size, const string name_or_surname_or_age)
{
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i]->name == name_or_surname_or_age || arr[i]->surname == name_or_surname_or_age || arr[i]->age == name_or_surname_or_age)
		{
			arr[i]->showInfo();
			flag = false;
		}
	}
	if (flag)
	{
		cout << "No students found" << endl;
	}
}
void findStudent(Student** const arr, const int size, const string name, const string surname, const string age)
{
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i]->name == name && arr[i]->surname == surname && arr[i]->age == age)
		{
			arr[i]->showInfo();
			flag = false;
			break;
		}

	}
	if (flag)
	{
		cout << "No students found" << endl;
	}
}

void addNewStudent(Student**& const arrStu, int& count, const string name, const string surname, const string age)
{
	Student* newStudent = new Student(name, surname, age);
	Student** new_arrStudents = new Student * [count + 1];

	for (int i = 0; i < count; i++)
	{
		new_arrStudents[i] = arrStu[i];
	}
	new_arrStudents[count] = newStudent;
	delete[] arrStu;
	arrStu = new_arrStudents;
	count++;
}

void delStudent(Student**& const arr, int& size, const string name, const string surname)
{
	Student** newStudents = new Student * [size - 1];
	for (int i = 0, j = 0; i < size; i++)
	{
		if (arr[i]->name == name && arr[i]->surname == surname)
		{
			continue;
		}
		newStudents[j] = arr[i];
		j++;
	}
	delete[] arr;
	--size;
	arr = newStudents;
}
void showAllStudents(Student** const arrStu, const int count)
{
	for (int i = 0; i < count; i++)
	{
		arrStu[i]->showInfo();
	}

}

int main()
{

	int count = 5;
	Student** arrStud = new Student * [count];
	arrStud[0] = new Student("Artur", "Morgan", "29");
	arrStud[1] = new Student("Tommy", "Versetti", "22");
	arrStud[2] = new Student("John", "Connor", "29");
	arrStud[3] = new Student("Paul", "Atreidis", "21");
	arrStud[4] = new Student("Feith", "Rauta", "19");
	int u_choice;
	while (true)
	{
		cout << "MENU" << endl;
		cout << "1. Add new student";
		string name;
		string surname;
		string age;
		cout << "\n2. Delete Student";
		int ind;
		cout << "\n3. Find student";
		cout << "\n4. Change student information";
		cout << "\n5. Show All Students";
		cout << "\n6. Exit" << endl;
		cin >> u_choice;
		switch (u_choice)
		{
		case 1:
			cout << "---------------------------------------------------------------" << endl;
			cout << "Enter student information: " << endl;
			cout << "Name: ";
			cin >> name;
			cout << "Surname: ";
			cin >> surname;
			cout << "Age: ";
			cin >> age;
			addNewStudent(arrStud, count, name, surname, age);
			cout << "New student added" << endl;
			cout << "---------------------------------------------------------------" << endl;
			continue;
		case 2:
			cout << "---------------------------------------------------------------" << endl;
			cout << "Enter name and surname of the student you want to remove" << endl;
			cout << "Name: ";
			cin >> name;
			cout << "Surname: ";
			cin >> surname;
			cout << "Are you sure that you want to remove " << name << ' ' << surname << "? (1 - yes / 2 - no)" << endl;
			cin >> u_choice;
			if (u_choice == 2)
			{
				continue;
			}
			delStudent(arrStud, count, name, surname);
			cout << "Student removed" << endl;
			cout << "-------------------------------------------------------------" << endl;
			continue;
		case 3:
			while (true)
			{
				cout << "---------------------------------------------------------------" << endl;
				cout << "1. Search for a student by first and last name with index finding" << endl;
				cout << "2. Search for student by index" << endl;
				cout << "3. Search for matches by last name, first name or age" << endl;
				cout << "4. Search for a student by last name, first name and age" << endl;
				cout << "5. Return to menu" << endl;
				cin >> u_choice;
				switch (u_choice)
				{
				case 1:
					cout << "---------------------------------------------------------------" << endl;
					cout << "Name: ";
					cin >> name;
					cout << "Surname: ";
					cin >> surname;
					if (findStudent(arrStud, count, name, surname) == -1)
					{
						cout << "No students found" << endl;
					}
					else
					{
						findStudent(arrStud, count, name, surname);
					}
					continue;
				case 2:
					cout << "---------------------------------------------------------------" << endl;
					cout << "Enter the index: ";
					cin >> ind;
					findStudent(arrStud, count, ind);
					continue;
				case 3:
					cout << "---------------------------------------------------------------" << endl;
					cout << "Enter name, suname or age of the student: ";
					cin >> age;
					findStudent(arrStud, count, age);
					continue;
				case 4:
					cout << "---------------------------------------------------------------" << endl;
					cout << "Enter name, suname and age of the student" << endl;
					cout << "Name: ";
					cin >> name;
					cout << "Surname: ";
					cin >> surname;
					cout << "Age: ";
					cin >> age;
					findStudent(arrStud, count, name, surname, age);
					continue;
				case 5:
					break;
				}
				break;
			}
			cout << "---------------------------------------------------------------" << endl;
			continue;
		case 4:
			while (true)
			{
				cout << "---------------------------------------------------------------" << endl;
				cout << "Select index of student which data you want to change: ";
				cin >> ind;
				cout << "1. Change name \n2. Change surname \n3. Change age" << endl;
				cin >> u_choice;
				cout << " Enter new data: ";
				cin >> name;
				stuDataChange(arrStud, count, ind, name, u_choice);
				cout << "Need more changes?(1 - yes / 2 - no): ";
				cin >> u_choice;
				if (u_choice == 1)
				{
					continue;
				}
				cout << "---------------------------------------------------------------" << endl;
				break;
			}
			continue;
		case 5:
			cout << "---------------------------------------------------------------" << endl;
			showAllStudents(arrStud, count);
			cout << "-------------------------------------------------------------" << endl;
			continue;
		case 6:
			break;
		}
		break;
	}
}
