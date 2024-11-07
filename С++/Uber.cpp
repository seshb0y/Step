// Zadaniye
// Napisat funkcii add() find() delete_by_Index() dla CustomersArr i TripsArr;



#include <iostream>
using namespace std;

class Car
{
public:
	Car(string model, string carNumber, int carYear, string color)
	{
		this->model = model;
		this->carNumber = carNumber;
		this->year = carYear;
		this->color = color;
	}

	string model;
	string carNumber;
	int year;
	string color;

	void showInfo()
	{
		cout << model << " - " << carNumber << " - " << year << " - " << color << endl;
	}

};
class Trip;

class TaxiDriver
{
public:
	TaxiDriver(string name, string surname, int age, string model, string carNumber, int carYear, string color)
	{
		this->name = name;
		this->surname = surname;
		this->age = age;
		this->moneyBalance = 0;
		car = new Car(model, carNumber, carYear, color);


	};

	string name;
	string surname;
	int age;
	double moneyBalance;
	Car* car;
	Trip** taxiDriver_TripsArr;

	void showInfo()
	{
		cout << name << endl;
		cout << surname << endl;
		cout << age << endl;
		cout << moneyBalance << endl;
		car->showInfo();
		cout << endl;

	}
};

class Customer
{
public:
	Customer(string name, string surname, int age)
	{
		this->name = name;
		this->surname = surname;
		this->age = age;
		Trip** customerTripsArr = nullptr;
	};

	string name;
	string surname;
	int age;
	Trip** customer_TripsArr;

	void showInfo()
	{
		cout << name << endl;
		cout << surname << endl;
		cout << age << endl;
	}
};

class Trip
{
public:
	Trip(TaxiDriver* taxiDriver, Customer* customer, int distance)
	{
		this->taxiDriver = taxiDriver;
		this->customer = customer;
		this->distance = distance;
		this->totalPrice = distance * 0.5;
	};
	// moment finishTrip() tolko togda budet vichitivatsa summa deneg s klienta i zacislatsa na balance voditela
	TaxiDriver* taxiDriver;
	Customer* customer;
	int distance;
	double totalPrice;

	void showInfo()
	{
		taxiDriver->showInfo();
		customer->showInfo();
		cout << distance << endl;
		cout << totalPrice << endl;
	}
};



class Uber
{
public:
	Uber()
	{
		this->taxiDriversArr = new TaxiDriver * [size_taxiDriversArr];
		this->customersArr = new Customer * [size_customersArr];
		this->tripsArr = new Trip * [size_tripsArr];

	};
	TaxiDriver** taxiDriversArr;
	int size_taxiDriversArr = 0;

	Customer** customersArr;
	int size_customersArr = 0;

	Trip** tripsArr;
	int size_tripsArr = 0;

	//CRUD

	//////////////////////// CRUD TaxiDriver

	void addNewTaxiDriver(string name, string surname, int age, string model, string carNumber, int carYear, string color)
	{
		TaxiDriver* new_TaxiDriver = new TaxiDriver(name, surname, age, model, carNumber, carYear, color);

		TaxiDriver** newTaxiDriversArr = new TaxiDriver * [size_taxiDriversArr + 1];

		for (int i = 0; i < size_taxiDriversArr; i++)
		{
			newTaxiDriversArr[i] = taxiDriversArr[i];
		}
		newTaxiDriversArr[size_taxiDriversArr] = new_TaxiDriver;

		delete[] taxiDriversArr;
		taxiDriversArr = newTaxiDriversArr;
		size_taxiDriversArr++;
	}
	int findTaxiDriverIndex(string name, string surname)
	{
		for (int i = 0; i < size_taxiDriversArr; i++)
		{
			if (taxiDriversArr[i]->name == name && taxiDriversArr[i]->surname == surname)
			{
				return i;
			}

		}
		return -1;
	}

	void deleteTaxiDriver(int index)
	{
		TaxiDriver** newTaxiDriversArr = new TaxiDriver * [size_taxiDriversArr - 1];

		for (int i = 0, j = 0; i < size_taxiDriversArr; i++)
		{
			if (i == index)
			{
				continue;
			}
			newTaxiDriversArr[j] = taxiDriversArr[i];
			j++;
		}
		delete[] taxiDriversArr;
		taxiDriversArr = newTaxiDriversArr;
		size_taxiDriversArr--;
	}






	//////////////////////// CRUD Customer
	//add() find() delete_by_Index()
	void addNewCustomer(string name, string surname, int age)
	{
		Customer* new_Customer = new Customer(name, surname, age);

		Customer** newCustomerArr = new Customer * [size_customersArr + 1];

		for (int i = 0; i < size_customersArr; i++)
		{
			newCustomerArr[i] = customersArr[i];
		}
		newCustomerArr[size_customersArr] = new_Customer;

		delete[] customersArr;
		customersArr = newCustomerArr;
		size_customersArr++;
	}

	int findCustomerIndex(string name, string surname)
	{
		for (int i = 0; i < size_customersArr; i++)
		{
			if (customersArr[i]->name == name && customersArr[i]->surname == surname)
			{
				return i;
			}

		}
		return -1;
	}

	void deleteCustomer(int index)
	{
		Customer** newCustomerArr = new Customer * [size_customersArr - 1];

		for (int i = 0, j = 0; i < size_customersArr; i++)
		{
			if (i == index)
			{
				continue;
			}
			newCustomerArr[j] = customersArr[i];
			j++;
		}
		delete[] customersArr;
		customersArr = newCustomerArr;
		size_customersArr--;
	}



	//////////////////////// CRUD Trip
	void addNewTrip(TaxiDriver* taxiDriver, Customer* customer, int distance)
	{
		Trip* newTrip = new Trip(taxiDriver, customer, distance);
		Trip** newTripArr = new Trip * [size_tripsArr + 1];
		for (int i = 0; i < size_tripsArr; i++)
		{
			newTripArr[i] = tripsArr[i];
		}
		newTripArr[size_tripsArr] = newTrip;

		delete[] tripsArr;
		tripsArr = newTripArr;
		size_tripsArr++;
	}

	int findTripIndex(TaxiDriver* taxiDriver, Customer* customer, int distance)
	{
		for (int i = 0; i < size_tripsArr; i++)
		{
			if (tripsArr[i]->distance == distance &&
				tripsArr[i]->taxiDriver->name == taxiDriver->name &&
				tripsArr[i]->taxiDriver->surname == taxiDriver->surname &&
				tripsArr[i]->customer->name == customer->name &&
				tripsArr[i]->customer->surname == customer->surname)
			{
				return i;
			}

		}
		return -1;
	}

	void deleteTrip(int index)
	{
		Trip** newtripsArr = new Trip * [size_tripsArr - 1];

		for (int i = 0, j = 0; i < size_tripsArr; i++)
		{
			if (i == index)
			{
				continue;
			}
			newtripsArr[j] = tripsArr[i];
			j++;
		}
		delete[] tripsArr;
		tripsArr = newtripsArr;
		size_tripsArr--;
	}
};

int main()
{
	/*TaxiDriver* taxiDriver1 = new TaxiDriver("John", "Snow", 20, "toyota", "203", 2001, "red");
	TaxiDriver* taxiDriver2 = new TaxiDriver("Kira", "Gort", 25, "kio", "253", 2007, "yellow");
	TaxiDriver* taxiDriver3 = new TaxiDriver("Mannus", "Ferus", 27, "nisan", "303", 2021, "green");

	TaxiDriver** taxiDriverArr = new TaxiDriver * [3];
	taxiDriverArr[0] = taxiDriver1;
	taxiDriverArr[1] = taxiDriver2;
	taxiDriverArr[2] = taxiDriver3;

	Customer* customer1 = new Customer("Bari", "Flash", 30);
	Customer* customer2 = new Customer("Fert", "Qerut", 35);
	Customer* customer3 = new Customer("Farew", "Verba", 19);

	Customer** customerArr = new Customer * [3];
	customerArr[0] = customer1;
	customerArr[1] = customer2;
	customerArr[2] = customer3;

	Trip* trip1 = new Trip(taxiDriver1, customer1, 200);
	Trip* trip2 = new Trip(taxiDriver2, customer2, 300);
	Trip* trip3 = new Trip(taxiDriver3, customer3, 400);

	Trip ** tripArr = new Trip * [3];
	tripArr[0] = trip1;
	tripArr[1] = trip2;
	tripArr[2] = trip3;*/
	Uber* uber = new Uber();
	uber->addNewTaxiDriver("John", "Snow", 20, "toyota", "203", 2001, "red");
	
	for (int i = 0; i < uber->size_taxiDriversArr; i++)
	{
		cout << endl;
		uber->taxiDriversArr[i]->showInfo();
	}
	cout << "-----------------------------------------------------------" << endl;
	cout << endl << endl;

	uber->addNewCustomer("Bari", "Flash", 30);
	for (int i = 0; i < uber->size_customersArr; i++)
	{
		cout << endl;
		uber->customersArr[i]->showInfo();
	}
	cout << "-----------------------------------------------------------" << endl;
	cout << uber->findCustomerIndex("Bari", "Flash") << endl;
	for (int i = 0; i < uber->size_customersArr; i++)
	{
		cout << endl;
		uber->customersArr[i]->showInfo();
	}
	cout << "-----------------------------------------------------------" << endl;
	cout << "-----------------------------------------------------------" << endl;
	cout << "-----------------------------------------------------------" << endl;
	cout << endl << endl;

	uber->addNewTrip(uber->taxiDriversArr[0], uber->customersArr[0], 200);
	for (int i = 0; i < uber->size_tripsArr; i++)
	{
		cout << endl;
		uber->tripsArr[i]->showInfo();
	}
	cout << "-----------------------------------------------------------" << endl;
	cout << uber->findTripIndex(uber->taxiDriversArr[0], uber->customersArr[0], 200) << endl;
	//uber->deleteTrip(0);
	for (int i = 0; i < uber->size_tripsArr; i++)
	{
		cout << endl;
		uber->tripsArr[i]->showInfo();
	}
}