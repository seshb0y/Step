#include <iostream>

using namespace std;


//Napisat funkciyu kotoraya videlaet dinamiceskuyu pamat s cislom kotorim vvedet polzovatel.
//
//
//polzovatel doljen videlit pamat dla trex peremennix.
//
//
//Daleye polzovatel vibiraet po znaceniyu kakuyu iz ukazateley xocet ocistit.
//
//Sozdayte funkcii dla ociweniya pamati i vivoda soobweniya wto pamat "0x16 so znaceniem 777 ociwena".
//
//Ispolzovat operator new dla videleniya pamati i operatori razimenovaniiya.

void clearMemory(int* ptr)
{
    cout << ptr << " with value " << *ptr << " cleared" << endl;
    delete ptr;
}

void allocateMemory()
{
    int num1;
    cout << "enter the first num: ";
    cin >> num1;
    int* ptrNum1 = new int(num1);
    cout << "The locate of the first num is " << ptrNum1 << endl;
    int num2;
    cout << "enter the second num: ";
    cin >> num2;
    int* ptrNum2 = new int(num2);
    cout << "The locate of the secomd num is " << ptrNum2 << endl;
    int num3;
    cout << "enter the third num: ";
    cin >> num3;
    int* ptrNum3 = new int(num3);
    cout << "The locate of the third num is " << ptrNum3 << endl;
    for (int i = 0; i < 3; i++)
    {
        cout << "select a value for delete" << endl;
        int u_choice;
        cin >> u_choice;
        if (u_choice == num1)
        {
            clearMemory(ptrNum1);
        }
        else if (u_choice == num2)
        {
            clearMemory(ptrNum2);
        }
        else if (u_choice == num3)
        {
            clearMemory(ptrNum3);
        }
        else break;
    }
}

int main()
{
    allocateMemory();
}


