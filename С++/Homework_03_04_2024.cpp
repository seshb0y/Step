//Zadaniye
// 1) Realizovat udaleniye studenta po indeksu.
// 2) Realizovat poisk studenta po 
// Imeni i Familii (funkciya doljna vozvrawat indeks naydennogo 
// studenta kotoriy realizovan kak massiv stringov)
// 
// 3) Realizovat menu obweniya sistemi avtomatizacii uceta studentov.
	// MENU
	// 1 Add new student
	// 2 Delete Student (vnutri doljen vizivatsa poisk. to est polzovatel doljen vvesti ima i familiyu studenta kotorgo xochet udalit)
	// 3 Find student (Pecataet informaciyu pro odnogo studenta)
	// 4 Show All students
	// 5 Exit

	// Dopolnitelno kto zaxocet dobavit funkcional Izmineniya imeni familii ili vozrasta naydennogo studenta.

#include <iostream>
using namespace std;

void stuDataChange(string** arr, const int size, const int ind, const string new_data, const int name_1__surname_2__age_3)
{
	string* newStu = new string[3];
	for (int i = 0; i < 3; i++)
	{
		newStu[i] = arr[ind][i];
	}
	switch (name_1__surname_2__age_3)
	{
	case 1:
		newStu[0] = new_data;
		break;
	case 2:
		newStu[1] = new_data;
		break;
	case 3:
		newStu[2] = new_data;
		break;
	}
	delete[] arr[ind];
	arr[ind] = newStu;
	cout << "New student data" << endl;
	for (int i = 0; i < 3; i++)
	{
		cout << arr[ind][i] << '\t';
	}
	cout << endl;
}

int findStudent(string** const arr, const int size, const string name, const string surname)
{
	int ind = 0;
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i][0] == name && arr[i][1] == surname)
		{
			for (int j = 0; j < 3; j++)
			{
				cout << arr[i][j] << '\t';
				flag = false;
			}	
			ind = i;
			cout << endl << "Student index - " << i << endl;
			return ind;
		}
	}
	if (flag)
	{
		cout << "No students found" << endl;
		return 0;
	}

}
void findStudent(string** const arr, const int size, const int ind)
{
	if (ind <= size-1)
	{
		for (int j = 0; j < 3; j++)
		{
			cout << arr[ind][j] << '\t';
		}
		cout << endl;
	}
	else
	{
		cout << "invalid index" << endl;
	}
	
}
void findStudent(string** const arr, const int size, const string name_or_surname_or_age)
{
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i][0] == name_or_surname_or_age || arr[i][1] == name_or_surname_or_age || arr[i][2] == name_or_surname_or_age)
		{
			for (int j = 0; j < 3; j++)
			{
				cout << arr[i][j] << '\t';
				flag = false;
			}
			cout << endl;
		}
	}
	if (flag)
	{
		cout << "No students found"<< endl;
	}
}
void findStudent(string** const arr, const int size, const string name, const string surname, const string age)
{
	bool flag = true;
	for (int i = 0; i < size; i++)
	{
		if (arr[i][0] == name && arr[i][1] == surname && arr[i][2] == age)
		{
			for (int j = 0; j < 3; j++)
			{
				cout << arr[i][j] << '\t';
				flag = false;
			}
			cout << endl;
			break;
		}

	}
	if (flag)
	{
		cout << "No students found" << endl;
	}
}

void addNewStudent(string**& const arrStu, int& count, const string name, const string surname, const string age)
{
	string* newStudent = new string[3]{name, surname, age };
	string** new_arrStudents = new string * [count + 1];

	for (int i = 0; i < count; i++)
	{
		new_arrStudents[i] = arrStu[i];
	}
	new_arrStudents[count] = newStudent;
	delete[] arrStu;
	arrStu = new_arrStudents;
	count++;
}

void delStudent(string**& const arr, int& size, const string name, const string surname)
{
	string** newStudents = new string * [size-1];
	for (int i = 0, j = 0; i < size; i++)
	{
		if (arr[i][0] == name && arr[i][1] == surname)
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
void showAllStudents(string** const arrStu, const int count)
{
	for (int i = 0; i < count; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			cout << arrStu[i][j] << "\t";
		}
		cout << endl;
	}

}

int main()
{

	int count = 5;
	string** arrStud = new string * [count];
	arrStud[0] = new string[3]{ "Orxan", "Mamedov", "24" };
	arrStud[1] = new string[3]{ "Ayan", "Qurbanova", "27" };
	arrStud[2] = new string[3]{ "Johny", "Silverhand", "24" };
	arrStud[3] = new string[3]{ "Artur", "Morgan", "26" };
	arrStud[4] = new string[3]{ "Johnathan", "Snow", "20" };
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
					findStudent(arrStud, count, name, surname);
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