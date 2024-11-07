//Ispolzuya textnalogii  Entity FrameWorka sozdat consolnoe prilojeniye Market.

//Suwnosti:

//Product
//Customer
//Shop
//Bill

//Kollekciya produktov imeyetsa v magazine.
//Takje u Customer-a imeyetsa list Bill-ov v kajdom iz kotorix imeyetsa list Product-ov.

//Realizovat CRUD operacii dannomu prilojeniyu.

using ENtity_Market_CRUD;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Runtime.Intrinsics.X86;


using (ApplicationContext db = new ApplicationContext())
{
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();

    Shop s1 = new Shop { Name = "Umico", Address = "Street 1" };
    Shop s2 = new Shop { Name = "TapAz", Address = "Street 2" };

    db.Shops.AddRange(s1, s2);

    Customer c1 = new Customer { Name = "Ayshen", Surname = "Ayazova" };
    Customer c2 = new Customer { Name = "Andrey", Surname = "Biryulov" };
    Customer c3 = new Customer { Name = "John", Surname = "Connor" };
    Customer c4 = new Customer { Name = "Mike", Surname = "Vazovski" };
    
    db.Customers.AddRange(c1, c2, c3, c4);

    Product p1 = new Product { Name = "Meat", Price = 10};
    Product p2 = new Product { Name = "Apple", Price = 5};
    Product p3 = new Product { Name = "Cucumber", Price = 8};
    Product p4 = new Product { Name = "Tomate", Price = 6};
    Product p5 = new Product { Name = "Bread", Price = 2};
    Product p6 = new Product { Name = "Milk", Price = 4};
    Product p7 = new Product { Name = "Carrot", Price = 5};
    Product p8 = new Product { Name = "Coca-Cola", Price = 6};



    db.Products.AddRange(p1, p2, p3, p4, p5, p6, p7, p8);

    Random rnd = new Random();

    Bill b1 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b2 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b3 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b4 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b5 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b6 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b7 = new Bill { Number = rnd.Next(1000, 9999) };
    Bill b8 = new Bill { Number = rnd.Next(1000, 9999) };


    c1.Bills.Add(b1);
    c1.Bills.Add(b2);
    c2.Bills.Add(b3);
    c2.Bills.Add(b4);
    c3.Bills.Add(b5);
    c3.Bills.Add(b6);
    c4.Bills.Add(b7);
    c4.Bills.Add(b8);

    b1.Products.Add(p1); 
    b2.Products.Add(p2);
    b3.Products.Add(p3);
    b4.Products.Add(p4);
    b5.Products.Add(p5);
    b6.Products.Add(p6);    
    b7.Products.Add(p7);
    b8.Products.Add(p8);
    db.Bills.AddRange(b1, b2, b3, b4, b5, b6, b7, b8);


    db.SaveChanges();

    var bills = db.Bills.ToList();
    foreach (var b in bills)
    {
        b.Price = b.Products.Sum(p => p.Price);
    }

    s1.Products.Add(p5);
    s1.Products.Add(p6);
    s1.Products.Add(p7);
    s1.Products.Add(p8);

    s2.Products.Add(p1);
    s2.Products.Add(p2);
    s2.Products.Add(p3);
    s2.Products.Add(p4);

    db.SaveChanges();


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    void ShowShops()
    {
        var shops = db.Shops.ToList();
        Console.WriteLine("Shops");
        foreach (var s in shops)
        {
            Console.WriteLine(s.Id + " - " + s.Name + " - " + s.Address);
            Console.WriteLine("------------------------");
            var products = s.Products.ToList();
            Console.WriteLine("Products in shop: ");
            foreach(var p in products)
            {
                Console.WriteLine(p.Id + " - " + p.Name + " - " + p.Price + "$");
            }
            Console.WriteLine("------------------------\n");
        }
    }
    void AddShop(string name, string address)
    {
        Shop s1 = new Shop { Name = name, Address = address };
        db.Shops.Add(s1);
        db.SaveChanges();
    }
    void DeleteShop(int index)
    {
        var shops = db.Shops.ToList();
        db.Shops.Remove(shops[index - 1]);
        db.SaveChanges();
    }
    void ChangeShop(int id, string name, string address)
    {
        var shops = db.Shops.SingleOrDefault(s => s.Id == id);
        shops.Name = name;
        shops.Address = address;
        db.SaveChanges();
    }

    /////////////////////////////////////////////////////////////////

    void ShowProducts()
    {
        var products = db.Products.ToList();
        foreach (var p in products)
        {
            Console.WriteLine(p.Id + " - " + p.Name + " - " + p.Price);
        }
    }
    void AddProduct(string name, int price)
    {
        Product p1 = new Product { Name = name, Price = price };
        db.Products.Add(p1);
        db.SaveChanges();
    
    }
    void AddProductToShop(int shopId, int productId)
    {
        var shop = db.Shops.SingleOrDefault(s => s.Id == shopId);
        var product = db.Products.SingleOrDefault(p => p.Id == productId);
        var p1 = product;
        shop.Products.Add(p1);
        db.SaveChanges();
    }
    void DeleteProduct(int index)
    {
        var products = db.Products.ToList();
        db.Products.Remove(products[index - 1]);
        db.SaveChanges();
    }
    void ChangeProduct(int id, string name, int price)
    {
        var products = db.Products.SingleOrDefault(p => p.Id == id);
        products.Name = name;
        products.Price = price;
        db.SaveChanges();
    
    }

    /////////////////////////////////////////////////////////////////

    void ShowBills()
    {
        var bills = db.Bills.Include(b => b.Customers).ToList();
        foreach (var b in bills)
        {
            Console.WriteLine($"{b.Id} - Number: {b.Number} - Price: {b.Price} - Customer: {b.Customers.Name} {b.Customers.Surname}");
        }
    }
    void AddBill(Customer customer)
    {
        Random rnd = new Random();
        Bill b1 = new Bill { Number = rnd.Next(1000, 9999), Customers = customer, CustomerId = customer.Id };
        db.Bills.Add(b1);
        db.SaveChanges();
    }
    void AddProductIntoBill(int product_index)
    {
        var bill = db.Bills.ToList();
        var products = db.Products.ToList();
        Product p1 = products[product_index - 1];
        bill[bill.Count - 1].Products.Add(p1);
        db.SaveChanges();
    }
    void AddPriceToBill()
    {
        var bills = db.Bills.ToList();
        int price = bills[bills.Count - 1].Products.Sum(p => p.Price);
        bills[bills.Count - 1].Price = price;
        db.SaveChanges();
        //в списке продуктов отсутвуют продукты
    }
    void DeleteBill(int id)
    {
        var bills = db.Bills.ToList();
        db.Bills.Remove(bills[id - 1]);
        db.SaveChanges();
    }

    /////////////////////////////////////////////////////////////////
    void ShowCustomers()
    {
        var cutomers = db.Customers;
        foreach (var c in cutomers)
        {
            Console.WriteLine($"{c.Id} - {c.Name} {c.Surname}");
        }
    }
    void CustomerInfo(int id)
    {
        var customerBills = db.Customers.Include(c => c.Bills).FirstOrDefault(c => c.Id == id);
        if(customerBills != null)
        {
            var billList = customerBills.Bills.ToList();
            foreach (var b in billList)
            {
                Console.WriteLine($"{b.Id} - {b.Number} - {b.Price}");
            }
           
        }
    }
    void AddCustomer(string name, string surname)
    {
        Customer c1 = new Customer { Name = name, Surname = surname };
        db.Customers.Add(c1);
        db.SaveChanges();
    }
    void DeleteCustomer(int id)
    {
        db.Customers.Remove(db.Customers.FirstOrDefault(c => c.Id == id));
        db.SaveChanges();
    }
    void ChangeCustomer(int id, string name, string surname)
    {
        var customer = db.Customers.SingleOrDefault(c => c.Id == id);
        customer.Name = name;
        customer.Surname = surname;
        db.SaveChanges();
    }

    string user_ch;
    while (true)
    {
        Console.Clear();
        Console.WriteLine("1. Shops\n2. Products\n3. Bills\n4. Customers\n5. Create new order\n6. Exit");
        user_ch = Console.ReadLine();
        switch (user_ch)
        {
            case "1":
                Console.Clear();
                ShowShops();
                Console.WriteLine();
                Console.WriteLine();
                Console.WriteLine("1. Add shop\n2.Delete shop\n3. Change shop\n4. Back");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":

                        Console.WriteLine("Enter new shop data");
                        Console.Write("Enter shop name: ");
                        string s_name = Console.ReadLine();
                        Console.Write("Enter shop address: ");
                        string address = Console.ReadLine();
                        AddShop(s_name, address);
                        continue;
                    case "2":
                        ShowShops();
                        Console.WriteLine("Enter the index of shop");
                        DeleteShop(int.Parse(Console.ReadLine()));
                        continue;
                    case "3":
                        ShowShops();
                        Console.WriteLine("Enter the index of shop");
                        user_ch = Console.ReadLine();
                        Console.Write("Enter new shop name: ");
                        string new_name = Console.ReadLine();
                        Console.Write("Enter new shop address: ");
                        string new_address = Console.ReadLine();
                        ChangeShop(int.Parse(user_ch), new_name, new_address);
                        continue;
                    case "4":
                        break;
                }
                continue;
            case "2":
                Console.Clear();
                Console.WriteLine();
                ShowProducts();
                Console.WriteLine();
                Console.WriteLine("1. Add new product\n2. Delete product\n3. Change product\n4. Add product to shop\n5. Exit");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.WriteLine("Enter product name: ");
                        string product_name = Console.ReadLine();
                        Console.WriteLine("Enter product price: ");
                        int product_price = int.Parse(Console.ReadLine());
                        AddProduct(product_name, product_price);
                        continue;
                    case "2":
                        ShowProducts();
                        Console.WriteLine("Enter the product index for delete: ");
                        DeleteProduct(int.Parse(Console.ReadLine()));
                        continue;
                    case "3":
                        ShowProducts();
                        Console.WriteLine("Enter the index of product");
                        user_ch = Console.ReadLine();
                        Console.Write("Enter new product name: ");
                        string new_name = Console.ReadLine();
                        Console.Write("Enter new product price: ");
                        int new_price = int.Parse(Console.ReadLine());
                        ChangeProduct(int.Parse(user_ch), new_name, new_price);
                        continue;
                    case "4":
                        Console.Clear();
                        ShowShops();
                        Console.WriteLine();
                        Console.WriteLine("Enter id of the shop: ");
                        int s_Id = int.Parse(Console.ReadLine());
                        ShowProducts();
                        Console.WriteLine();
                        Console.WriteLine("Enter product id: ");
                        int p_Id = int.Parse(Console.ReadLine());
                        AddProductToShop(s_Id, p_Id);
                        continue;
                    case "5":
                        break;
                }
                continue;
            case "3":
                Console.Clear();
                ShowBills();
                Console.WriteLine("1. Delete bill\n2. Exit");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.Clear();
                        ShowBills();
                        Console.WriteLine("Enter the id of bill");
                        DeleteBill(int.Parse(Console.ReadLine()));
                        continue;
                    case "2":
                        break;
                }
                continue;
            case "4":
                Console.Clear();
                Console.WriteLine();
                ShowCustomers();
                Console.WriteLine();
                Console.WriteLine("1. Delete customer\n2. Change customer\n3. Customer bills\n4. Back");
                user_ch = Console.ReadLine();
                switch (user_ch)
                {
                    case "1":
                        Console.Clear();
                        ShowCustomers();
                        Console.WriteLine("Enter id of the customer");
                        DeleteCustomer(int.Parse(Console.ReadLine()));
                        continue;
                    case "2":
                        Console.Clear();
                        ShowCustomers();
                        Console.WriteLine("Enter id of the customer");
                        int c_id = int.Parse(Console.ReadLine());
                        Console.WriteLine("Enter new name");
                        string c_newname = Console.ReadLine();
                        Console.WriteLine("Enter new surname");
                        ChangeCustomer(c_id, c_newname, Console.ReadLine());
                        continue;
                    case "3":
                        Console.Clear();
                        ShowCustomers();
                        Console.WriteLine();
                        Console.WriteLine("Enter customer Id:");
                        int customerId = int.Parse(Console.ReadLine());
                        CustomerInfo(customerId);
                        Console.ReadLine();
                        continue;
                    case "4":
                        break;
                }
                continue;
            case "5":
                Console.Clear();
                ShowCustomers();
                Console.WriteLine("Select customer or create a new customer(\'0\')");
                user_ch = Console.ReadLine();
                Customer current_customer;
                if(user_ch == "0")
                {
                    Console.WriteLine("Enter name: ");
                    string c_name = Console.ReadLine();
                    Console.WriteLine("Enter surname: ");
                    string c_surname = Console.ReadLine();
                    AddCustomer(c_name, c_surname);
                    var CustomersList = db.Customers.ToList();
                    current_customer = CustomersList[CustomersList.Count - 1];
                }
                else { current_customer = db.Customers.SingleOrDefault(c => c.Id == int.Parse(user_ch)); }
                AddBill(current_customer);
                Console.WriteLine("Add product into new bill: ");
                while (true)
                {
                    Console.Clear();
                    ShowProducts();
                    Console.WriteLine();
                    Console.WriteLine("Enter \'0\' to return back");
                    user_ch = Console.ReadLine();
                    if (user_ch == "0")
                    {
                        AddPriceToBill();
                        break;
                    }
                    AddProductIntoBill(int.Parse(user_ch));
                }
                var billsList = db.Bills.ToList();
                var current_bill = billsList[billsList.Count - 1];
                current_bill.Customers = current_customer;
                current_customer.Bills.Add(current_bill);
                Console.WriteLine();
                Console.WriteLine("New order info: ");
                Console.WriteLine();
                Console.WriteLine("Customer");
                Console.WriteLine($"Customer ID: {current_customer.Id}\nName: {current_customer.Name}\nSurname: {current_customer.Surname}");
                Console.WriteLine();
                Console.WriteLine("Bill");
                Console.WriteLine($"Bill number: {current_bill.Number}\nBill price: {current_bill.Price}");
                Console.WriteLine();
                Console.WriteLine("Bill products: ");
                var billProduct = current_bill.Products.ToList();
                foreach(var b in billProduct)
                {
                    Console.WriteLine($"Product ID: {b.Id}\nProduct name: {b.Name}\nProduct price: {b.Price}");
                    Console.WriteLine();
                }
                Console.ReadLine();
                continue;
            case "6":
                break;
        }
        break;
    }
}