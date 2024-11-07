#include <iostream>
using namespace std;
class Hotel
{
private:
    string name;
    string adress;
    string stars;
    int capacity;
public:
    Hotel(string adress, string stars, int capacity)
    {
        this->adress = adress;
        this->stars = stars;
        this->capacity = capacity;
    }
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
};

class Guest
{
public:
    string surname;
    string name;
    string patronymic;
    string arrivalDate;
    string departurDate;
    string guestType;
    int amount = 0;
    int age;
    Guest()
    {

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
    }

    void findGuest(Guest** arr, const int size, Guest guest)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->surname == guest.surname && arr[i]->name == guest.name && arr[i]->patronymic == guest.patronymic)
            {
                arr[i]->showInfo();
            }
        }
    }

    void changeGuest(Guest** arr, int size, Guest guestCompare, Guest* new_guest_data)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->surname == guestCompare.surname && arr[i]->name == guestCompare.name && arr[i]->patronymic == guestCompare.patronymic)
            {
                delete[] arr[i];
                arr[i] = new_guest_data;
                break;
            }
        }
    }
    void addNewGuest(Guest**& arr, int& size, Guest* guest)
    {
        Guest** newArr = new Guest * [size + 1];
        for (int i = 0; i < size; i++)
        {
            newArr[i] = arr[i];
        }
        newArr[size] = guest;
        delete[] arr;
        size++;
        arr = newArr;
    }
    void deleteGuest(Guest**& arr, int& size, Guest guest)
    {
        Guest** newArr = new Guest * [size - 1];
        for (int i = 0, j = 0; i < size; i++)
        {
            if (arr[i]->surname == guest.surname && arr[i]->name == guest.name && arr[i]->patronymic == guest.patronymic && arr[i]->arrivalDate == guest.arrivalDate && arr[i]->departurDate == guest.departurDate && arr[i]->age == guest.age)
            {
                delete[] arr[i];
                continue;
            }
            newArr[j] = arr[i];
            j++;
        }
        delete[] arr;
        size--;
        arr = newArr;
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
    Room()
    {

    }
    Room(int floor, int number, string roomClass, int price)
    {
        this->floor = floor;
        this->number = number;
        this->roomClass = roomClass;
        this->price = price;
    }
    void findRoom(Room** arr, const int size, Room room)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->number == room.number)
            {
                arr[i]->showInfo();
                break;
            }
        }
    }

    void changeRoom(Room** arr, int size, Room roomCompare, Room* new_room_data)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->number == roomCompare.number)
            {
                delete[] arr[i];
                arr[i] = new_room_data;
                break;
            }
        }
    }

    void addNewRoom(Room**& arr, int& size, Room* room)
    {
        Room** newArr = new Room * [size + 1];
        for (int i = 0; i < size; i++)
        {
            newArr[i] = arr[i];
        }
        newArr[size] = room;
        delete[] arr;
        size++;
        arr = newArr;
    }
    void deleteRoom(Room**& arr, int& size, Room roomCompare)
    {
        Room** newArr = new Room * [size - 1];
        for (int i = 0, j = 0; i < size; i++)
        {
            if (arr[i]->number == roomCompare.number)
            {
                continue;
            }
            newArr[j] = arr[i];
            j++;
        }
        delete[] arr;
        size--;
        arr = newArr;
    }
    void showInfo()
    {
        cout << "floor: " << this->floor << endl;
        cout << "number: " << this->number << endl;
        cout << "room class: " << this->roomClass << endl;
        cout << "price: " << this->price << endl << endl;
    }
};

class Booking
{
public:
    string bookingDate;
    Guest* guest;
    Room* room;
    Booking()
    {

    }
    Booking(string bookingDate, Guest* guest, Room* room)
    {
        this->bookingDate = bookingDate;
        this->guest = guest;
        this->room = room;
    }

    void findBooking(Booking** arr, const int size, Booking bookingCompare)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->bookingDate == bookingCompare.bookingDate && arr[i]->guest == bookingCompare.guest)
            {
                arr[i]->showInfo();
                break;
            }
        }
    }

    void changeBooking(Room** arr, int size, Room roomCompare, Room* new_room_data)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i]->number == roomCompare.number)
            {
                delete[] arr[i];
                arr[i] = new_room_data;
                break;
            }
        }
    }

    void addNewBooking(Booking**& arr, int& size, Booking* booking)
    {
        Booking** newArr = new Booking * [size + 1];
        for (int i = 0; i < size; i++)
        {
            newArr[i] = arr[i];
        }
        newArr[size] = booking;
        delete[] arr;
        size++;
        arr = newArr;
    }

    void deleteBooking(Booking**& arr, int& size, Booking bookingCompare)
    {
        Booking** newArr = new Booking * [size - 1];
        for (int i = 0, j = 0; i < size; i++)
        {
            if (arr[i]->bookingDate == bookingCompare.bookingDate && arr[i]->guest == bookingCompare.guest && arr[i]->room == bookingCompare.room)
            {
                continue;
            }
            newArr[j] = arr[i];
            j++;
        }
        delete[] arr;
        size--;
        arr = newArr;
    }
    void showInfo()
    {
        cout << "booking date: " << this->bookingDate << endl;
        cout << "guest: " << this->guest << endl;
        cout << "room: " << this->room << endl << endl;
    }
};
int main()
{
    Hotel bakuResort = Hotel("Niyaz Gasimov 38", "*****", 1500);

    int guestSize = 3;
    Guest* ptrGuest1 = new Guest("Wick", "John", "Simonovich", "18.04.2024", "21.04.2024", "VIP", 32);
    Guest* ptrGuest2 = new Guest("Snow", "Codey", "Gardens", "15.04.2024", "18.04.2024", "regular", 21);
    Guest* ptrGuest3 = new Guest("Barks", "Boris", "Ivanovich", "11.04.2024", "26.04.2024", "VIP", 37);
    Guest** ptrArrGuest = new Guest * [guestSize];
    ptrArrGuest[0] = ptrGuest1;
    ptrArrGuest[1] = ptrGuest2;
    ptrArrGuest[2] = ptrGuest3;

    int roomSize = 3;
    Room* ptrRoom1 = new Room(1, 100, "Common", 100);
    Room* ptrRoom2 = new Room(2, 200, "Lux", 200);
    Room* ptrRoom3 = new Room(3, 300, "President-lux", 300);
    Room** ptrArrRoom = new Room * [roomSize];
    ptrArrRoom[0] = ptrRoom1;
    ptrArrRoom[1] = ptrRoom2;
    ptrArrRoom[2] = ptrRoom3;

    int bookingSize = 3;
    Booking** ptrArrBooking = new Booking * [bookingSize];
    ptrArrBooking[0] = new Booking("18.04.2024", ptrGuest1, ptrRoom1);
    ptrArrBooking[1] = new Booking("15.04.2024", ptrGuest2, ptrRoom2);
    ptrArrBooking[2] = new Booking("11.04.2024", ptrGuest3, ptrRoom3);

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
                for (int i = 0; i < guestSize; i++)
                {
                    ptrArrGuest[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add guest \n2. Delete guest \n3. Find guest \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                    {
                    Guest* newGuest = new Guest();
                    cout << "Enter visitor details" << endl;
                    cout <<  "Name: ";
                    cin >> newGuest->name;
                    cout << "Surname: ";
                    cin >> newGuest->surname;
                    cout << "Patronymic: ";
                    cin >> newGuest->patronymic;
                    cout << "Age: ";
                    cin >> newGuest->age;
                    cout << "Arrival date: ";
                    cin >> newGuest->arrivalDate;
                    cout << "Date of departure: ";
                    cin >> newGuest->departurDate;
                    cout << "Guest type: ";
                    cin >> newGuest->guestType;
                    newGuest->addNewGuest(ptrArrGuest, guestSize, newGuest);
                    cout << "Guest added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                    }
                case 2:
                    {
                    Guest guestCompare = Guest();
                    cout << "Enter visitor details" << endl;
                    cout << "Name: ";
                    cin >> guestCompare.name;
                    cout << "Surname: ";
                    cin >> guestCompare.surname;
                    cout << "Patronymic: ";
                    cin >> guestCompare.patronymic;
                    cout << "Age: ";
                    cin >> guestCompare.age;
                    cout << "Arrival date: ";
                    cin >> guestCompare.arrivalDate;
                    cout << "Date of departure: ";
                    cin >> guestCompare.departurDate;
                    guestCompare.deleteGuest(ptrArrGuest, guestSize, guestCompare);
                    cout << "Guest deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                    }
                case 3:
                {
                    Guest guestCompare = Guest();
                    cout << "Enter visitor details" << endl;
                    cout << "Name: ";
                    cin >> guestCompare.name;
                    cout << "Surname: ";
                    cin >> guestCompare.surname;
                    cout << "Patronymic: ";
                    cin >> guestCompare.patronymic;
                    guestCompare.findGuest(ptrArrGuest, guestSize, guestCompare);
                    cout << "1. Change guest \n2. Delete guest \n3. Return back";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                    {
                        Guest * newGuest = new Guest();
                        cout << "Enter visitor details" << endl;
                        cout << "Name: ";
                        cin >> newGuest->name;
                        cout << "Surname: ";
                        cin >> newGuest->surname;
                        cout << "Patronymic: ";
                        cin >> newGuest->patronymic;
                        cout << "Age: ";
                        cin >> newGuest->age;
                        cout << "Arrival date: ";
                        cin >> newGuest->arrivalDate;
                        cout << "Date of departure: ";
                        cin >> newGuest->departurDate;
                        cout << "Guest type: ";
                        cin >> newGuest->guestType;
                        newGuest->changeGuest(ptrArrGuest, guestSize, guestCompare, newGuest);
                        cout << "Data changed" << endl;
                        continue;
                    }
                    case 2:
                        guestCompare.deleteGuest(ptrArrGuest, guestSize, guestCompare);
                        cout << "Guest deleted" << endl;
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
        case 3:
            while (true)
            {
                for (int i = 0; i < roomSize; i++)
                {
                    ptrArrRoom[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add room \n2. Delete room \n3. Find room \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                {
                    Room* newRoom = new Room();
                    cout << "Enter room details" << endl;
                    cout << "Floor: ";
                    cin >> newRoom->floor;
                    cout << "Number: ";
                    cin >> newRoom->number;
                    cout << "Room class: ";
                    cin >> newRoom->roomClass;
                    cout << "Price: ";
                    cin >> newRoom->price;
                    newRoom->addNewRoom(ptrArrRoom, roomSize, newRoom);
                    cout << "Room added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 2:
                {
                    Room roomCompare = Room();
                    cout << "Enter room details" << endl;
                    cout << "Floor: ";
                    cin >> roomCompare.floor;
                    cout << "Number: ";
                    cin >> roomCompare.number;
                    cout << "Room class: ";
                    cin >> roomCompare.roomClass;
                    cout << "Price: ";
                    cin >> roomCompare.price;
                    roomCompare.deleteRoom(ptrArrRoom, roomSize, roomCompare);
                    cout << "Room deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                    {
                    Room roomCompare = Room();
                    cout << "Enter room details" << endl;
                    cout << "Floor: ";
                    cin >> roomCompare.floor;
                    cout << "Number: ";
                    cin >> roomCompare.number;
                    cout << "Room class: ";
                    cin >> roomCompare.roomClass;
                    cout << "Price: ";
                    cin >> roomCompare.price;
                    roomCompare.findRoom(ptrArrRoom, roomSize, roomCompare);
                    cout << "1. Change room \n2. Delete room \n3. Return back";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                    {
                        Room* newRoom = new Room();
                        cout << "Enter room details" << endl;
                        cout << "Floor: ";
                        cin >> newRoom->floor;
                        cout << "Number: ";
                        cin >> newRoom->number;
                        cout << "Room class: ";
                        cin >> newRoom->roomClass;
                        cout << "Price: ";
                        cin >> newRoom->price;
                        newRoom->changeRoom(ptrArrRoom, roomSize, roomCompare, newRoom);
                        cout << "Data changed" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    }
                    case 2:
                        roomCompare.deleteRoom(ptrArrRoom, roomSize, roomCompare);
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
        case 4:
            while (true)
            {
                for (int i = 0; i < roomSize; i++)
                {
                    ptrArrBooking[i]->showInfo();
                }
                cout << "-----------------------------------------------------" << endl;
                cout << endl;
                cout << "1. Add booking \n2. Delete booking \n3. Find booking \n4. Return to menu" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                {
                    Booking* newBooking = new Booking();
                    cout << "Enter booking details" << endl;
                    cout << "Date: ";
                    cin >> newBooking->bookingDate;
                    Guest* newGuest = new Guest();
                    cout << "Enter visitor details" << endl;
                    cout << "Name: ";
                    cin >> newGuest->name;
                    cout << "Surname: ";
                    cin >> newGuest->surname;
                    cout << "Patronymic: ";
                    cin >> newGuest->patronymic;
                    cout << "Age: ";
                    cin >> newGuest->age;
                    cout << "Arrival date: ";
                    cin >> newGuest->arrivalDate;
                    cout << "Date of departure: ";
                    cin >> newGuest->departurDate;
                    cout << "Guest type: ";
                    cin >> newGuest->guestType;
                    newGuest->addNewGuest(ptrArrGuest, guestSize, newGuest);
                    newBooking->guest = ptrArrGuest[guestSize - 1];
                    cout << "Select the room: ";
                    for (int i = 0; i < roomSize; i++)
                    {
                        ptrArrRoom[i]->showInfo();
                    }
                    cin >> user_choice;
                    ptrArrRoom[user_choice - 1]->reserved = true;
                    newBooking->room = ptrArrRoom[user_choice - 1];
                    newBooking->addNewBooking(ptrArrBooking, bookingSize, newBooking);
                    cout << "Booking added" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 2:
                {
                    cout << "Change booking for delete" << endl;
                    for (int i = 0; i < bookingSize; i++)
                    {
                        ptrArrBooking[i]->showInfo();
                    }
                    cin >> user_choice;
                    delete[] ptrArrBooking[user_choice - 1];
                    cout << "Deleted" << endl;
                    cout << "Room deleted" << endl;
                    cout << "-----------------------------------------------------" << endl;
                    continue;
                }
                case 3:
                {
                    Booking bookingCompare = Booking();
                    cout << "Enter booking details" << endl;
                    cout << "Date: ";
                    cin >> bookingCompare.bookingDate;
                    cout << "Enter visitor details" << endl;
                    Guest* guestCompare = new Guest();
                    cout << "Name: ";
                    cin >> guestCompare->name;
                    cout << "Surname: ";
                    cin >> guestCompare->surname;
                    cout << "Patronymic: ";
                    cin >> guestCompare->patronymic;
                    cout << "Age: ";
                    cin >> guestCompare->age;
                    cout << "Arrival date: ";
                    cin >> guestCompare->arrivalDate;
                    cout << "Date of departure: ";
                    cin >> guestCompare->departurDate;
                    cout << "Guest type: ";
                    cin >> guestCompare->guestType;
                    bookingCompare.findBooking(ptrArrBooking, bookingSize, bookingCompare);
                    cout << "1. Change booking \n2. Delete booking \n3. Return back";
                    cin >> user_choice;
                    switch (user_choice)
                    {
                    case 1:
                    {
                        int booking_choice;
                        for (int i = 0; i < bookingSize; i++)
                        {
                            ptrArrBooking[i]->showInfo();
                        }
                        cout << "Select booking for change: ";
                        cin >> booking_choice;
                        Booking* newBooking = new Booking();
                        cout << "Enter new booking details" << endl;
                        cout << "Date: ";
                        cin >> newBooking->bookingDate;
                        Guest* newGuest = new Guest();
                        cout << "Enter visitor details" << endl;
                        cout << "Name: ";
                        cin >> newGuest->name;
                        cout << "Surname: ";
                        cin >> newGuest->surname;
                        cout << "Patronymic: ";
                        cin >> newGuest->patronymic;
                        cout << "Age: ";
                        cin >> newGuest->age;
                        cout << "Arrival date: ";
                        cin >> newGuest->arrivalDate;
                        cout << "Date of departure: ";
                        cin >> newGuest->departurDate;
                        cout << "Guest type: ";
                        cin >> newGuest->guestType;
                        newGuest->addNewGuest(ptrArrGuest, guestSize, newGuest);
                        newBooking->guest = ptrArrGuest[guestSize - 1];
                        cout << "Select the room: ";
                        for (int i = 0; i < roomSize; i++)
                        {
                            ptrArrRoom[i]->showInfo();
                        }
                        cin >> user_choice;
                        delete[] ptrArrBooking[booking_choice - 1];
                        ptrArrRoom[user_choice - 1]->reserved = true;
                        newBooking->room = ptrArrRoom[user_choice - 1];
                        ptrArrBooking[booking_choice - 1] = newBooking;
                        cout << "Data changed" << endl;
                        cout << "-----------------------------------------------------" << endl;
                        continue;
                    }
                    case 2:
                        bookingCompare.deleteBooking(ptrArrBooking, bookingSize, bookingCompare);
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
        case 5:
            exit(0);
            }
        }
    }
}