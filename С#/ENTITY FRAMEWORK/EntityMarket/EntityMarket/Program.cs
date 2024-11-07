//Sozdat bazu dannix dla porgammi magazin, gde budut Customers i Products.
//Kajdiy product mojet bit kuplen odnim klientom. No u klienta mogut bit mnogo produktov.
//Realizuyte sozdaniye bazi dannix s zavisimimi tablicami ispolzuya EntityFramework.

//Rezultat: Zaarxivirovanniy fayl proyekta.

using EntityMarket;

using (ApplicationContext db = new ApplicationContext())
{
    Customer Customer1 = new Customer { Name = "John", Surname = "Connor" };
    Customer Customer2 = new Customer { Name = "Emma", Surname = "Stone" };
    Products Product1 = new Products { Name = "Cucumber", CustomerId = 1, Customer =  Customer1 };
    Products Product2 = new Products { Name = "Tomate", CustomerId = 1, Customer = Customer1 };
    Products Product3 = new Products { Name = "Meat", CustomerId = 2, Customer = Customer2 };
    Products Product4 = new Products { Name = "Milk", CustomerId = 2, Customer = Customer2 };

    db.Customers.AddRange(Customer1, Customer2);
    db.Products.AddRange(Product1, Product2, Product3, Product4);
    db.SaveChanges();
    var ProductList = db.Products.ToList();
    var CustomerList = db.Customers.ToList();
    foreach (var Customer in CustomerList)
    {
        Console.WriteLine(Customer.Id + " - " + Customer.Name + " - " + Customer.Surname);
    }
    foreach (var Products in ProductList)
    {
        Console.WriteLine(Products.Id + " - " + Products.Name + " - " + Products.CustomerId + " - " + Products.Customer.Name + " - " + Products.Customer.Surname);
    }
}