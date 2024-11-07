#include <iostream>
using namespace std;
int main()
{
    /*Zadanie1.

    Realizovat meneger pamati.
    Dat vozmojnost polzovatelu videlat i udalat na to kolicestvo pamati kotoroe on xocet.
    Razmer pamati vvoditsa so storoni polzovatela.

    Takje dobavit funkcional inicializacii int massiva randomnimi coslami.
    Ispolzovat arifmetiku ukazateley.


    Realizovat menu obweniya s polzovatelem.

    MENU
    1 Allocate memory(size that want user)
    2 Clear memory
    3 Intialize int arr with random numbers
    4 Show arr
    5 Exit*/

    int u_choice;
    int m_size;
    int arr_size = 0;
    int* ptr = nullptr;
    int* ptrArr = nullptr;
    while (true)
    {
        if (ptr != nullptr)
        {
            cout << "Allocated memory(adress/size): " << ptr << " / " << *ptr / 1000000 << endl;
        }
        if (ptrArr != nullptr)
        {
            cout << "Created arr(adress/size): " << ptrArr << " / " << arr_size << endl;
        }
        cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
        cout << "1 Allocate memory\n2 Clear memory\n3 Intialize int arr with random numbers\n4 Show arr\n5 Exit" << endl;
        cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
        cin >> u_choice;
        switch (u_choice)
        {
        case 1:
            if (ptr == nullptr)
            {
                cout << "Enter the memory size to allocate(mb): ";
                cin >> m_size;
                m_size *= 1000000;
                ptr = new int(m_size);
                cout << "new memory cell has been created with the address of " << ptr << " and with the size of " << m_size/1000000 << "mb" << endl;
                cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
            }
            else
            {
                cout << "You have already created a memory cell and creating another one will lead to a memory leak, delete the previous cell to create a new one" << endl;
                cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
            } 
            continue;
        case 2:
            cout << "You want to delete an arr(1) or allocated memory(2): ";
            cin >> u_choice;
            switch (u_choice)
            {
            case 1:
                if (ptrArr != nullptr && arr_size != 0)
                {
                    cout << ptrArr << " with size " << arr_size << " cleared" << endl;
                    delete[] ptrArr;
                    arr_size = 0;
                    ptrArr = nullptr;
                }
                else cout << "The array has not created" << endl;
                break;
            case 2:
                if (ptr != nullptr)
                {
                    cout << ptr << " with size " << *ptr / 1000000 << "mb cleared" << endl;
                    delete ptr;
                    ptr = nullptr;
                }
                else cout << "No memory allocated" << endl;
                break;
            }
            cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
            continue;
        case 3:
            cout << "Enter the arr size: ";
            cin >> arr_size;
            ptrArr = new int[arr_size];
            for (int i = 0; i < arr_size; i++)
            {
                *(ptrArr + i) = rand() % 100;
            }
            cout << "New arr with size " << arr_size << " and adress " << ptrArr << " has been created" << endl;
            cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
            continue;
        case 4:
            if (arr_size > 0)
            {
                for (int i = 0; i < arr_size; i++)
                {
                    cout << *(ptrArr + i) << ' ';
                }
                cout << endl;
            }
            else cout << "The array has not created" << endl;
            cout << "---------------------------------------------------------------------------------------------------------------------------" << endl;
            continue;
        case 5:
            break;
        }
        break;
    }

}
