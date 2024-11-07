using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    //Realizovat funkcioanln "Drive" u Playera iz igri GTA.
    //Player mojet vodit raznie tipi transportov.
    //Pomimo etogo u playera est garaj transportov (mawin motociklov vertolet i td.)

    //Realizuyte funkcional s ispolzovaniyem principa Polimorfizma.
    //Ispolzovanie interfaceov obazatelno!

    interface IDrive
    {
        void Drive();
    }
    class Car : IDrive
    {

        public void Drive()
        {
            Console.Write("car is driving\n");
        }
    }
    class Ship : IDrive
    {
        public void Drive()
        {
            Console.Write("ship is swimming\n");
        }
    }
    class Plane : IDrive
    {
        public void Drive()
        {
            Console.Write("plane is flying\n");
        }
    }

    class  Player
    {

        public void Drives(IDrive drive)
        {
            Console.Write("Player ");
            drive.Drive();
        }
    }
    internal class Interface
    {
        static void Main(string[] args)
        {
            Player tommy = new Player();
            Car car = new Car();
            Plane plane = new Plane();
            Ship ship = new Ship();
            List<IDrive> driveList = new List<IDrive>();
            driveList.Add(ship);
            driveList.Add(car);
            driveList.Add(plane);
            foreach(var item in driveList)
            {
                tommy.Drives(item);
            }
        }
    }
}
