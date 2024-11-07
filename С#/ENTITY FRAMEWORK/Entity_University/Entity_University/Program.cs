//Sozdat konsolnoe prilojeniye ucheta Universitetov i Fakultetov.
//Sozdat Svaz baz dannix Mnogie Ko mnogim ispolzuya texnalogiyu Entity Framework.
//Realizovat CRUD operacii. Takje mojete ispolzovat LINQ dal filtracii fiborok

using Entity_University;

using (ApplicationContext db = new ApplicationContext())
{
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();

    Faculty f1 = new Faculty { Name = "Robotics", Places = 100};
    Faculty f2 = new Faculty { Name = "Hisory", Places = 150 };
    Faculty f3 = new Faculty { Name = "Philosophy", Places = 200 };
    Faculty f4 = new Faculty { Name = "Biology", Places = 175 };
    Faculty f5 = new Faculty { Name = "Psychology", Places = 160 };
    Faculty f6 = new Faculty { Name = "Philological", Places = 180 };

    db.Faculties.AddRange(f1, f2, f3, f4, f5, f6);

    University u1 = new University { Name = "MIT", City = "Boston" };
    University u2 = new University { Name = "Stanford", City = "San Jose" };
    University u3 = new University { Name = "Harvard", City = "Boston" };

    db.Universities.AddRange(u1, u2, u3);

    f1.Universities.Add(u1);
    f1.Universities.Add(u3);
    f2.Universities.Add(u2);
    f2.Universities.Add(u1);
    f3.Universities.Add(u3);
    f3.Universities.Add(u2);
    f4.Universities.Add(u2);
    f4.Universities.Add(u1);
    f5.Universities.Add(u3);
    f5.Universities.Add(u2);
    f6.Universities.Add(u1);
    f6.Universities.Add(u3);

    db.SaveChanges();
}

void showTable()
{
    using (ApplicationContext db = new ApplicationContext())
    {
        var universities = db.Universities.ToList();
        foreach (var t in universities)
        {
            Console.WriteLine(t.Id + " - " + t.Name + " - " + t.City + " - " + t.Faculties + " - " + t.Faculties);
        }
    }
    Console.WriteLine();
}
void showUniversity()
{
    using (ApplicationContext db = new ApplicationContext())
    {
        var university = db.Universities.ToList();
        foreach(var t in university)
            Console.WriteLine(t.Id + " - " + t.Name + " - " + t.City);
    }
    Console.WriteLine();
}
void showFaculties()
{
    using (ApplicationContext db = new ApplicationContext())
    {
        var faculties = db.Faculties.ToList();
        foreach(var f in faculties)
        {
            Console.WriteLine(f.Id + " - " + f.Name + " - " + f.Places);
        }
    }
    Console.WriteLine();
}

void AddNewUniversity(string name, string city)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        University u1 = new University { Name = name, City = city};
        db.Universities.Add(u1);
        db.SaveChanges();
    }
}
void AddFacultyInUniver(string university, int id)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        University findUniver = db.Universities.FirstOrDefault(u => u.Name == university);
        Faculty findFaculty = db.Faculties.FirstOrDefault(f => f.Id == id);
        findUniver.Faculties.Add(findFaculty);
        db.SaveChanges();
    }
}
void AddFaculty(string name, int places)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        Faculty f1 = new Faculty { Name = name, Places = places};
        db.Faculties.Add(f1);
        db.SaveChanges();
    }
}

void DeleteFaculty(int id)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        Faculty findFac = db.Faculties.FirstOrDefault(u => u.Id == id);
        db.Faculties.Remove(findFac);
        db.SaveChanges();
    }
}
void DeleteUniversity(int id)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        University findUniver = db.Universities.FirstOrDefault(x => x.Id == id);
        db.Universities.Remove(findUniver);
        db.SaveChanges();
    }
}

void ChangeUniver(int id, string name, string city)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        University u1 = new University { Name = name, City = city };
        University findUniver = db.Universities.FirstOrDefault(u1 => u1.Id == id);
        db.Universities.Remove(findUniver);
        db.Universities.Add(u1);
        db.SaveChanges();
    }
}
void ChangeFaculty(int id, string name, int places)
{
    using (ApplicationContext db = new ApplicationContext())
    {
        Faculty f1 = new Faculty { Name = name, Places = places };
        Faculty fFind = db.Faculties.FirstOrDefault(x => x.Id == id);
        db.Faculties.Remove(fFind);
        db.Faculties.Add(f1);
        db.SaveChanges();
    }
}

string userCh = "";
while (true)
{
    Console.Clear();
    showTable();
    showFaculties();
    Console.WriteLine("1. Add new university\n2. Delete university\n3. Add faculty\n4. Delete faculty\n5. Change university\n6. Change faculty\n7. Exit");
    userCh = Console.ReadLine();
    switch(userCh)
    {
        case "1":
            Console.Clear();
            Console.Write("Enter the name of university: ");
            string u_name = Console.ReadLine();
            Console.Write("Enter the city of university: ");
            string u_city = Console.ReadLine();
            AddNewUniversity (u_name, u_city);
            Console.WriteLine("Now add faculties list in your university:\n");
            while (true)
            {
                Console.Clear();
                Console.WriteLine("Enter \'0\' to exit");
                showFaculties();
                int faciltyId = int.Parse(Console.ReadLine());
                if (faciltyId == 0)
                {
                    break;
                }
                AddFacultyInUniver (u_name, faciltyId);
            }
            continue;
        case "2":
            Console.Clear();
            Console.WriteLine("Enter the Id of university");
            showUniversity();
            int univerId = int.Parse(Console.ReadLine());
            DeleteUniversity(univerId);
            continue;
        case "3":
            Console.Clear();
            Console.Write("Enter name of the new faculty: ");
            string facName = Console.ReadLine();
            Console.Write("enter places of the new faculty: ");
            int facPlaces = int.Parse(Console.ReadLine());
            AddFaculty(facName, facPlaces);
            continue;
        case "4":
            Console.Clear();
            Console.WriteLine("Enter the Id of faculty");
            showFaculties();
            int facId = int.Parse(Console.ReadLine());
            DeleteFaculty(facId);
            continue;
        case "5":
            Console.Clear();
            Console.WriteLine("Enter the Id of university");
            showUniversity();
            int uId = int.Parse(Console.ReadLine());
            Console.Write("Enter new name: ");
            string uName = Console.ReadLine();
            Console.Write("Enter city: ");
            string uCity = Console.ReadLine();
            ChangeUniver(uId, uName, uCity);
            continue;
        case "6":
            Console.Clear();
            Console.WriteLine("Enter the Id of faculty");
            showFaculties();
            int fId = int.Parse(Console.ReadLine());
            Console.Write("Enter new name: ");
            string fName = Console.ReadLine();
            Console.Write("Enter places: ");
            int fPlaces = int.Parse(Console.ReadLine());
            ChangeFaculty(fId, fName, fPlaces);
            continue;
        case "7":
            break;
    }
    break;
}