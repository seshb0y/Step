using EntityAvtoSalon;

//Sozdat prilojeniye abto salon s funkcionalaom dobavleniya Avtomobiley.
//Ispolzuya texnologiyu Entity Frameworka.

//Rezultat : zaarxivirovanniy fayl

string userChoice = "";

string manufac = "";
int carAge = 0;

while (true)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        Console.WriteLine("All cars from DB:\n");
        var Cars = db.Cars.ToList();
        foreach (var Car in Cars)
        {
            Console.WriteLine(Car.Id + " - " + Car.Manufacturer + " - " + Car.Age);
        }
    }

    Console.WriteLine("\n1. Add car\n2. Exit");
    userChoice = Console.ReadLine();
    switch (userChoice)
    {
        case "1":
            Console.Write("Enter new car data\nManufacturer: ");
            manufac = Console.ReadLine();
            Console.Write("Age: ");
            carAge = int.Parse(Console.ReadLine());
            using (ApplicationContext db = new ApplicationContext())
            {
                Car car = new Car { Manufacturer = manufac, Age = carAge };
                db.Cars.Add(car);
                db.SaveChanges();
            }
            continue;
        case "2":
            break;
    }
}