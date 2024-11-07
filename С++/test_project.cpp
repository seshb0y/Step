#include <iostream>
using namespace std;

class Booking;
class Hotel;

class Guest
{
public:
    string surname;
    string name;
    string patronymic;
    string arrivalDate;
    string departurDate;
    string guestType;
    int age;

    Booking** bookingHistory;
    int size_bookingHistory = 0;
    
    //?КАК ВЫВОДИТЬ БУКИНГ?
    void showBookingHistory()
    {
        for (int i = 0; i < size_bookingHistory; i++)
        {
            cout << "Booking date: ";
            cout << bookingHistory[i]->bookingDate << endl;
            cout << "Room floor: ";
            cout << bookingHistory[i]->room->floor << endl;
            cout << "Room number: ";
            cout << bookingHistory[i]->room->number << endl;
            cout << "Room class: ";
            cout << bookingHistory[i]->room->roomClass << endl;
            cout << "Room price: ";
            cout << bookingHistory[i]->room->price << endl;
        }
    }

    Guest(string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age)
    {
        this->surname = surname;
        this->name = name;
        this->patronymic = patronymic;
        this->arrivalDate = arrivalDate;
        this->departurDate = departurDate;
        this->guestType = guestType;
        this->age = age;
        this->bookingHistory = new Booking * [size_bookingHistory];
    }

    


    void addExistBooking(Booking* booking)
    {
        Booking** newArr = new Booking * [size_bookingHistory+1];
        for (int i = 0; i < size_bookingHistory; i++)
        {
            newArr[i] = bookingHistory[i];
        }
        newArr[size_bookingHistory] = booking;
        delete[] bookingHistory;
        bookingHistory = newArr;
        this->size_bookingHistory++;
    }

    void showInfo()
    {
        cout << "surname: " << surname << endl;
        cout << "name: " << name << endl;
        cout << "patronymic: " << patronymic << endl;
        cout << "arrival date: " << arrivalDate << endl;
        cout << "date of departure: " << departurDate << endl;
        cout << "guest type: " << guestType << endl;
        cout << "age: " << age << endl << endl;
    };
};



class Room
{
public:
    int floor;
    int number;
    string roomClass;
    int price;
    bool reserved = false;
    Guest** guestHistory;
    int size_guestHistory = 0;
    void showGuestHistory(Guest* guest)
    {
        for (int i = 0; i < size_guestHistory; i++)
        {
            cout << "surname: " << guestHistory[i]->surname << endl;
            cout << "name: " << guestHistory[i]->name << endl;
            cout << "patronymic: " << guestHistory[i]->patronymic << endl;
            cout << "arrival date: " << guestHistory[i]->arrivalDate << endl;
            cout << "date of departure: " << guestHistory[i]->departurDate << endl;
            cout << "guest type: " << guestHistory[i]->guestType << endl;
            cout << "age: " << guestHistory[i]->age << endl << endl;
        }
    }

    Room(int floor, int number, string roomClass, int price)
    {
        this->floor = floor;
        this->number = number;
        this->roomClass = roomClass;
        this->price = price;
    }

    void showInfo()
    {
        cout << "floor: " << floor << endl;
        cout << "number: " << number << endl;
        cout << "room class: " << roomClass << endl;
        cout << "price: " << price << endl << endl;
    }
};

class Booking
{
public:
    string bookingDate;
    Guest* guest;
    Room* room;
    Booking(string bookingDate, Guest* guest, Room* room)
    {
        this->bookingDate = bookingDate;
        this->guest = guest;
        this->room = room;
    }


    void showInfo()
    {
        cout << "booking date: " << bookingDate << endl << endl;
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
    int sizeGuestArr = 3;

    Room** roomArr;
    int sizeRoomArr = 3;

    Booking** bookingArr;
    int sizeBookingArr = 3;

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
        string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age)
    {
        guestArr[ind]->surname = surname;
        guestArr[ind]->name = name;
        guestArr[ind]->patronymic = patronymic;
        guestArr[ind]->arrivalDate = arrivalDate;
        guestArr[ind]->departurDate = departurDate;
        guestArr[ind]->guestType = guestType;
        guestArr[ind]->age = age;
    }
    void addNewGuest(string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age)
    {
        Guest* newGuest = new Guest(surname, name, patronymic, arrivalDate, departurDate, guestType, age);
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
    void deleteGuest(int index)
    {
        Guest** newGuestArr = new Guest * [sizeGuestArr - 1];
        for (int i = 0, j = 0; i < sizeGuestArr; i++)
        {
            if (i == index)
            {
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

    int findBookingIndex(string bookingDate, Guest* guest, Room* room)
    {
        for (int i = 0; i < sizeBookingArr; i++)
        {
            if (bookingArr[i]->bookingDate == bookingDate &&
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

    void changeBooking(int index, string bookingDate,
        string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age,
        int floor, int number, string roomClass, int price)
    {
        bookingArr[index]->bookingDate = bookingDate;
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

    void addNewBooking(string bookingDate,
        string surname, string name, string patronymic, string arrivalDate, string departurDate, string guestType, int age,
        int number)
    {
        Booking** newArr = new Booking * [sizeBookingArr + 1];
        for (int i = 0; i < sizeBookingArr; i++)
        {
            newArr[i] = bookingArr[i];
        }
        if (findGuestIndex(surname, name, patronymic) >= 0)
        {
            Booking* newBooking = new Booking(bookingDate, guestArr[findGuestIndex(surname, name, patronymic)], roomArr[findRoomIndex(number)]);
            newArr[sizeBookingArr] = newBooking;
            guestArr[findGuestIndex(surname, name, patronymic)]->addExistBooking(newBooking);
        }
        else
        {
            addNewGuest(surname, name, patronymic, arrivalDate, departurDate, guestType, age);
            Booking* newBooking = new Booking(bookingDate, guestArr[sizeGuestArr-1], roomArr[findRoomIndex(number)]);
            newArr[sizeBookingArr] = newBooking;
            guestArr[sizeGuestArr-1]->addExistBooking(newBooking);
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

    int guestSize = 3;
    Guest* ptrGuest1 = new Guest("Wick", "John", "Simonovich", "18.04.2024", "21.04.2024", "VIP", 32);
    Guest* ptrGuest2 = new Guest("Snow", "Codey", "Gardens", "15.04.2024", "18.04.2024", "regular", 21);
    Guest* ptrGuest3 = new Guest("Barks", "Boris", "Ivanovich", "11.04.2024", "26.04.2024", "VIP", 37);
    bakuResort.guestArr[0] = ptrGuest1;
    bakuResort.guestArr[1] = ptrGuest2;
    bakuResort.guestArr[2] = ptrGuest3;

    int roomSize = 3;
    Room* ptrRoom1 = new Room(1, 100, "Common", 100);
    Room* ptrRoom2 = new Room(2, 200, "Lux", 200);
    Room* ptrRoom3 = new Room(3, 300, "President-lux", 300);
    bakuResort.roomArr[0] = ptrRoom1;
    bakuResort.roomArr[1] = ptrRoom2;
    bakuResort.roomArr[2] = ptrRoom3;

    int bookingSize = 3;
    bakuResort.bookingArr[0] = new Booking("18.04.2024", ptrGuest1, ptrRoom1);
    bakuResort.bookingArr[1] = new Booking("15.04.2024", ptrGuest2, ptrRoom2);
    bakuResort.bookingArr[2] = new Booking("11.04.2024", ptrGuest3, ptrRoom3);

    string surname;
    string name;
    string patronymic;
    string arrivalDate;
    string departurDate;
    string guestType;
    int age;

    int floor;
    int number;
    string roomClass;
    int price;

    string bookingDate;

    int user_choice;
    while (true)
    {
        cout << "Menu \n1. Show Hotel \n2. Show guest list \n3. Show room list \n4. Show booking list \n5.Exit" << endl;
        cin >> user_choice;
        switch (user_choice)
        {
        case 1:
            cout << "Name: " << bakuResort.getName() << endl << "Adress: " << bakuResort.getAdress() << endl << "Capacity: " << bakuResort.getCapacity() << endl << "Stars: " << bakuResort.getStars() << endl;
            cout << "-----------------------------------------------------" << endl;
            continue;
        case 2:

            while (true)
            {
                for (int i = 0; i < bakuResort.sizeGuestArr; i++)
                {
                    bakuResort.guestArr[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add guest \n2. Delete guest \n3. Find guest \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
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
                    cout << "Arrival date: ";
                    cin >> arrivalDate;
                    cout << "Date of departure: ";
                    cin >> departurDate;
                    cout << "Guest type: ";
                    cin >> guestType;
                    bakuResort.addNewGuest(surname, name, patronymic, arrivalDate, departurDate, guestType, age);
                    cout << "Guest added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 2:
                {
                    cout << "Enter visitor details" << endl;
                    cout << "Surname: ";
                    cin >> surname;
                    cout << "Name: ";
                    cin >> name;
                    cout << "Patronymic: ";
                    cin >> patronymic;
                    bakuResort.deleteGuest(bakuResort.findGuestIndex(surname, name, patronymic));
                    cout << "Guest deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {

                    cout << "Enter visitor details" << endl;
                    cout << "Surname: ";
                    cin >> surname;
                    cout << "Name: ";
                    cin >> name;
                    cout << "Patronymic: ";
                    cin >> patronymic;
                    int index = bakuResort.findGuestIndex(surname, name, patronymic);
                    cout << "1. Change guest \n2. Delete guest \n3. Return back \n4. Show boking list";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
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
                        cout << "Arrival date: ";
                        cin >> arrivalDate;
                        cout << "Date of departure: ";
                        cin >> departurDate;
                        cout << "Guest type: ";
                        cin >> guestType;
                        bakuResort.changeGuest(index, surname, name, patronymic, arrivalDate, departurDate, guestType, age);
                        cout << "Data changed" << endl;
                        continue;
                    }
                    case 2:
                        bakuResort.deleteGuest(index);
                        cout << "Guest deleted" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 3:
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 4:
                        bakuResort.guestArr[index]->showBookingHistory();
                    }

                }
                case 4:
                    break;
                }
                break;
            }
            continue;
        case 3:
            while (true)
            {
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
                    cout << "Enter room details" << endl;
                    cout << "Number: ";
                    cin >> number;
                    bakuResort.deleteRoom(bakuResort.findRoomIndex(number));
                    cout << "Room deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {
                    cout << "Enter room details" << endl;
                    cout << "Number: ";
                    cin >> number;
                    int ind = bakuResort.findRoomIndex(number);
                    cout << "1. Change room \n2. Delete room \n3. Return back";
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
                        bakuResort.deleteRoom(ind);
                        cout << "Room deleted" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 3:
                        cout << "-----------------------------------------------------" << endl;
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
                    cout << "Date: ";
                    cin >> bookingDate;
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
                    cout << "Select the room number: ";
                    for (int i = 0; i < roomSize; i++)
                    {
                        bakuResort.roomArr[i]->showInfo();
                    }
                    cin >> number;
                    bakuResort.addNewBooking(bookingDate, surname, name, patronymic, arrivalDate, departurDate, guestType, age, number);
                    
                    cout << "Booking added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 2:
                {
                    cout << "Change booking for delete" << endl;
                    for (int i = 0; i < bookingSize; i++)
                    {
                        bakuResort.bookingArr[i]->showInfo();
                    }
                    cin >> user_choice;
                    bakuResort.deleteBooking(user_choice - 1);
                    cout << "Deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {
                    cout << "Enter booking details" << endl;
                    cout << "Date: ";
                    cin >> bookingDate;
                    cout << "Enter visitor details" << endl;
                    cout << "Name: ";
                    cin >> name;
                    cout << "Surname: ";
                    cin >> surname;
                    cout << "Patronymic: ";
                    cin >> patronymic;
                    cout << "Enter room number: ";
                    cin >> number;
                    int ind = bakuResort.findBookingIndex(bookingDate, bakuResort.guestArr[bakuResort.findGuestIndex(surname, name, patronymic)], bakuResort.roomArr[bakuResort.findRoomIndex(number)]);
                    bakuResort.bookingArr[ind]->showInfo();
                    cout << "1. Change booking \n2. Delete booking \n3. Return back";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                    {
                        cout << "Enter booking details" << endl;
                        cout << "Date: ";
                        cin >> bookingDate;
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
                        cout << "Select the room number: ";
                        for (int i = 0; i < roomSize; i++)
                        {
                            bakuResort.roomArr[i]->showInfo();
                        }
                        cin >> number;
                        bakuResort.changeBooking(ind, bookingDate, surname, name, patronymic, arrivalDate, departurDate, guestType, age,
                            bakuResort.roomArr[bakuResort.findRoomIndex(number)]->floor, number,
                            bakuResort.roomArr[bakuResort.findRoomIndex(number)]->roomClass, bakuResort.roomArr[bakuResort.findRoomIndex(number)]->price);
                        cout << "Data changed" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    }
                    case 2:
                        bakuResort.deleteBooking(ind);
                        cout << "Booking deleted" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    case 3:
                        cout << "-----------------------------------------------------" << endl;
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
            exit(0);

        }
    }
}