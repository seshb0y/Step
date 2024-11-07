#include <iostream>
#include <cmath>
//Задание 1
//Пользователь вводит номер года.Необходимо написать программу, которая выведет
//  количество дней в этом году.При написании программы использовать линейный алгоритм(конструкции условного выбора не использовать).
// Например, пользователь ввел год 2004, программа сообщает, что в этом году 366 дней в следующей форме :
//In 2004 year = 366 days

using namespace std;
int main()
{
	int num;
	cout << "Enter an year: ";
	cin >> num;
	if (num % 4 == 0)
	{
		cout << "In " << num << " year = 366 days" << endl;
	}
	else
	{
		cout << "In " << num << " year = 365 days" << endl;
	}
}



//Задание 2
//Пользователь вводит с клавиатуры денежную сумму в гривнах и копейках(гривны и копейки вводятся в разные переменные).
//Сумма может быть введена как правильно(например 19 грн. 90 коп.), так и неправильно(например 22 грн. 978 коп.).
//Написать программу, которая, используя только линейный алгоритм, осуществит корректировку введенной денежной суммы в правильную форму.
//
//Например, если пользователь ввел 11 грн. 150 коп., программа должна вывести на экран сумму 12 грн. 50 коп.

//using namespace std;
//int main()
//{
//	int grivna;
//	int qapik;
//	cout << "Enter grivna: ";
//	cin >> grivna;
//	cout << "Enter qapik: ";
//	cin >> qapik;
//	grivna += qapik / 100;
//	qapik %= 100;
//	cout << grivna << " hryvnia " << qapik << " kopecks" << endl;
//}



//Задание 3
//Написать программу вычисления объема параллелепипеда.Ниже приведен рекомендуемый вид экрана во время выполнения программы.
//
//Вычисление объема параллелепипеда.
//Введите исходные данные :
//Длина(см) -> 9;
//Ширина(см) -> 7.5;
//Высота(см) -> 5;
//Объем: 337.50 куб.см.

//using namespace std;
//int main()
//{
//	float length;
//	float width;
//	float height;
//	cout << "enter the length of the parallelepiped: ";
//	cin >> length;
//	cout << "enter the width of the parallelepiped: ";
//	cin >> width;
//	cout << "enter the height of the parallelepiped: ";
//	cin >> height;
//	float volume = length * width * height;
//	cout << "the volume of the parallelepiped is equal to: " << volume << " c.c." << endl;
//}




//Задание 4
//Написать программу вычисления расстояния между населенными пунктами, изображенными на карте.Ниже приведен рекомендуемый вид экрана во время выполнения программы.
//
//Вычисление расстояния между населенными пунктами.
//Введите исходные данные :
//Масштаб карты(количество километров в одном сантиметре) -> 120.
//Расстояние между точками, изображающими населенные пункты(см) -> 3.5.
//Расстояние между населенными пунктами 420 км.

//using namespace std;
//int main()
//{
//	float scale;
//	float range;
//	cout << "Enter the initial data: " << endl;
//	cout << "The scale of the map: ";
//	cin >> scale;
//	cout << "Distance between points: ";
//	cin >> range;
//	float locality = scale * range;
//	cout << "Distance between settlepoints: " << locality << endl;
//}



//Задание 5
//Напишите программу, которая вычисляем объём шара.

//using namespace std;
//int main()
//{
//	string answer;
//	float volume;
//	const double pi = 3.141592653589793;
//	cout << "By length, diametr or radius?: " << endl;
//	cin >> answer;
//	if (answer == "length") {
//		float length;
//		cout << "Enter the length of the ball: ";
//		cin >> length;
//		volume = (pow(length, 3)) / (6 * pow(pi, 2));
//		cout << "The volume of the ball: " << volume << " c.c." << endl;
//	}
//	else if (answer == "diametr") {
//		float diametr;
//		cout << "Enter the diametr of the ball: ";
//		cin >> diametr;
//		volume = (pow(diametr, 3) / 6) * pi;
//		cout << "The volume of the ball: " << volume << " c.c." << endl;
//	}
//	else if (answer == "radius") {
//		float radius;
//		cout << "Enter the radius of the ball: ";
//		cin >> radius;
//		volume = pow(radius, 3) * 4 / 3 * pi;	
//		cout << "The volume of the ball: " << volume << " c.c." << endl;
//	}
//}