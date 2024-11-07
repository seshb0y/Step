#include <iostream>

using namespace std;
int main()
{
    float car_price = 4.79;
    int car_count = 15;
    int user_car_count = 0;

    float doll_price = 3.35;
    int doll_count = 10;
    int user_doll_count = 0;

    float carrot_price = 2.55;
    int carrot_count = 30;
    int user_carrot_count = 0;

    float skirt_price = 8.95;
    int skirt_count = 20;
    int user_skirt_count = 0;

    int user_choice;

    float total_order = 0;
    float total_amount = 0;


    while (true)
    {
        cout << "####################################################################\n" << endl;
        cout << "Menu\n1. New order\n2. Show total amount\n3. Show all toys\n4. Exit\n" << endl;
        cout << "####################################################################\n" << endl;
        cin >> user_choice;
        switch (user_choice)
        {
        case 1:
            while (true)
            {
                cout << "####################################################################\n" << endl;
                cout << "Total order amount: " << total_order << "\nMenu\n" << endl;
                cout << "1. Car - " << car_price << "m - " << car_count << endl;
                cout << "2. Doll - " << doll_price << "m - " << doll_count << endl;
                cout << "3. Carrrot - " << carrot_price << "m - " << carrot_count << endl;
                cout << "4. Skirt - " << skirt_price << "m - " << skirt_count << endl;
                cout << "5. Finish order" << endl;
                cout << "6. Cancel order\n" << endl;
                cout << "####################################################################\n" << endl;
                cin >> user_choice;
                switch (user_choice)
                {
                case 1:
                    cout << "####################################################################\n" << endl;
                    cout << "Enter amount of cars\n" << endl;
                    cout << "####################################################################\n" << endl;
                    cin >> user_car_count;
                    if ((car_count - user_car_count) >= 0)
                    {
                        car_count -= user_car_count;
                        total_order += user_car_count * car_price;
                        
                    }
                    else
                    {
                        cout << "Sorry, but we have only " << car_count << " cars" << endl;
                    }
                    
                    continue;
                case 2:
                    cout << "####################################################################\n" << endl;
                    cout << "Enter amount of dolls\n" << endl;
                    cout << "####################################################################\n" << endl;
                    cin >> user_doll_count;
                    if ((doll_count - user_doll_count) >= 0)
                    {
                        doll_count -= user_doll_count;
                        total_order += user_doll_count * doll_price;

                    }
                    else
                    {
                        cout << "Sorry, but we have only " << doll_count << " dolls" << endl;
                    }
                    continue;
                case 3:
                    cout << "####################################################################\n" << endl;
                    cout << "Enter amount of carrots\n" << endl;
                    cout << "####################################################################\n" << endl;
                    cin >> user_carrot_count;
                    if ((carrot_count - user_carrot_count) >= 0)
                    {
                        carrot_count -= user_carrot_count;
                        total_order += user_carrot_count * carrot_price;

                    }
                    else
                    {
                        cout << "Sorry, but we have only " << carrot_count << " carrots" << endl;
                    }
                    continue;
                case 4:
                    cout << "####################################################################\n" << endl;
                    cout << "Enter amount of skirts\n" << endl;
                    cout << "####################################################################\n" << endl;
                    cin >> user_skirt_count;
                    if ((skirt_count - user_skirt_count) >= 0)
                    {
                        skirt_count -= user_skirt_count;
                        total_order += user_skirt_count * skirt_price;

                    }
                    else
                    {
                        cout << "####################################################################\n" << endl;
                        cout << "Sorry, but we have only " << skirt_count << " skirts\n" << endl;
                        cout << "####################################################################\n" << endl;
                    }
                    continue;
                case 5:
                    cout << "####################################################################\n" << endl;
                    if (total_order >= 100 && total_order < 200)
                    {
                        cout << "Your total order is more than 100, so we give you a 10% discount" << endl;
                        total_order -= total_order / 100 * 10;
                        cout << "Now your total order is equal " << total_order << "m" << endl;
                    }
                    else if (total_order >= 200 && total_order < 300)
                    {
                        cout << "Your total order is more than 200, so we give you a 20% discount" << endl;
                        total_order -= total_order / 100 * 20;
                        cout << "Now your total order is equal " << total_order << "m" << endl;
                    }
                    else if (total_order >= 300)
                    {
                        cout << "Your total order is more than 300, so we give you a 30% discount" << endl;
                        total_order -= total_order / 100 * 30;
                        cout << "Now your total order is equal " << total_order << "m" << endl;
                    }

                    total_amount += total_order;

                    cout << "Thank you for your purchase\n" << endl;
                    cout << "####################################################################\n" << endl;
                    break;
                default:
                    car_count += user_car_count;    
                    doll_count += user_doll_count;
                    carrot_count += user_carrot_count;
                    skirt_count += user_skirt_count;

                    break;
                }
                total_order = 0;
                break;
            }continue;

        case 2:
            cout << "####################################################################\n" << endl;
            cout << "Total amount is " << total_amount << "m\n" << endl;
            cout << "1. Back" << "\n" << endl;
            cout << "####################################################################\n" << endl;
            cin >> user_choice;
            continue;
        case 3:
            cout << "####################################################################\n" << endl;
            cout << "1. Car - " << car_count << endl;
            cout << "2. Doll - " << doll_count << endl;
            cout << "3. Carrrot - " << carrot_count << endl;
            cout << "4. Skirt - " << skirt_count << "\n" << endl;
            cout << "5. Back\n" << endl;
            cout << "####################################################################\n" << endl;
            cin >> user_choice;
            continue;
        default:
            cout << "####################################################################\n" << endl;
            cout << "Goodbye!\n" << endl;
            cout << "####################################################################\n" << endl;
            break;
        }
        break;
    }
}
