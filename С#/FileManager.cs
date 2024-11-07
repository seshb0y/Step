using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    //Sozdat prilojeniye fayloviy meneger.
    //Takje uchest irarxiyu nasledovaniya classov tipov faylov muzikalnix tekstovix video i foto.
    //Daljen prisutstvovat klass Folder.
    //Takje sozdayte funkcional dobavleniya papki v papku i faylob v papku.
    //Realizuyte poisk papok po nazvaniyu.
    //Realizuyte poisk faylov. (poisk doljen proizvoditsa vo vsex vlojennix papakax).
 
    //Realizuyte menu obweniya s polzovatelem

    abstract class FileType
    {
        protected FileType(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
        public int Size { get; set; }
        public string Path { get; set; }
        public abstract void OpenFile();
    }
    class Music : FileType
    {
        public Music(string name) : base(name)
        {
        }

        public override void OpenFile()
        {
            Console.WriteLine("music is playing");
        }
    }
    class Text : FileType
    {
        public Text(string name) : base(name)
        {
        }
        public override void OpenFile()
        {
            Console.WriteLine("text is opening");
        }
    }
    class Video : FileType
    {
        public Video(string name) : base(name)
        {
        }
        public override void OpenFile()
        {
            Console.WriteLine("video is playing");
        }
    }
    class Photo : FileType
    {
        public Photo(string name) : base(name)
        {
        }
        public override void OpenFile()
        {
            Console.WriteLine("photo is opening");
        }
    }
    class Folder
    {
        public Folder(string name)
        {
            Name = name;
            FilesList = new List<FileType>();
            FoldersList = new List<Folder>();
        }

        public Folder NewFolder { get; set; }
        public List<Folder> FoldersList { get; set; }
        public List<FileType> FilesList { get; set; }
        public static List<Folder> AllFoldersList { get; set; } = new List<Folder>();
        public string Name {  get; set; }
        public string Path { get; set; } = "This PC";
        public int Size { get; set; }
        
        public void AddNewFolder(Folder folder, string name)
        {
            Folder newFolder = new Folder(name);
            newFolder.Path = folder.Path + "/" + name;
            folder.NewFolder = newFolder;
            folder.FoldersList.Add(newFolder);
            AllFoldersList.Add(newFolder);
        }
        public void DeleteFolder(string name)
        {
            for (int i = 0; i < AllFoldersList.Count; i++)
            {
                if (AllFoldersList[i].Name == name)
                {
                    AllFoldersList.Remove(AllFoldersList[i]);
                }
            }
        }
        public void DeleteFile(Folder folder, string name)
        {
            for(int i = 0;i < folder.FilesList.Count;i++)
            {
                if (folder.FilesList[i].Name == name)
                {
                    folder.FilesList.Remove(folder.FilesList[i]);
                }
            }
        }
        public void AddMusic(Folder folder, string name)
        {
            FileType newFile = new Music(name);
            newFile.Path = folder.Path + "/" + name;
            folder.FilesList.Add(newFile);
        }
        public void AddPhoto(Folder folder, string name)
        {
            FileType newFile = new Photo(name);
            newFile.Path = folder.Path + "/" + name;
            folder.FilesList.Add(newFile);
        }
        public void AddVideo(Folder folder, string name)
        {
            FileType newFile = new Video(name);
            newFile.Path = folder.Path + "/" + name;
            folder.FilesList.Add(newFile);
        }
        public void AddText(Folder folder, string name)
        {
            FileType newFile = new Text(name);
            newFile.Path = folder.Path + "/" + name;
            folder.FilesList.Add(newFile);
        }

        public Folder FindFolder(string name)
        {
            foreach(Folder item in AllFoldersList)
            {
                if (item.Name == name)
                {
                    return item;
                }
            }
            return null;
        }
        public FileType FindFile(string name)
        {
            foreach(Folder folder in AllFoldersList)
            {
                foreach (FileType fileType in folder.FilesList)
                {
                    if (fileType.Name == name)
                    {
                        return fileType;
                    }
                }
            }
            return null;
        }

        public void ShowAll()
        {
            for (int i = 0; i < AllFoldersList.Count; i++)
            {
                Console.WriteLine("----------------------------------------------------------------------");
                Console.Write("----------------------------");
                Console.WriteLine($"{AllFoldersList[i].Name}------------------------------");
                for (int j = 0; j < AllFoldersList[i].FilesList.Count; j++)
                {
                    Console.Write($"{AllFoldersList[i].FilesList[j].Name}            ");
                }
                Console.WriteLine();
            }
        }
        public void ToString(string name)
        {
            string str = string.Empty;
            for (int i = 0;i < AllFoldersList.Count;i++)
            {
                if(AllFoldersList[i].Name == name)
                {
                    str = AllFoldersList[i].Name + "\n";
                    for(int j = 0; j < AllFoldersList[i].FilesList.Count; j++)
                    {
                        str += AllFoldersList[i].FilesList[j].Name + "        ";
                    }
                }
            }
            Console.WriteLine(str);
        }
    }


    internal class FileManager
    {
        private static void Main(string[] args)
        {
            Folder f1 = new Folder("First folder");
            f1.AddNewFolder(f1, "Second folder");
            Folder f2 = f1.FindFolder("Second folder");
            f2.AddNewFolder(f2, "Third folder");
            Folder f3 = f2.FindFolder("Third folder");
            f3.AddNewFolder(f3, "Fourth folder");
            Folder f4 = f3.FindFolder("Fourth folder");
            f4.AddNewFolder(f4, "Six folder");
            string user_ch;
            string fold_name;
            string file_name;
            while (true)
            {
                f1.ShowAll();
                Console.WriteLine("--------------------");
                Console.WriteLine("Enter folder name for edit: ");
                fold_name = Console.ReadLine();
                Folder currentFolder = f1.FindFolder(fold_name);
                Console.Clear();
                f1.ToString(fold_name);
                Console.WriteLine();
                while (true)
                {
                    Console.WriteLine("1. Add new folder\n2. Delete folder\n3. Delete file\n4. Add new file\n5. Edit folder name\n6. Edit file name\n7. Back");
                    user_ch = Console.ReadLine();
                    switch (user_ch)
                    {
                        case "1":
                            Console.WriteLine("Enter name: ");
                            fold_name = Console.ReadLine();
                            f1.AddNewFolder(currentFolder, fold_name);
                            Console.WriteLine("Folder added");
                            Console.WriteLine("1. Back\n");
                            user_ch = Console.ReadLine();
                            break;
                        case "2":
                            f1.DeleteFolder(fold_name);
                            Console.WriteLine("Deleted\n");
                            Console.WriteLine("1. Back");
                            user_ch = Console.ReadLine();
                            break;
                        case "3":
                            Console.WriteLine("Enter file name: ");
                            file_name = Console.ReadLine();
                            f1.DeleteFile(currentFolder, file_name);
                            Console.WriteLine("Deleted");
                            Console.WriteLine("1. Back");
                            user_ch = Console.ReadLine();
                            break;
                        case "4":
                            while(true)
                            {
                                Console.Clear();
                                Console.WriteLine("Select the type of new file\n1. Text\n2. Music\n3. Video\n4. Photo");
                                user_ch= Console.ReadLine();
                                Console.WriteLine("Enter name: ");
                                file_name = Console.ReadLine();
                                switch(user_ch)
                                {
                                    case "1":
                                        f1.AddText(currentFolder, file_name);
                                        break;
                                    case "2":
                                        f1.AddMusic(currentFolder, file_name);
                                        break;
                                    case "3":
                                        f1.AddVideo(currentFolder, file_name);
                                        break;
                                    case "4":
                                        f1.AddPhoto(currentFolder, file_name);
                                        break;
                                }
                                Console.WriteLine("Added");
                                Console.WriteLine("1. Continue\n2. Back");
                                user_ch = Console.ReadLine();
                                if (user_ch == "1")
                                {
                                    continue;
                                }
                                break;
                            }
                            break;
                        case "5":
                            {
                                Console.WriteLine("Enter new name: ");
                                string new_name = Console.ReadLine();
                                currentFolder.Name = new_name;
                                break;
                            }
                        case "6":
                            {
                                Console.WriteLine("Enter current file name: ");
                                file_name= Console.ReadLine();
                                Console.WriteLine("Enter new name: ");
                                string new_name = Console.ReadLine();
                                currentFolder.FilesList.Find(x => x.Name.Contains(file_name)).Name = new_name;
                                break;
                            }
                        case "7":
                            break;
                    }
                    break;
                }

            }
        }
    }
}
