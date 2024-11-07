using Entity_Umico;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Cryptography;

//Sozdat Market Place UMICO. 
//Minimalniy nabor tablic Product, Customer, Status, PickUp_point, Order (mojno dobavit dopolnitelnie smejnie tablici, a takje novie tablici suwnostey dla uvelecheniya funkcionala programmi) 

//Minimalniy funkcional CRUD operacii nad kajdoy tablicoy suwnosti. 
//A takje funkcional Dobavleniya zakaza, izmeneniya ego statusa, izmeneniya ego punkta vidaci i otmeni zakazi.

//Uchtite vomojnost izmineniya punkta vidaci, poka status ne yavlayetsa "dostavlen na punkt vidachi" libo "zaverwen"

using (ApplicationContext db = new ApplicationContext())
{
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();

    Product p1 = new Product { Name = "TV", Price = 10, Amount = 10 };
    Product p2 = new Product { Name = "PlayStation", Price = 15, Amount = 15 };
    Product p3 = new Product { Name = "Chear", Price = 18, Amount = 25 };
    Product p4 = new Product { Name = "Sofa", Price = 159, Amount = 35 };
    Product p5 = new Product { Name = "Monitor", Price = 26, Amount = 45 };
    Product p6 = new Product { Name = "MotherBoard", Price = 46, Amount = 55 };
    Product p7 = new Product { Name = "Videocard", Price = 20, Amount = 65 };
    Product p8 = new Product { Name = "Cooler", Price = 199, Amount = 15 };
    Product p9 = new Product { Name = "CPU", Price = 56, Amount = 75 };
    Product p10 = new Product { Name = "SSD", Price = 78, Amount = 85 };

    db.Products.AddRange(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);

    Status s1 = new Status { Description = "Parcel information received" };
    Status s2 = new Status { Description = "Parcel received" };
    Status s3 = new Status { Description = "The parcel is on its way" };
    Status s4 = new Status { Description = "Arrived at destination" };
    Status s5 = new Status { Description = "The parcel is ready for pickup" };

    db.Status.AddRange(s1, s2, s3, s4, s5);

    Customer c1 = new Customer { Name = "John", Surname = "Connor" };
    Customer c2 = new Customer { Name = "Boris", Surname = "Jonson" };
    Customer c3 = new Customer { Name = "Joe", Surname = "Biden" };
    Customer c4 = new Customer { Name = "Alex", Surname = "Pushkin" };
    Customer c5 = new Customer { Name = "Victor", Surname = "Pelevin" };

    db.Customers.AddRange(c1, c2, c3, c4, c5);

    PickPoint point1 = new PickPoint { Address = "street 1" };
    PickPoint point2 = new PickPoint { Address = "street 2" };
    PickPoint point3 = new PickPoint { Address = "street 3" };
    PickPoint point4 = new PickPoint { Address = "street 4" };
    PickPoint point5 = new PickPoint { Address = "street 5" };

    db.Points.AddRange(point1, point2, point3, point4, point5);

    Random rnd = new Random();
    Order o1 = new Order { Number = rnd.Next(1000, 9999) };
    o1.Customer = c1;
    c1.Orders.Add(o1);
    o1.Products.Add(p1); o1.Products.Add(p2);
    p1.Orders.Add(o1);
    p2.Orders.Add(o1);
    o1.StatusId = s1.Id;
    o1.Status = s1;
    s1.Orders.Add(o1);
    o1.PickPointId = point1.Id;
    o1.PickPoint = point1;
    point1.Orders.Add(o1);

    Order o2 = new Order { Number = rnd.Next(1000, 9999) };
    o2.Customer = c1;
    c1.Orders.Add(o2);
    o2.Products.Add(p3); o2.Products.Add(p4);
    p3.Orders.Add(o2);
    p4.Orders.Add(o2);
    o2.StatusId = s1.Id;
    o2.Status = s2;
    s1.Orders.Add(o2);
    o2.PickPointId = point1.Id;
    o2.PickPoint = point1;
    point1.Orders.Add(o2);

    Order o3 = new Order { Number = rnd.Next(1000, 9999) };
    o3.Customer = c2;
    c2.Orders.Add(o3);
    o3.Products.Add(p5); o3.Products.Add(p6);
    p5.Orders.Add(o3);
    p6.Orders.Add(o3);
    o3.StatusId = s2.Id;
    o3.Status = s2;
    s2.Orders.Add(o3);
    o3.PickPointId = point2.Id;
    o3.PickPoint = point2;
    point2.Orders.Add(o3);

    Order o4 = new Order { Number = rnd.Next(1000, 9999) };
    o4.Customer = c3;
    c3.Orders.Add(o4);
    o4.Products.Add(p7); o4.Products.Add(p8);
    p7.Orders.Add(o4);
    p8.Orders.Add(o4);
    o4.StatusId = s3.Id;
    o4.Status = s3;
    s3.Orders.Add(o4);
    o4.PickPointId = point2.Id;
    o4.PickPoint = point2;
    point2.Orders.Add(o4);

    Order o5 = new Order { Number = rnd.Next(1000, 9999) };
    o5.Customer = c4;
    c4.Orders.Add(o5);
    o5.Products.Add(p9); o5.Products.Add(p10);
    p9.Orders.Add(o5);
    p10.Orders.Add(o5);
    o5.StatusId = s4.Id;
    o5.Status = s4;
    s4.Orders.Add(o5);
    o5.PickPointId = point3.Id;
    o5.PickPoint = point3;
    point3.Orders.Add(o5);

    db.Orders.AddRange(o1, o2, o3, o4, o5);

    var ordersList = db.Orders.ToList();
    foreach (var o in ordersList)
    {
        o.Price = o.Products.Sum(p => p.Price);
    }
    db.SaveChanges();
    /////////////////////////////////////////////////////////////////////////////////





    void ShowProducts()
    {
        var productList = db.Products.ToList();
        foreach (var o in productList)
        {
            Console.WriteLine($"{o.Id} - {o.Name} - {o.Price}$ - x{o.Amount}");
        }
        Console.WriteLine();
    }
    void AddProduct(string name, int price, int amount)
    {
        db.Products.Add(new Product { Name = name, Price = price, Amount = amount });
        db.SaveChanges();
    }
    void ChangeProduct(int id, string name, int price, int amount)
    {
        var product = db.Products.SingleOrDefault(p => p.Id == id);
        product.Name = name;
        product.Price = price;
        product.Amount = amount;
        db.SaveChanges();
    }
    void DeleteProduct(int id)
    {
        db.Products.Remove(db.Products.SingleOrDefault(p => p.Id == id));
        db.SaveChanges();
    }

    void ShowStatus()
    {
        var statusList = db.Status.ToList();
        foreach (var o in statusList)
        {
            Console.WriteLine($"{o.Id} - {o.Description}");
        }
        Console.WriteLine();
    }
    void AddStatus(string description)
    {
        db.Status.Add(new Status { Description = description });
        db.SaveChanges();
    }
    void ChangeStatus(int id, string description)
    {
        var status = db.Status.SingleOrDefault(o => o.Id == id);
        status.Description = description;
        db.SaveChanges();
    }
    void DeleteStatus(int id)
    {
        db.Status.Remove(db.Status.SingleOrDefault(s => s.Id == id));
        db.SaveChanges();
    }

    void ShowPoints()
    {
        var pointList = db.Points.ToList();
        foreach (var p in pointList)
        {
            Console.WriteLine($"{p.Id} - {p.Address}");
        }
        Console.WriteLine();
    }
    void AddPoint(string address)
    {
        db.Points.Add(new PickPoint { Address = address });
        db.SaveChanges();
    }
    void ChangePoint(int id, string address)
    {
        var point = db.Points.SingleOrDefault(p => p.Id == id);
        point.Address = address;
        db.SaveChanges();
    }
    void DeletePoint(int id)
    {
        db.Points.Remove(db.Points.SingleOrDefault(p => p.Id == id));
        db.SaveChanges();
    }

    void ShowCustomers()
    {
        var customerList = db.Customers.ToList();
        foreach (var c in customerList)
        {
            Console.WriteLine($"{c.Id} - {c.Name} - {c.Surname}");
        }
        Console.WriteLine();
    }
    void AddCustomer(string name, string surname)
    {
        db.Customers.Add(new Customer { Name = name, Surname = surname });
        db.SaveChanges();
    }
    void ChangeCustomer(int id, string name, string surname)
    {
        var customer = db.Customers.SingleOrDefault(c => c.Id == id);
        customer.Name = name;
        customer.Surname = surname;
    }
    void DeleteCustomer(int id)
    {
        var customer = db.Customers.SingleOrDefault(c => c.Id == id);
        db.Customers.Remove(customer);
        db.SaveChanges();
    }

    void ShowOrders()
    {
        var orders = db.Orders.ToList();
        foreach (var o in orders)
        {
            Console.WriteLine($"{o.Id} - {o.Number} - {o.Price}$ - {o.PickPoint.Address} - {o.Customer.Name} {o.Customer.Surname}");
        }
        Console.WriteLine();
    }
    void ShowOrderProducts(int id)
    {
        var order = db.Orders.SingleOrDefault(o => o.Id == id);
        var orderProducts = order.Products.ToList();
        int i = 0;
        foreach (var product in orderProducts)
        {
            Console.WriteLine($"{product.Id} - {product.Name} - {product.Price}$ - x{order.ProductAmount[i]}");
            i++;
        }
        Console.WriteLine($"Total: {order.Price}$");
        Console.WriteLine("---------------------------------------------");
    }

    void ShowCustomerOrders(int id)
    {
        var customer = db.Customers.SingleOrDefault(c => c.Id == id);
        var customerOrders = customer.Orders.ToList();
        foreach (var o in customerOrders)
        {
            Console.WriteLine("Order");
            Console.WriteLine($"{o.Id} - {o.Number} - {o.Price}$");
            var orderProducts = o.Products.ToList();
            Console.WriteLine("Product in order");
            foreach (var product in orderProducts)
            {
                Console.WriteLine($"{product.Id} - {product.Name} - {product.Price}$");
            }
            Console.WriteLine("--------------------------------------------------------");
        }
    }

    void ShowPointOrders(int id)
    {
        var point = db.Points.SingleOrDefault(p => p.Id == id);
        var pointOrders = point.Orders.ToList();
        foreach (var o in pointOrders)
        {
            Console.WriteLine($"{o.Id} - {o.PickPoint.Address} - {o.Number} - {o.Price}");
        }
    }

    void ShowStatusOrders(int id)
    {
        var status = db.Status.SingleOrDefault(o => o.Id == id);
        var statusOrders = status.Orders.ToList();
        foreach (var o in statusOrders)
        {
            Console.WriteLine($"{o.Id} - {o.Number} - {o.Price} - {o.PickPoint.Address} - {o.Status.Description}");
        }
    }

    void PriceCalculate(int id)
    {
        var order = db.Orders.SingleOrDefault(o => o.Id == id);
        for (int i = 0; i < order.Products.Count; i++)
        {
            order.Price += order.Products[i].Price * order.ProductAmount[i] - order.Products[i].Price;
        }
    }

    Order AddOrder()
    {
        Random rnd = new Random();
        Order order = new Order { Number = rnd.Next(1000, 9999)};
        db.Orders.Add(order);
        db.SaveChanges();
        return order;
    }

    Product FindProduct(int id)
    {
        return db.Products.SingleOrDefault(p => p.Id == id);
    }
    Customer FindCustomer(int id)
    {
        return db.Customers.SingleOrDefault(p => p.Id == id);
    }
    PickPoint FindPoint(int id)
    {
        return db.Points.SingleOrDefault(p => p.Id == id);
    }
    Status FindStatus(int id)
    {
        return db.Status.SingleOrDefault(p => p.Id == id);
    }



    string user_ch;

    while (true)
    {
        Console.Clear();
        Console.WriteLine("1. Customers\n2. Products\n3. Pick up points\n4. Status\n5. Orders\n6. New order\n7. Exit");
        user_ch = Console.ReadLine();
        switch (user_ch)
        {
            case "1":
                while (true)
                {
                    Console.Clear();
                    ShowCustomers();
                    Console.WriteLine("1. Customer orders\n2. Change customer\n3. Delete customer\n4. Back");
                    user_ch = Console.ReadLine();
                    switch (user_ch)
                    {
                        case "1":
                            Console.Clear();
                            ShowCustomers();
                            Console.WriteLine("Enter customer Id:");
                            int c_Id = int.Parse(Console.ReadLine());
                            ShowCustomerOrders(c_Id);
                            Console.ReadLine();
                            continue;
                        case "2":
                            Console.Clear();
                            ShowCustomers();
                            Console.WriteLine("Enter customer Id:");
                            user_ch = Console.ReadLine();
                            Console.WriteLine("Enter name: ");
                            string new_name = Console.ReadLine();
                            Console.WriteLine("Enter surname: ");
                            string new_surname = Console.ReadLine();
                            ChangeCustomer(int.Parse(user_ch), new_name, new_surname);
                            continue;
                        case "3":
                            ShowCustomers();
                            Console.WriteLine("Enter customer Id:");
                            user_ch = Console.ReadLine();
                            DeleteCustomer(int.Parse(user_ch));
                            continue;
                        case "4":
                            break;
                    }
                    break;
                }
                break;
            case "2":
                while(true)
                {
                    Console.WriteLine();
                    ShowProducts();
                    Console.WriteLine("1. Add new product\n2. Change product\n3. Delete product\n4. Exit");
                    user_ch = (Console.ReadLine());
                    switch(user_ch)
                    {
                        case "1":
                            Console.Clear();
                            Console.WriteLine("Enter name: ");
                            string product_name = Console.ReadLine();
                            Console.WriteLine("Enter price: ");
                            int product_price = int.Parse(Console.ReadLine());
                            Console.WriteLine("Enter amount: ");
                            int product_amount = int.Parse(Console.ReadLine());
                            AddProduct(product_name, product_price, product_amount);
                            continue;
                        case "2":
                            Console.Clear();
                            ShowProducts();
                            Console.WriteLine("Enter id: ");
                            int product_Id = int.Parse(Console.ReadLine());
                            Console.WriteLine("Product name: ");
                            product_name = Console.ReadLine();
                            Console.WriteLine("Product price: ");
                            product_price = int.Parse(Console.ReadLine());
                            Console.WriteLine("Product amount: ");
                            product_amount = int.Parse(Console.ReadLine());
                            ChangeProduct(product_Id,product_name,product_price, product_amount);
                            continue;
                        case "3":
                            Console.Clear();
                            ShowProducts();
                            Console.WriteLine("Enter id: ");
                            product_Id = int.Parse(Console.ReadLine());
                            DeleteProduct(product_Id);
                            continue;
                        case "4":
                            break;
                    }
                    break;
                }
                continue;
            case "3":
                while(true)
                {
                    Console.Clear();
                    ShowPoints();
                    Console.WriteLine("1. Add point\n2. Change point\n3. Delete point\n4. Show point orders\n5. Exit");
                    user_ch = Console.ReadLine();
                    switch (user_ch)
                    {
                        case "1":
                            Console.WriteLine();
                            Console.WriteLine("Enter address: ");
                            var point_adress = Console.ReadLine();
                            AddPoint(point_adress);
                            continue;
                        case "2":
                            Console.Clear();
                            ShowPoints();
                            Console.WriteLine("Enter points id: ");
                            var point_id = int.Parse(Console.ReadLine());
                            Console.WriteLine("Enter address: ");
                            point_adress = Console.ReadLine();
                            ChangePoint(point_id, point_adress);
                            continue;
                        case "3":
                            Console.Clear();
                            ShowPoints();
                            Console.WriteLine("Enter points id: ");
                            point_id = int.Parse(Console.ReadLine());
                            DeletePoint(point_id);
                            continue;
                        case "4":
                            Console.Clear();
                            ShowPoints();
                            Console.WriteLine("Enter points id: ");
                            point_id = int.Parse(Console.ReadLine());
                            ShowPointOrders(point_id);
                            Console.ReadLine();
                            continue;
                        case "5":
                            break;
                    }
                    break;
                }
                continue;
            case "4":
                while(true)
                {
                    Console.Clear();
                    ShowStatus();
                    Console.WriteLine("1. Add status\n2. Change status\n3. Delete status\n4. Show status orders\n5. Exit");
                    user_ch = Console.ReadLine();
                    switch(user_ch)
                    {
                        case "1": 
                            Console.Clear();
                            Console.WriteLine("Enter description: ");
                            AddStatus(Console.ReadLine());
                            continue;
                        case "2":
                            Console.Clear();
                            ShowStatus();
                            Console.WriteLine("Enter id");
                            var status_id = int.Parse(Console.ReadLine());
                            Console.WriteLine("Enter description: ");
                            ChangeStatus(status_id, Console.ReadLine());
                            continue;
                        case "3":
                            Console.Clear();
                            ShowStatus();
                            Console.WriteLine("Enter id: ");
                            DeleteStatus(int.Parse(Console.ReadLine()));
                            continue;
                        case "4":
                            Console.Clear();
                            ShowStatus();
                            Console.WriteLine("Enter id: ");
                            ShowStatusOrders(int.Parse(Console.ReadLine()));
                            Console.ReadLine();
                            continue;
                        case "5":
                            break;
                    }
                    break;
                }
                continue;
            case "5":
                while(true)
                {
                    Console.Clear();
                    ShowOrders();
                    Console.WriteLine("1. Show order info\n2. Exit");
                    user_ch = Console.ReadLine();
                    switch(user_ch)
                    {
                        case "1":
                            Console.Clear();
                            ShowOrders();
                            Console.WriteLine("Enter id: ");
                            ShowOrderProducts(int.Parse(Console.ReadLine()));
                            Console.ReadLine();
                            continue;
                        case "2":
                            break;
                    }
                    break;
                }
                break;
            case "6":
                Console.Clear();
                Order new_order = AddOrder();
                ShowCustomers();
                Console.WriteLine("Enter customer id or push \'0\' to add new customer");
                user_ch = Console.ReadLine();
                if (user_ch != "0")
                {
                    Customer customer = FindCustomer(int.Parse(user_ch));
                    new_order.Customer = customer;
                    new_order.CustomerId = customer.Id;
                    customer.Orders.Add(new_order);
                }
                else
                {
                    Console.Clear();
                    Console.WriteLine("Enter name: ");
                    string customer_name = Console.ReadLine();
                    Console.WriteLine("Enter surname: ");
                    string customer_surname = Console.ReadLine();
                    AddCustomer(customer_name, customer_surname);
                    var customerList = db.Customers.ToList();
                    var currentCustomer = customerList[customerList.Count - 1];
                    new_order.Customer = currentCustomer;
                    new_order.CustomerId = currentCustomer.Id;
                    currentCustomer.Orders.Add(new_order);
                }
                while (true)
                {
                    Console.Clear();
                    ShowProducts();
                    Console.WriteLine("Enter product id to add it in order or push \'0\' to continue");
                    user_ch = Console.ReadLine();
                    if (user_ch != "0")
                    {
                        Console.WriteLine("Enter amount of product: ");
                        int amount = int.Parse(Console.ReadLine());
                        if (db.Products.SingleOrDefault(p => p.Id == int.Parse(user_ch)).Amount - amount >= 0)
                        {
                            db.Products.SingleOrDefault(p => p.Id == int.Parse(user_ch)).Amount -= amount;
                            new_order.ProductAmount.Add(amount);
                            new_order.Products.Add(FindProduct(int.Parse(user_ch)));
                            FindProduct(int.Parse(user_ch)).Orders.Add(new_order);
                        }
                        else 
                        { 
                            Console.WriteLine("product is out of stock"); 
                            Console.ReadLine();
                        }
                    }
                    else
                    {
                        new_order.Price = new_order.Products.Sum(p => p.Price);
                        break;
                    }
                }
                Console.Clear();
                ShowPoints();
                Console.WriteLine("Select the point to deliver: ");
                user_ch = Console.ReadLine();
                new_order.PickPoint = FindPoint(int.Parse(user_ch));
                new_order.PickPointId = new_order.PickPoint.Id;
                FindPoint(int.Parse(user_ch)).Orders.Add(new_order);
                new_order.Status = FindStatus(1);
                new_order.StatusId = FindStatus(1).Id;
                FindStatus(1).Orders.Add(new_order);
                PriceCalculate(new_order.Id);
                Console.WriteLine("---------------------------------\nOrder info: ");
                Console.WriteLine($"{new_order.Id} - {new_order.Number} - {new_order.PickPoint.Address} - {new_order.Status.Description} - {new_order.Customer.Name} {new_order.Customer.Surname}");
                ShowOrderProducts(new_order.Id);
                Console.ReadLine();
                continue;
            case "7":
                break;
        }
        break;
    }
}