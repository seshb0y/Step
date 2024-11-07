#include <iostream>
using namespace std;

class Booking;
class Hotel;
class Bill;
class Product;

class Guest
{
public:
    string surname;
    string name;
    string patronymic;
    string arrivalDate;
    int arrivalDay;
    int arrivalMonth;
    int arrivalYear;
    string departurDate;
    int departureDay;
    int departureMonth;
    int departureYear;
    string guestType;
    int age;
    string guestStatus;
    int guestBonus = 0;

    Bill** guestBillArr;
    int sizeGuestBillArr = 0;

    Guest** guestFamily;
    int size_guestFamily = 0;

    Booking** bookingHistory;
    int size_bookingHistory = 0;


    Guest(string surname, string name, string patronymic, int arrivalDay, int arrivalMonth, int arrivalYear,
        int departureDay, int departureMonth, int departureYear, string guestType, int age)
    {
        this->surname = surname;
        this->name = name;
        this->patronymic = patronymic;
        this->arrivalDay = arrivalDay;
        this->arrivalMonth = arrivalMonth;
        this->arrivalYear = arrivalYear;
        this->departureDay = departureDay;
        this->departureMonth = departureMonth;
        this->departureYear = departureYear;
        this->guestType = guestType;
        this->age = age;
        this->bookingHistory = new Booking * [size_bookingHistory];
        this->guestBillArr = new Bill * [sizeGuestBillArr];

        if (arrivalDay >= 24 && arrivalMonth >= 4 && arrivalYear >= 2024)
        {
            this->guestStatus = "expected";
        }
        else if (arrivalDay < 24 && arrivalMonth <= 4 && arrivalYear <= 2024 && departureDay > 24 && departureMonth >= 4 && departureYear >= 2024)
        {
            this->guestStatus = "stays";
        }
        else if (departureDay < 24 && departureMonth <= 4 && departureYear <= 2024)
        {
            this->guestStatus = "leave";
        }
        else
        {
            this->guestStatus = "wrong data";
        }
    }


    void addExistBooking(Booking* booking)
    {
        Booking** newArr = new Booking * [size_bookingHistory + 1];
        for (int i = 0; i < size_bookingHistory; i++)
        {
            newArr[i] = bookingHistory[i];
        }
        newArr[size_bookingHistory] = booking;
        delete[]  bookingHistory;
        bookingHistory = newArr;
        this->size_bookingHistory++;
    }

    void showInfo()
    {
        cout << "surname: " << surname << endl;
        cout << "name: " << name << endl;
        cout << "patronymic: " << patronymic << endl;
        cout << "arrival date: " << arrivalDay << '/' << arrivalMonth << '/' << arrivalYear << endl;
        cout << "date of departure: " << departureDay << '/' << departureMonth << '/' << departureYear << endl;
        cout << "guest type: " << guestType << endl;
        cout << "age: " << age << endl;
        cout << "status: " << guestStatus << endl;
        cout << "bonus: " << guestBonus << endl << endl;
    };
};



class Room
{
public:
    int floor;
    int number;
    string roomClass;
    int price;
    Guest** guestHistory;
    int size_guestHistory = 0;
    string roomStatus = "free";

    Room(int floor, int number, string roomClass, int price)
    {
        this->floor = floor;
        this->number = number;
        this->roomClass = roomClass;
        this->price = price;
        this->guestHistory = new Guest * [size_guestHistory];
    }

    void addExistGuest(Guest* guest)
    {
        Guest** newArr = new Guest * [size_guestHistory + 1];
        for (int i = 0; i < size_guestHistory; i++)
        {
            newArr[i] = guestHistory[i];
        }
        newArr[size_guestHistory] = guest;
        delete[] guestHistory;
        guestHistory = newArr;
        size_guestHistory++;
    }

    void showInfo()
    {
        cout << "floor: " << floor << endl;
        cout << "number: " << number << endl;
        cout << "room class: " << roomClass << endl;
        cout << "price: " << price << endl;
        cout << "status: " << roomStatus << endl << endl;
    }
};

class Bill
{
public:
    int billNumb;
    int totalAmount;

    Product** productsArr; //продукты в чеке
    int sizeProductsArr = 0;

    Bill(int billNumb, int totalAmount)
    {
        this->billNumb = billNumb;
        this->totalAmount = totalAmount;
        this->productsArr = new Product * [sizeProductsArr];
    }
    void showInfo()
    {
        cout << "Bill number: " << billNumb << '\t' << '|' << '\t' << "Total amount: " << totalAmount << endl;
    }

};

class Product
{
public:
    string name;
    int price;
    int productsAmount;
    Product(string name, int price, int productsAmount)
    {
        this->name = name;
        this->price = price;
        this->productsAmount = productsAmount;
    }
    void showInfo()
    {
        cout << "Name: " << name << '\t' << '|' << '\t' << "Price: " << price << '\t' << '|' << '\t' << "Quantity: " << productsAmount << endl;
    }

};



class Restaurant
{
private:
    string name;
    string stars;
    int capacity;
public:

    string getName()
    {
        return name;
    }
    void setName(string name)
    {
        this->name = name;
    }
    string getStars()
    {
        return this->stars;
    }
    void setStars(string stars)
    {
        this->stars = stars;
    }
    int getCapacity()
    {
        return capacity;
    }
    void setCapacity(int capacity)
    {
        this->capacity = capacity;
    }

    Guest** guestArr; //посетители
    int sizeGuestArr = 0;

    Product** allProductArr;//список всех продуктов
    int sizeAllProductArr = 0;

    Bill** allBillsArr;//список всех чеков
    int sizeAllBillsArr = 0;

    Restaurant(string name, string stars, int capacity)
    {
        this->name = name;
        this->stars = stars;
        this->capacity = capacity;
        this->guestArr = new Guest * [sizeGuestArr];
        this->allProductArr = new Product * [sizeAllProductArr];
        this->allBillsArr = new Bill * [sizeAllBillsArr];
    }
    void showInfo()
    {
        cout << "name: " << getName() << endl;
        cout << "stars: " << getStars() << endl;
        cout << "capacity: " << getCapacity() << endl;
    }

    ///////////////////////////////CRUD
    // PRoduct CRUD
    void changeProduct(int index, string name, double price, int productsAmount)
    {
        allProductArr[index]->name = name;
        allProductArr[index]->price = price;
        allProductArr[index]->productsAmount = productsAmount;
    }

    int findProductIndex(string name)
    {
        for (int i = 0; i < sizeAllProductArr; i++)
        {
            if (allProductArr[i]->name == name)
            {
                return i;
            }
        }
        return -1;
    }

    void deleteProduct(int index)
    {
        Product** newAllProductArr = new Product * [sizeAllProductArr - 1];
        for (int i = 0, j = 0; i < sizeAllProductArr; i++)
        {
            if (i == index)
            {
                delete allProductArr[i];
                continue;
            }
            newAllProductArr[j] = allProductArr[i];
            j++;
        }
        delete[] allBillsArr;
        allProductArr = newAllProductArr;
        sizeAllProductArr--;
    }

    void addNewProduct(string name, double price, int productsAmount)
    {
        Product* newProduct = new Product(name, price, productsAmount);
        Product** newAllProductArr = new Product * [sizeAllProductArr + 1];
        for (int i = 0; i < sizeAllProductArr; i++)
        {
            newAllProductArr[i] = allProductArr[i];
        }
        newAllProductArr[sizeAllProductArr] = newProduct;
        delete[] allProductArr;
        allProductArr = newAllProductArr;
        sizeAllProductArr++;
    }
    //Bill CRUD
    void changeBill(int index, int billNumb, double totalPrice)
    {
        allBillsArr[index]->billNumb = billNumb;
        allBillsArr[index]->totalAmount = totalPrice;
    }

    void deleteBill(int index)
    {
        Bill** newBillArr = new Bill * [sizeAllBillsArr - 1];
        for (int i = 0, j = 0; i < sizeAllBillsArr; i++)
        {
            if (i == index)
            {
                delete allBillsArr[i];
                continue;
            }
            newBillArr[j] = allBillsArr[i];
            j++;
        }
        delete[] allBillsArr;
        allBillsArr = newBillArr;
        sizeAllBillsArr--;
    }

    int findBillIndex(int billNumb)
    {
        for (int i = 0; i < sizeGuestArr; i++)
        {
            if (allBillsArr[i]->billNumb == billNumb)
            {
                return i;
            }
        }
        return -1;
    }

    void addProductInBill(int billIndex, string name, int price, int productsQuantity)
    {
        Product* newProduct = new Product(name, price, productsQuantity);
        Product** newArr = new Product * [allBillsArr[billIndex]->sizeProductsArr + 1];
        for (int i = 0; i < allBillsArr[billIndex]->sizeProductsArr; i++)
        {
            newArr[i] = allBillsArr[billIndex]->productsArr[i];
        }
        newArr[allBillsArr[billIndex]->sizeProductsArr] = newProduct;
        delete[] allBillsArr[billIndex]->productsArr;
        allBillsArr[billIndex]->productsArr = newArr;
        allBillsArr[billIndex]->sizeProductsArr++;
    }

    void addNewBill(int billNumb, double totalAmount)
    {
        Bill* newBill = new Bill(billNumb, totalAmount);
        Bill** newBillArr = new Bill * [sizeAllBillsArr + 1];
        for (int i = 0; i < sizeAllBillsArr; i++)
        {
            newBillArr[i] = allBillsArr[i];
        }
        newBillArr[sizeAllBillsArr] = newBill;
        delete[] allBillsArr;
        allBillsArr = newBillArr;
        sizeAllBillsArr++;
    }
    void showBillHistory()
    {
        for (int i = 0; i < sizeAllBillsArr; i++)
        {
            allBillsArr[i]->showInfo();
        }
    }
    //Guest CRUD
    void showGuestHistory()
    {
        for (int i = 0; i < sizeGuestArr; i++)
        {
            cout << i << ' ';
            cout << guestArr[i]->name << ' ' << guestArr[i]->surname << ' ' << guestArr[i]->patronymic << endl;
        }
    }

    void showGuestBillHistory(Guest* guest)
    {
        for (int i = 0; i < guest->sizeGuestBillArr; i++)
        {
            guest->guestBillArr[i]->showInfo();
            for (int j = 0; j < guest->guestBillArr[i]->sizeProductsArr; j++)
            {
                guest->guestBillArr[i]->productsArr[j]->showInfo();
            }
        }
    }

    int findGuestIndex(string surname, string name, string patronymic)
    {
        for (int i = 0; i < sizeGuestArr; i++)
        {
            if (guestArr[i]->surname == surname && guestArr[i]->name == name && guestArr[i]->patronymic == patronymic)
            {
                return i;
            }
        }
        return -1;
    }

    void addBillToGuest(int guestInd, int billInd)
    {
        Bill** newArr = new Bill * [guestArr[guestInd]->sizeGuestBillArr + 1];
        for (int i = 0; i < guestArr[guestInd]->sizeGuestBillArr; i++)
        {
            newArr[i] = guestArr[guestInd]->guestBillArr[i];
        }
        newArr[guestArr[guestInd]->sizeGuestBillArr] = allBillsArr[billInd];
        delete[]  guestArr[guestInd]->guestBillArr;
        guestArr[guestInd]->guestBillArr = newArr;
        guestArr[guestInd]->sizeGuestBillArr++;
    }

    void deleteGuest(int index)
    {
        Guest** newGuestArr = new Guest * [sizeGuestArr - 1];
        for (int i = 0, j = 0; i < sizeGuestArr; i++)
        {
            if (i == index)
            {
                delete guestArr[i];
                continue;
            }
            newGuestArr[j] = guestArr[i];
            j++;
        }
        delete[] guestArr;
        guestArr = newGuestArr;
        sizeGuestArr--;
    }

    void addNewGuest(Guest* guest)
    {
        Guest** newArr = new Guest * [sizeGuestArr + 1];
        for (int i = 0; i < sizeGuestArr; i++)
        {
            newArr[i] = guestArr[i];
        }
        newArr[sizeGuestArr] = guest;
        delete[] guestArr;
        guestArr = newArr;
        sizeGuestArr++;
    }
};

class Booking
{
public:
    int bookingDay;
    int bookingMonth;
    int bookingYear;
    int totalPrice;
    Guest* guest;
    Room* room;
    string bookingStatus;
    Booking(int bookingDay, int bookingMonth, int bookingYear, Guest* guest, Room* room)
    {
        this->bookingDay = bookingDay;
        this->bookingMonth = bookingMonth;
        this->bookingYear = bookingYear;
        this->guest = guest;
        this->room = room;
        if (bookingDay >= 24 && bookingMonth >= 4 && bookingYear >= 2024)
        {
            this->bookingStatus = "expected";
        }
        else if (bookingDay < 24 && bookingMonth <= 4 && bookingYear <= 2024)
        {
            this->bookingStatus = "completed";
        }
    }


    void showInfo()
    {
        cout << "booking date: " << bookingDay << '/' << bookingMonth << '/' << bookingYear << endl;
        cout << "Total price: " << totalPrice << endl;
        cout << "booking status: " << bookingStatus << endl << endl;
        cout << "guest: " << endl;
        guest->showInfo();
        cout << "room: " << endl;
        room->showInfo();
    }
};

class Hotel
{
private:
    string name;
    string adress;
    string stars;
    int capacity;
public:
    Guest** guestArr;
    int sizeGuestArr = 0;

    Room** roomArr;
    int sizeRoomArr = 0;

    Booking** bookingArr;
    int sizeBookingArr = 0;

    Hotel(string adress, string stars, int capacity)
    {
        this->adress = adress;
        this->stars = stars;
        this->capacity = capacity;
        this->guestArr = new Guest * [sizeGuestArr];
        this->roomArr = new Room * [sizeRoomArr];
        this->bookingArr = new Booking * [sizeBookingArr];
    };
    string getName()
    {
        return name;
    }
    void setName(string name)
    {
        this->name = name;
    }
    string getAdress()
    {
        return this->adress;
    }
    void setAdress(string adress)
    {
        this->adress = adress;
    }
    string getStars()
    {
        return this->stars;
    }
    void setStars(string stars)
    {
        this->stars = stars;
    }
    int getCapacity()
    {
        return capacity;
    }
    void setCapacity(int capacity)
    {
        this->capacity = capacity;
    }

    //////CRUD

    ///////////////////////CRUD guest

    int findGuestIndex(string surname, string name, string patronymic)
    {
        for (int i = 0; i < sizeGuestArr; i++)
        {
            if (guestArr[i]->surname == surname && guestArr[i]->name == name && guestArr[i]->patronymic == patronymic)
            {
                return i;
            }
        }
        return -1;
    }

    void changeGuest(int ind,
        string surname, string name, string patronymic, int arrivalDay, int arrivalMonth, int arrivalYear, int departureDay, int departureMonth, int departureYear, string guestType, int age)
    {
        guestArr[ind]->surname = surname;
        guestArr[ind]->name = name;
        guestArr[ind]->patronymic = patronymic;
        guestArr[ind]->arrivalDay = arrivalDay;
        guestArr[ind]->arrivalMonth = arrivalMonth;
        guestArr[ind]->arrivalYear = arrivalYear;
        guestArr[ind]->departureDay = departureDay;
        guestArr[ind]->departureMonth = departureMonth;
        guestArr[ind]->departureYear = departureYear;
        guestArr[ind]->guestType = guestType;
        guestArr[ind]->age = age;
        if (arrivalDay > 24 && arrivalMonth > 4 && arrivalYear >= 2024)
        {
            guestArr[ind]->guestStatus = "expected";
        }
        else if (arrivalDay < 24 && arrivalMonth < 4 && arrivalYear <= 2024 && departureDay > 24 && departureMonth > 4 && departureYear >= 2024)
        {
            guestArr[ind]->guestStatus = "stays";
        }
        else if (departureDay < 24 && departureMonth < 4 && departureYear <= 2024)
        {
            guestArr[ind]->guestStatus = "leave";
        }
        else
        {
            guestArr[ind]->guestStatus = "wrong data";
        }
    }
    void addNewGuest(string surname, string name, string patronymic, int arrivalDay, int arrivalMonth, int arrivalYear, int departureDay, int departureMonth, int departureYear, string guestType, int age)
    {
        Guest* newGuest = new Guest(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);
        Guest** newArr = new Guest * [sizeGuestArr + 1];
        for (int i = 0; i < sizeGuestArr; i++)
        {
            newArr[i] = guestArr[i];
        }
        newArr[sizeGuestArr] = newGuest;
        delete[] guestArr;
        guestArr = newArr;
        sizeGuestArr++;
    }

    void addGuestFamily(string surname, string name, string patronymic, int arrivalDay, int arrivalMonth, int arrivalYear, int departureDay,
        int departureMonth, int departureYear, string guestType, int age, int guest_ind, int index)
    {
        Guest* newGuest = new Guest(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);
        guestArr[guest_ind]->guestFamily[index] = newGuest;
        addNewGuest(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);

    }

    void showGuestFamily(int index, Guest* guest)
    {
        guest->showInfo();
        for (int i = 0; i < guest->size_guestFamily; i++)
        {
            cout << guestArr[index]->guestFamily[i]->surname << ' ' << guest->guestFamily[i]->name << ' ' << guest->guestFamily[i]->patronymic << endl;
            cout << guestArr[index]->guestFamily[i]->age << endl;
            cout << guestArr[index]->guestFamily[i]->departureDay << '/' << guestArr[index]->guestFamily[i]->departureMonth << '/' << guestArr[index]->guestFamily[i]->departureYear << endl;
            cout << "------------------------------------------" << endl;

        }
    }

    void showBookingHistory(int index, Guest* guest)
    {
        for (int i = 0; i < guest->size_bookingHistory; i++)
        {
            cout << "Booking date: ";
            cout << guestArr[index]->bookingHistory[i]->bookingDay << '/' << guestArr[index]->bookingHistory[i]->bookingMonth << '/' << guestArr[index]->bookingHistory[i]->bookingYear << endl;
            cout << "Room floor: ";
            cout << guestArr[index]->bookingHistory[i]->room->floor << endl;
            cout << "Room number: ";
            cout << guestArr[index]->bookingHistory[i]->room->number << endl;
            cout << "Room class: ";
            cout << guestArr[index]->bookingHistory[i]->room->roomClass << endl;
            cout << "Room price: ";
            cout << guestArr[index]->bookingHistory[i]->room->price << endl << endl;
        }
    }

    void showRoomHistory(int index, Room* room)
    {
        for (int i = 0; i < room->size_guestHistory; i++)
        {
            room->guestHistory[i]->showInfo();
        }
    }

    void deleteGuest(int index)
    {
        Guest** newGuestArr = new Guest * [sizeGuestArr - 1];
        for (int i = 0, j = 0; i < sizeGuestArr; i++)
        {
            if (i == index)
            {
                delete guestArr[i];
                continue;
            }
            newGuestArr[j] = guestArr[i];
            j++;
        }
        delete[] guestArr;
        guestArr = newGuestArr;
        sizeGuestArr--;
    }

    ///////////////////////CRUD room

    int findRoomIndex(int number)
    {
        for (int i = 0; i < sizeRoomArr; i++)
        {
            if (roomArr[i]->number == number)
            {
                return i;
            }
        }
        return -1;
    }

    void changeRoom(int index, int floor, int number, string roomClass, int price)
    {
        roomArr[index]->floor = floor;
        roomArr[index]->number = number;
        roomArr[index]->roomClass = roomClass;
        roomArr[index]->price = price;
    }

    void addNewRoom(int floor, int number, string roomClass, int price)
    {
        Room* newRoom = new Room(floor, number, roomClass, price);
        Room** newArr = new Room * [sizeRoomArr + 1];
        for (int i = 0; i < sizeRoomArr; i++)
        {
            newArr[i] = roomArr[i];
        }
        newArr[sizeRoomArr] = newRoom;
        delete[] roomArr;
        sizeRoomArr++;
        roomArr = newArr;
    }
    void deleteRoom(int index)
    {
        Room** newRoomArr = new Room * [sizeRoomArr - 1];
        for (int i = 0, j = 0; i < sizeRoomArr; i++)
        {
            if (i == index)
            {
                delete roomArr[i];
                continue;
            }
            newRoomArr[j] = roomArr[i];
            j++;
        }
        delete[] roomArr;
        roomArr = newRoomArr;
        sizeRoomArr--;
    }

    ///////////////////////CRUD booking

    int findBookingIndex(int bookingDay, int bookingMonth, int bookingYear, Guest* guest, Room* room)
    {
        for (int i = 0; i < sizeBookingArr; i++)
        {
            if (bookingArr[i]->bookingDay == bookingDay &&
                bookingArr[i]->bookingMonth == bookingMonth &&
                bookingArr[i]->bookingYear == bookingYear &&
                bookingArr[i]->guest->surname == guest->surname &&
                bookingArr[i]->guest->name == guest->name &&
                bookingArr[i]->guest->patronymic == guest->patronymic &&
                bookingArr[i]->room->number == room->number)
            {
                return i;
            }
        }
        return -1;
    }
    void findBookingByDate(int bookingDay, int bookingMonth, int bookingYear)
    {
        for (int i = 0; i < sizeBookingArr; i++)
        {
            if (bookingArr[i]->bookingDay == bookingDay && bookingArr[i]->bookingMonth == bookingMonth && bookingArr[i]->bookingYear == bookingYear)
            {
                bookingArr[i]->showInfo();
            }
        }
    }

    void changeBooking(int index, int bookingDay, int bookingMonth, int bookingYear,
        string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age,
        int floor, int number, string roomClass, int price)
    {
        bookingArr[index]->bookingDay = bookingDay;
        bookingArr[index]->bookingMonth = bookingMonth;
        bookingArr[index]->bookingYear = bookingYear;
        bookingArr[index]->guest->surname = surname;
        bookingArr[index]->guest->name = name;
        bookingArr[index]->guest->patronymic = patronymic;
        bookingArr[index]->guest->arrivalDate = arrivalDate;
        bookingArr[index]->guest->departurDate = departurDate;
        bookingArr[index]->guest->guestType = guestType;
        bookingArr[index]->guest->age = age;
        bookingArr[index]->room->floor = floor;
        bookingArr[index]->room->number = number;
        bookingArr[index]->room->roomClass = roomClass;
        bookingArr[index]->room->price = price;
    }

    int totalPriceCalc(int dayQuantity, Room* room, Guest* guest)
    {
        if (guest->guestType == "VIP")
        {
            return (dayQuantity * room->price) - (dayQuantity * room->price) * 0.2;
        }
        return dayQuantity * room->price;
    }

    void addNewBooking(int bookingDay, int bookingMonth, int bookingYear,
        string surname, string name, string patronymic, int arrivalDay, int arrivalMonth, int arrivalYear, int departureDay, int departureMonth, int departureYear, string guestType, int age,
        int number, int daysQuantity)
    {
        Booking** newArr = new Booking * [sizeBookingArr + 1];
        for (int i = 0; i < sizeBookingArr; i++)
        {
            newArr[i] = bookingArr[i];
        }
        if (findGuestIndex(surname, name, patronymic) >= 0)
        {
            Booking* newBooking = new Booking(bookingDay, bookingMonth, bookingYear, guestArr[findGuestIndex(surname, name, patronymic)], roomArr[findRoomIndex(number)]);
            newArr[sizeBookingArr] = newBooking;
            guestArr[findGuestIndex(surname, name, patronymic)]->addExistBooking(newBooking);
            roomArr[findRoomIndex(number)]->addExistGuest(guestArr[findGuestIndex(surname, name, patronymic)]);
            if (guestArr[findGuestIndex(surname, name, patronymic)]->guestStatus == "stays")
            {
                roomArr[findRoomIndex(number)]->roomStatus = "busy";
            }
            else
            {
                roomArr[findRoomIndex(number)]->roomStatus = "free";
            }
            newBooking->totalPrice = totalPriceCalc(daysQuantity, roomArr[findRoomIndex(number)], guestArr[findGuestIndex(surname, name, patronymic)]);
            if (newBooking->bookingStatus == "completed" && newBooking->guest->guestType == "VIP")
            {
                newBooking->guest->guestBonus = newBooking->totalPrice * 0.05;
            }
        }
        else
        {
            addNewGuest(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);
            Booking* newBooking = new Booking(bookingDay, bookingMonth, bookingYear, guestArr[sizeGuestArr - 1], roomArr[findRoomIndex(number)]);
            newArr[sizeBookingArr] = newBooking;
            guestArr[sizeGuestArr - 1]->addExistBooking(newBooking);
            roomArr[findRoomIndex(number)]->addExistGuest(guestArr[sizeGuestArr - 1]);
            if (guestArr[sizeGuestArr - 1]->guestStatus == "stays")
            {
                roomArr[findRoomIndex(number)]->roomStatus = "busy";
            }
            else
            {
                roomArr[findRoomIndex(number)]->roomStatus = "free";
            }
            newBooking->totalPrice = totalPriceCalc(daysQuantity, roomArr[findRoomIndex(number)], guestArr[sizeGuestArr - 1]);
            if (newBooking->bookingStatus == "completed" && newBooking->guest->guestType == "VIP")
            {
                newBooking->guest->guestBonus = newBooking->totalPrice * 0.05;
            }
        }
        delete[] bookingArr;
        sizeBookingArr++;
        bookingArr = newArr;
    }



    void deleteBooking(int index)
    {
        Booking** newArr = new Booking * [sizeBookingArr - 1];
        for (int i = 0, j = 0; i < sizeBookingArr; i++)
        {
            if (i == index)
            {
                delete bookingArr[i];
                continue;
            }
            newArr[j] = bookingArr[i];
            j++;
        }
        delete[] bookingArr;
        sizeBookingArr--;
        bookingArr = newArr;
    }
};



int main()
{
    Hotel bakuResort = Hotel("Niyaz Gasimov 38", "*****", 1500);

    bakuResort.addNewGuest("Wick", "John", "Simonovich", 18, 4, 2024, 21, 4, 2024, "VIP", 32);
    bakuResort.addNewGuest("Snow", "Codey", "Gardens", 15, 4, 2024, 18, 4, 2024, "regular", 21);
    bakuResort.addNewGuest("Barks", "Boris", "Ivanovich", 11, 4, 2024, 26, 4, 2024, "VIP", 37);


    bakuResort.addNewRoom(1, 100, "Common", 100);
    bakuResort.addNewRoom(2, 200, "Lux", 200);
    bakuResort.addNewRoom(3, 300, "President-lux", 300);

    bakuResort.addNewBooking(18, 4, 2024, "Wick", "John", "Simonovich", 18, 4, 2024, 21, 4, 2024, "VIP", 32, 100, 3);
    bakuResort.addNewBooking(15, 4, 2024, "Snow", "Codey", "Gardens", 15, 4, 2024, 18, 4, 2024, "regular", 21, 200, 3);
    bakuResort.addNewBooking(11, 4, 2024, "Barks", "Boris", "Ivanovich", 11, 4, 2024, 26, 4, 2024, "VIP", 37, 300, 15);

    Restaurant victor = Restaurant("Victor", "* * * * *", 50);

    victor.addNewGuest(bakuResort.guestArr[0]);
    victor.addNewGuest(bakuResort.guestArr[1]);

    victor.addNewProduct("Rozetto", 200, 100);
    victor.addNewProduct("Beshdarma", 100, 50);
    victor.addNewProduct("Dolma", 50, 200);

    string surname;
    string name;
    string patronymic;
    string arrivalDate;
    int arrivalDay;
    int arrivalMonth;
    int arrivalYear;
    string departurDate;
    int departureDay;
    int departureMonth;
    int departureYear;
    string guestType;
    int age;

    int floor;
    int number;
    string roomClass;
    int price;

    int bookingDay;
    int bookingMonth;
    int bookingYear;

    int user_choice;

    while (true)
    {
        system("cls");
        system("color 05");
        cout << "Menu \n1. Show Hotel \n2. Show guest list \n3. Show room list \n4. Show booking list \n5. Restaurant \n6.Exit" << endl;
        cin >> user_choice;
        switch (user_choice)
        {
        case 1:
            system("cls");
            cout << "Name: " << bakuResort.getName() << endl << "Adress: " << bakuResort.getAdress() << endl << "Capacity: " << bakuResort.getCapacity() << endl << "Stars: " << bakuResort.getStars() << endl << endl;
            cout << "1. Back" << endl;
            cin >> user_choice;
            continue;
        case 2:
            while (true)
            {
                system("cls");
                for (int i = 0; i < bakuResort.sizeGuestArr; i++)
                {
                    bakuResort.guestArr[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add guest \n2. Delete guest \n3. Find guest \n4. Add family \n5. Show guest family \n6. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                {
                    system("cls");
                    cout << "Enter visitors details" << endl;
                    cout << "Surname: ";
                    cin >> surname;
                    cout << "Name: ";
                    cin >> name;
                    cout << "Patronymic: ";
                    cin >> patronymic;
                    cout << "Age: ";
                    cin >> age;
                    cout << "Arrival date(day month year): ";
                    cin >> arrivalDay;
                    cin >> arrivalMonth;
                    cin >> arrivalYear;
                    cout << "Departure date(day month year): ";
                    cin >> departureDay;
                    cin >> departureMonth;
                    cin >> departureYear;
                    cout << "Guest type: ";
                    cin >> guestType;
                    bakuResort.addNewGuest(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);
                    cout << "Guest added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 2:
                {
                    while (true)
                    {
                        cout << "Enter visitor details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        if (bakuResort.findGuestIndex(surname, name, patronymic) >= 0)
                        {
                            break;
                        }
                        cout << "Guest was not found" << endl;
                    }
                    bakuResort.deleteGuest(bakuResort.findGuestIndex(surname, name, patronymic));
                    cout << "Guest deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {

                    while (true)
                    {
                        cout << "Enter visitor details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        if (bakuResort.findGuestIndex(surname, name, patronymic) >= 0)
                        {
                            break;
                        }
                        cout << "Guest was not found" << endl;
                    }
                    int index = bakuResort.findGuestIndex(surname, name, patronymic);
                    system("cls");
                    cout << "1. Change guest \n2. Delete guest \n3. Show boking list \n4. Return back \n";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                        system("cls");
                        {
                            cout << "Enter visitor details" << endl;
                            cout << "Surname: ";
                            cin >> surname;
                            cout << "Name: ";
                            cin >> name;
                            cout << "Patronymic: ";
                            cin >> patronymic;
                            cout << "Age: ";
                            cin >> age;
                            cout << "Arrival date(day month year): ";
                            cin >> arrivalDay;
                            cin >> arrivalMonth;
                            cin >> arrivalYear;
                            cout << "Departure date(day month year): ";
                            cin >> departureDay;
                            cin >> departureMonth;
                            cin >> departureYear;
                            cout << "Guest type: ";
                            cin >> guestType;
                            bakuResort.changeGuest(index, surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age);
                            cout << "Data changed" << endl;
                            cout << "-----------------------------------------------------" << endl;
                            continue;
                        }
                    case 2:
                        system("cls");
                        bakuResort.deleteGuest(index);
                        cout << "Guest deleted" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 3:
                        system("cls");
                        bakuResort.showBookingHistory(index, bakuResort.guestArr[index]);
                        cout << "-----------------------------------------------------" << endl;
                    case 4:
                        continue;
                    }

                }
                case 4:
                {
                    system("cls");
                    cout << "Enter a guest data to add a family: ";
                    while (true)
                    {
                        cout << "Enter visitor details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        if (bakuResort.findGuestIndex(surname, name, patronymic) >= 0)
                        {
                            break;
                        }
                        cout << "Guest was not found" << endl;
                    }
                    int index = bakuResort.findGuestIndex(surname, name, patronymic);
                    cout << "Enter the number of persons: ";
                    cin >> user_choice;
                    Guest** familyArr = new Guest * [user_choice];
                    bakuResort.guestArr[index]->size_guestFamily = user_choice;
                    bakuResort.guestArr[index]->guestFamily = familyArr;
                    for (int i = 0; i < user_choice; i++)
                    {
                        system("cls");
                        cout << "Enter visitors details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        cout << "Age: ";
                        cin >> age;
                        cout << "Arrival date(day month year): ";
                        cin >> arrivalDay;
                        cin >> arrivalMonth;
                        cin >> arrivalYear;
                        cout << "Departure date(day month year): ";
                        cin >> departureDay;
                        cin >> departureMonth;
                        cin >> departureYear;
                        cout << "Guest type: ";
                        cin >> guestType;
                        bakuResort.addGuestFamily(surname, name, patronymic, arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age, index, i);
                    }
                    cout << "Persons added" << endl;
                    bakuResort.showGuestFamily(index, bakuResort.guestArr[index]);
                    continue;
                }
                case 5:
                {
                    while (true)
                    {
                        cout << "Enter visitor details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        if (bakuResort.findGuestIndex(surname, name, patronymic) >= 0)
                        {
                            break;
                        }
                        cout << "Guest was not found" << endl;
                    }
                    int index = bakuResort.findGuestIndex(surname, name, patronymic);
                    system("cls");
                    bakuResort.showGuestFamily(index, bakuResort.guestArr[index]);
                    cout << "1. Back" << endl;
                    cin >> user_choice;
                    continue;
                }

                case 6:
                    break;
                }
                break;
            }
            continue;
        case 3:
            while (true)
            {
                system("cls");
                for (int i = 0; i < bakuResort.sizeRoomArr; i++)
                {
                    bakuResort.roomArr[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add room \n2. Delete room \n3. Find room \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                    system("cls");
                    {
                        cout << "Enter room details" << endl;
                        cout << "Floor: ";
                        cin >> floor;
                        cout << "Number: ";
                        cin >> number;
                        cout << "Room class: ";
                        cin >> roomClass;
                        cout << "Price: ";
                        cin >> price;
                        Room* newRoom = new Room(floor, number, roomClass, price);
                        bakuResort.addNewRoom(floor, number, roomClass, price);
                        cout << "Room added" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    }
                case 2:
                {
                    while (true)
                    {
                        cout << "Enter room details" << endl;
                        cout << "Number: ";
                        cin >> number;
                        if (bakuResort.findRoomIndex(number) >= 0)
                        {
                            break;
                        }
                        cout << "Room was not found" << endl;
                    }
                    bakuResort.deleteRoom(bakuResort.findRoomIndex(number));
                    cout << "Room deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {
                    while (true)
                    {
                        cout << "Enter room details" << endl;
                        cout << "Number: ";
                        cin >> number;
                        if (bakuResort.findRoomIndex(number) >= 0)
                        {
                            break;
                        }
                        cout << "Room was not found" << endl;
                    }
                    int ind = bakuResort.findRoomIndex(number);
                    cout << "-----------------------------------------------------" << endl;
                    cout << "1. Change room \n2. Delete room \n3. Show room History \n4. Return back" << endl;
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                    {
                        cout << "Enter room details" << endl;
                        cout << "Floor: ";
                        cin >> floor;
                        cout << "Number: ";
                        cin >> number;
                        cout << "Room class: ";
                        cin >> roomClass;
                        cout << "Price: ";
                        cin >> price;
                        bakuResort.changeRoom(ind, floor, number, roomClass, price);
                        cout << "Data changed" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    }
                    case 2:
                        system("cls");
                        bakuResort.deleteRoom(ind);
                        cout << "Room deleted" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 3:
                        system("cls");
                        bakuResort.showRoomHistory(ind, bakuResort.roomArr[ind]);
                    case 4:
                        continue;
                    }
                }
                case 4:
                    break;
                }
                break;
            }
            continue;
        case 4:
            while (true)
            {
                system("cls");
                for (int i = 0; i < bakuResort.sizeBookingArr; i++)
                {
                    bakuResort.bookingArr[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add booking \n2. Delete booking \n3. Find booking \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                {
                    cout << "Enter booking details" << endl;
                    cout << "Date(day month year): ";
                    cin >> bookingDay;
                    cin >> bookingMonth;
                    cin >> bookingYear;
                    cout << "Enter visitor details" << endl;
                    cout << "Surname: ";
                    cin >> surname;
                    cout << "Name: ";
                    cin >> name;
                    cout << "Patronymic: ";
                    cin >> patronymic;
                    cout << "Age: ";
                    cin >> age;
                    cout << "Arrival date(day month year): ";
                    cin >> arrivalDay;
                    cin >> arrivalMonth;
                    cin >> arrivalYear;
                    cout << "Departure date(day month year): ";
                    cin >> departureDay;
                    cin >> departureMonth;
                    cin >> departureYear;
                    cout << "Guest type: ";
                    cin >> guestType;
                    system("cls");
                    while (true)
                    {
                        for (int i = 0; i < bakuResort.sizeRoomArr; i++)
                        {
                            bakuResort.roomArr[i]->showInfo();
                        }
                        cout << "-----------------------------------------------------" << endl;
                        while (true)
                        {
                            cout << "Select the room number: ";
                            cin >> number;
                            if (bakuResort.findRoomIndex(number) >= 0)
                            {
                                break;
                            }
                            cout << "Room was not found" << endl;
                        }
                        if (bakuResort.roomArr[bakuResort.findRoomIndex(number)]->roomStatus != "busy")
                        {
                            int daysQuantity;
                            cout << "Enter days quantity: ";
                            cin >> daysQuantity;
                            bakuResort.addNewBooking(bookingDay, bookingMonth, bookingYear, surname, name, patronymic,
                                arrivalDay, arrivalMonth, arrivalYear, departureDay, departureMonth, departureYear, guestType, age, number, daysQuantity);
                            break;
                        }
                        else
                        {
                            cout << "That room is busy, select another room" << endl;
                            continue;
                        }

                    }


                    cout << "Booking added" << endl;
                    continue;
                }
                case 2:
                {
                    for (int i = 0; i < bakuResort.sizeBookingArr; i++)
                    {
                        bakuResort.bookingArr[i]->showInfo();
                    }
                    cout << "Change booking for delete" << endl;
                    cout << "Enter 0 to find by data" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    cin >> user_choice;
                    if (user_choice == 0)
                    {
                        cout << "Enter booking details" << endl;
                        cout << "Date(day month year): ";
                        cin >> bookingDay;
                        cin >> bookingMonth;
                        cin >> bookingYear;
                        bakuResort.findBookingByDate(bookingDay, bookingMonth, bookingYear);
                        cout << endl;
                        cout << "Change booking for delete" << endl;
                        cin >> user_choice;
                    }
                    bakuResort.deleteBooking(user_choice - 1);
                    cout << "Deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {
                    while (true)
                    {
                        cout << "Enter booking details" << endl;
                        cout << "Date(day month year): ";
                        cin >> bookingDay;
                        cin >> bookingMonth;
                        cin >> bookingYear;
                        cout << "Enter visitor details" << endl;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        while (true)
                        {
                            cout << "Enter room number: ";
                            cin >> number;
                            if (bakuResort.findRoomIndex(number) >= 0)
                            {
                                break;
                            }
                            cout << "Room was not found" << endl;
                        }
                        if (bakuResort.findBookingIndex(bookingDay, bookingMonth, bookingYear, bakuResort.guestArr[bakuResort.findGuestIndex(surname, name, patronymic)],
                            bakuResort.roomArr[bakuResort.findRoomIndex(number)]) >= 0)
                        {
                            break;
                        }
                        cout << "Booking was not found" << endl;
                    }

                    int ind = bakuResort.findBookingIndex(bookingDay, bookingMonth, bookingYear, bakuResort.guestArr[bakuResort.findGuestIndex(surname, name, patronymic)], bakuResort.roomArr[bakuResort.findRoomIndex(number)]);
                    bakuResort.bookingArr[ind]->showInfo();
                    cout << "-----------------------------------------------------" << endl;
                    cout << "1. Change booking \n2. Delete booking \n3. Return back";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                        system("cls");
                        {
                            cout << "Enter booking details" << endl;
                            cout << "Date(day month year): ";
                            cin >> bookingDay;
                            cin >> bookingMonth;
                            cin >> bookingYear;
                            cout << "Enter visitor details" << endl;
                            cout << "Name: ";
                            cin >> name;
                            cout << "Surname: ";
                            cin >> surname;
                            cout << "Patronymic: ";
                            cin >> patronymic;
                            cout << "Age: ";
                            cin >> age;
                            cout << "Arrival date: ";
                            cin >> arrivalDate;
                            cout << "Date of departure: ";
                            cin >> departurDate;
                            cout << "Guest type: ";
                            cin >> guestType;
                            system("cls");
                            for (int i = 0; i < bakuResort.sizeRoomArr; i++)
                            {
                                bakuResort.roomArr[i]->showInfo();
                            }
                            while (true)
                            {
                                cout << "Select the room number: ";
                                cout << "-----------------------------------------------------" << endl;
                                cin >> number;
                                if (bakuResort.findRoomIndex(number) >= 0)
                                {
                                    break;
                                }
                                cout << "Room was not found" << endl;
                            }
                            bakuResort.changeBooking(ind, bookingDay, bookingMonth, bookingYear, surname, name, patronymic, arrivalDate, departurDate, guestType, age,
                                bakuResort.roomArr[bakuResort.findRoomIndex(number)]->floor, number,
                                bakuResort.roomArr[bakuResort.findRoomIndex(number)]->roomClass, bakuResort.roomArr[bakuResort.findRoomIndex(number)]->price);
                            cout << "Data changed" << endl;
                            cout << "-----------------------------------------------------" << endl;
                            continue;
                        }
                    case 2:
                        bakuResort.deleteBooking(ind);
                        cout << "Booking deleted" << endl;
                        continue;
                    case 4:
                        continue;
                    }
                }
                case 4:
                    break;
                }
                break;
            }
            continue;
        case 5:
        {

            int billNumb;
            double totalAmount;

            double productPrice;
            int productsAmount;

            int ind;
            //ресторан
            while (true)
            {
                system("cls");
                system("color 61");
                victor.showInfo();
                cout << "MENU" << endl << "1. Guests \n2. Products \n3. Bills \n4. New order \n5. Back" << endl;
                cout << "-----------------------------------------------------" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                    system("cls");
                    while (true)
                    {
                        cout << "1. Show all guests \n2. Find guest \n3. Back" << endl;
                        cin >> user_choice;
                        switch (user_choice)
                        {
                        case 1:
                            system("cls");
                            for (int i = 0; i < victor.sizeGuestArr; i++)
                            {
                                victor.guestArr[i]->showInfo();
                            }
                            continue;
                        case 2:
                        {
                            while (true)
                            {
                                cout << "Enter guest details" << endl;
                                cout << "Surname: ";
                                cin >> surname;
                                cout << "Name: ";
                                cin >> name;
                                cout << "Patronymic: ";
                                cin >> patronymic;
                                if (victor.findGuestIndex(surname, name, patronymic) >= 0)
                                {
                                    break;
                                }
                                cout << "Guest was not found" << endl;

                            }
                            ind = victor.findGuestIndex(surname, name, patronymic);
                            int total = 0;
                            for (int i = 0; i < victor.guestArr[ind]->sizeGuestBillArr; i++)
                            {
                                victor.showGuestBillHistory(victor.guestArr[ind]);
                                total += victor.guestArr[ind]->guestBillArr[i]->totalAmount;
                            }
                            cout << "Total price: " << total << endl << endl;
                            continue;
                        }
                        case 3:
                            break;
                        }
                        break;
                    }
                    continue;
                case 2:
                    system("cls");
                    while (true)
                    {
                        cout << "1. Show all products \n2. Add new product \n3. Find product \n4. Back";
                        cin >> user_choice;
                        switch (user_choice)
                        {
                        case 1:
                            system("cls");
                            for (int i = 0; i < victor.sizeAllProductArr; i++)
                            {
                                victor.allProductArr[i]->showInfo();
                            }
                            cout << "1. Back" << endl;
                            cin >> user_choice;
                            continue;
                        case 2:
                            system("cls");
                            cout << "Enter product details: ";
                            cout << "Name: ";
                            cin >> name;
                            cout << "Product price: ";
                            cin >> productPrice;
                            cout << "Product amount: ";
                            cin >> productsAmount;
                            victor.addNewProduct(name, productPrice, productsAmount);
                            cout << "Product added" << endl << endl;
                            continue;
                        case 3:
                            while (true)
                            {
                                cout << "Product name: ";
                                cin >> name;
                                if (victor.findProductIndex(name) >= 0)
                                {
                                    break;
                                }
                                cout << "Product was not found" << endl;
                            }
                            ind = victor.findProductIndex(name);
                            victor.allProductArr[ind]->showInfo();
                            while (true)
                            {
                                cout << "1. Change product details \n2. Delete product \n3. Back" << endl;
                                cout << "-----------------------------------------------------" << endl;
                                cin >> user_choice;
                                switch (user_choice)
                                {
                                case 1:
                                    system("cls");
                                    cout << "Enter new product details: ";
                                    cout << "Name: ";
                                    cin >> name;
                                    cout << "Product price: ";
                                    cin >> productPrice;
                                    cout << "Product amount: ";
                                    cin >> productsAmount;
                                    victor.changeProduct(ind, name, productPrice, productsAmount);
                                    cout << "Data changed" << endl << endl;
                                    cout << "-----------------------------------------------------" << endl;
                                    break;
                                case 2:
                                    system("cls");
                                    victor.deleteProduct(ind);
                                    cout << "Product deleted" << endl << endl;
                                    cout << "-----------------------------------------------------" << endl;
                                    break;
                                case 3:
                                    cout << "-----------------------------------------------------" << endl;
                                    break;
                                }
                                break;
                            }
                            continue;
                        case 4:
                            break;

                        }
                        break;

                    }
                    continue;
                case 3:
                    while (true)
                    {
                        system("cls");
                        cout << "1. Show all bills \n2. Find bill \n3. Back" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        cin >> user_choice;
                        switch (user_choice)
                        {
                        case 1:
                            for (int i = 0; i < victor.sizeAllBillsArr; i++)
                            {
                                victor.allBillsArr[i]->showInfo();
                            }
                            cout << "-----------------------------------------------------" << endl;
                            cout << "1. Back" << endl;
                            cin >> user_choice;
                            continue;
                        case 2:
                            system("cls");
                            while (true)
                            {
                                cout << "Enter bill number: ";
                                cin >> billNumb;
                                if (victor.findBillIndex(billNumb))
                                {
                                    break;
                                }
                                cout << "Bill was bot found" << endl;

                            }
                            ind = victor.findBillIndex(billNumb);
                            system("cls");
                            victor.allBillsArr[ind]->showInfo();
                            while (true)
                            {
                                cout << "1. Change bill data \n2. Back" << endl;
                                cout << "-----------------------------------------------------" << endl;
                                cin >> user_choice;
                                switch (user_choice)
                                {
                                case 1:
                                    system("cls");
                                    cout << "Bill numb: ";
                                    cin >> billNumb;
                                    cout << "Total price: ";
                                    cin >> totalAmount;
                                    victor.changeBill(ind, billNumb, totalAmount);
                                    cout << "Data changed" << endl;
                                    cout << "-----------------------------------------------------" << endl;
                                    break;
                                case 2:
                                    break;
                                }
                                break;
                            }
                            continue;
                        case 3:
                            break;
                        }
                        break;
                    }
                    continue;
                case 4:
                {
                    system("cls");
                    int foodAmount = 0;
                    while (true)
                    {
                        cout << "Enter guest details" << endl;
                        cout << "Surname: ";
                        cin >> surname;
                        cout << "Name: ";
                        cin >> name;
                        cout << "Patronymic: ";
                        cin >> patronymic;
                        if (bakuResort.findGuestIndex(surname, name, patronymic) >= 0)
                        {
                            break;
                        }
                        cout << "Guest was not found in hotel" << endl;
                    }
                    system("cls");
                    if (victor.findGuestIndex(surname, name, patronymic) == -1)
                    {

                        victor.addNewGuest(bakuResort.guestArr[bakuResort.findGuestIndex(surname, name, patronymic)]);
                        victor.addNewBill(1000000 + rand() % (9999999 - 1000000), 0);
                        victor.addBillToGuest(victor.findGuestIndex(surname, name, patronymic), victor.findBillIndex(victor.allBillsArr[victor.sizeAllBillsArr - 1]->billNumb));
                        system("cls");
                        cout << "Select a product index" << endl;
                        while (true)
                        {
                            for (int i = 0; i < victor.sizeAllProductArr; i++)
                            {
                                cout << i + 1 << ". ";
                                victor.allProductArr[i]->showInfo();
                            }
                            cout << "-----------------------------------------------------" << endl;
                            cin >> user_choice;
                            cout << "Enter number of servings: ";
                            cin >> foodAmount;
                            victor.allProductArr[user_choice - 1]->productsAmount -= foodAmount;
                            victor.addProductInBill(victor.findBillIndex(victor.allBillsArr[victor.sizeAllBillsArr - 1]->billNumb), victor.allProductArr[user_choice - 1]->name, victor.allProductArr[user_choice - 1]->price, foodAmount);
                            victor.allBillsArr[victor.sizeAllBillsArr - 1]->totalAmount += victor.allProductArr[user_choice - 1]->price * foodAmount;
                            cout << "-----------------------------------------------------" << endl;
                            system("cls");
                            cout << "Enter 0 to finish or 1 to continue: ";
                            cin >> user_choice;
                            switch (user_choice)
                            {
                            case 0:
                                cout << "-----------------------------------------------------" << endl;
                                break;
                            case 1:
                                continue;
                            }
                            break;
                        }
                    }
                    else
                    {
                        victor.addNewBill(1000000 + rand() % (9999999 - 1000000), 0);
                        victor.addBillToGuest(victor.findGuestIndex(surname, name, patronymic), victor.findBillIndex(victor.allBillsArr[victor.sizeAllBillsArr - 1]->billNumb));
                        system("cls");
                        cout << "Select a product index" << endl;

                        while (true)
                        {
                            for (int i = 0; i < victor.sizeAllProductArr; i++)
                            {
                                cout << i + 1 << ". ";
                                victor.allProductArr[i]->showInfo();
                            }
                            cout << "-----------------------------------------------------" << endl;
                            cin >> user_choice;
                            cout << "Enter number of servings: ";
                            cin >> foodAmount;
                            victor.allProductArr[user_choice - 1]->productsAmount -= foodAmount;
                            victor.addProductInBill(victor.findBillIndex(victor.allBillsArr[victor.sizeAllBillsArr - 1]->billNumb), victor.allProductArr[user_choice - 1]->name, victor.allProductArr[user_choice - 1]->price, foodAmount);
                            victor.allBillsArr[victor.sizeAllBillsArr - 1]->totalAmount += victor.allProductArr[user_choice - 1]->price * foodAmount;
                            cout << "-----------------------------------------------------" << endl;
                            system("cls");
                            cout << "Enter 0 to finish or 1 to continue: ";
                            cin >> user_choice;
                            switch (user_choice)
                            {
                            case 0:
                                break;
                            case 1:
                                continue;
                            }
                            break;
                        }
                    }
                    continue;
                }
                case 5:
                    break;
                }
                break;
            }
            continue;
        }

        case 6:
            exit(0);

        }
    }
}