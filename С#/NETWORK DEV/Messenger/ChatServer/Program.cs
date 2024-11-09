


using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.IO;
//using System.Text.Json;
using System.Diagnostics;
using System.Text.Json;
using ChatServer;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.Identity.Client;

namespace PhotoSenderServer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Server has started");
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                int count = 0;
                int sendImageCount = 0;

                db.Database.EnsureCreated();
                //db.Database.EnsureDeleted();
                var messagess = db.Messages.ToList();
                messagess.Clear();
                db.SaveChanges();

                var ip = IPAddress.Parse("127.0.0.1");
                var listener = new TcpListener(IPAddress.Any, 27001);
                listener.Start(100);
                List<TcpClient> clients = new List<TcpClient>();


                string folderPath = "C:\\Users\\seshb\\OneDrive\\Изображения\\ServerImages";


                while (true)
                {
                    try
                    {
                        TcpClient client = listener.AcceptTcpClient();
                        Console.WriteLine("Client connected");
                        clients.Add(client);
                        List<string> clientsUsernames = new List<string>();


                        Task.Run(() => HandleClient(client, clientsUsernames));
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }

                }



                void HandleClient(TcpClient client, List<string> usernames)
                {
                    NetworkStream stream = client.GetStream();
                    var currentClient = client;
                    BinaryReader br = new BinaryReader(stream);
                    BinaryWriter bw = new BinaryWriter(stream);
                    string username = "";
                    try
                    {
                        while (true)
                        {
                            var input = br.ReadString();
                            var command = JsonSerializer.Deserialize<Command>(input);
                            if (command == null)
                                return;
                            
                            
                            switch (command.Text)
                            {
                                case Command.Login:
                                    username = command.Username;
                                    var password = command.Pass;

                                    if (LoginCheck(username, password))
                                    {
                                        Console.WriteLine($"{username} has returned");
                                        bw.Write("Welcome back!");
                                        usernames.Add(username);
                                        command = new Command { Text = Command.UpdateClientList, ConnectedClients = usernames };
                                    }
                                    else
                                    {
                                        Users u1 = new Users { Username = username, Password = password };
                                        db.Users.Add(u1);
                                        db.SaveChanges();
                                        Console.WriteLine($"{username} has added");
                                        bw.Write("Registration was successful");
                                    }
                                    bw.Flush();
                                    continue;
                                case Command.SendMessage:
                                    {
                                        Users user = db.Users.FirstOrDefault(u => u.Username == command.Username);
                                        Messages msg = new Messages { Text = command.Msg, Time = DateTime.Now.ToString(), User = user };
                                        db.Messages.Add(msg);
                                        user.Messages.Add(msg);
                                        db.SaveChanges();

                                        var echo = new Command { Text = Command.SendMessage, Username = user.Username, Msg = command.Msg, Time = DateTime.Now.ToString() };
                                        foreach (var c in clients)
                                        {
                                            if (c == currentClient)
                                            {
                                                continue;
                                            }
                                            var clientStream = c.GetStream();
                                            var writer = new BinaryWriter(clientStream);
                                            writer.Write(JsonSerializer.Serialize(echo));
                                            writer.Flush();
                                        }


                                        continue;
                                    }
                                case Command.SendImage:
                                    {
                                        Users user = db.Users.FirstOrDefault(u => u.Username == command.Username);
                                        int length = command.ByteImageLength;
                                        byte[] imgByte = Convert.FromBase64String(command.ByteImageBase64);
                                        string imgPath = $"D:\\ServerImages\\receivedImg{count}.png";
                                        count++;
                                        File.WriteAllBytes(imgPath, imgByte);
                                        Images img = new Images { ByteMassive = imgByte, User = user, Time = command.Time };
                                        db.Images.Add(img);
                                        user.Images.Add(img);
                                        db.SaveChanges();
                                        string base64String = Convert.ToBase64String(imgByte);
                                        var echo = new Command
                                        {
                                            Text = Command.SendImage,
                                            Username = user.Username,

                                            Time = DateTime.Now.ToString(),
                                            ByteImageBase64 = base64String,
                                            ByteImageLength = length,
                                            ImgCount = sendImageCount,

                                        };
                                        sendImageCount++;
                                        foreach (var c in clients)
                                        {
                                            if (c.Connected)
                                            {
                                                try
                                                {
                                                    var clientStream = c.GetStream();
                                                    var writer = new BinaryWriter(clientStream);
                                                    writer.Write(JsonSerializer.Serialize(echo));
                                                    writer.Flush();
                                                }
                                                catch (IOException)
                                                {
                                                    clients.Remove(c);
                                                    c.Close();
                                                    Console.WriteLine("Client disconected");
                                                }
                                            }
                                            else
                                            {
                                                clients.Remove(c);
                                            }


                                        }
                                    }

                                    continue;

                                case Command.LoadUserData:
                                    {
                                        try
                                        {
                                            var user = db.Users.ToList();
                                            List<string> msgText = new List<string>();
                                            List<string> msgUsername = new List<string>();
                                            List<string> msgDateTime = new List<string>();
                                            var messages = db.Messages.ToList();
                                            foreach (var item in messages)
                                            {
                                                if (!string.IsNullOrEmpty(item.Text))
                                                {
                                                    msgText.Add(item.Text);
                                                }
                                                if (item.User.Username != null && !string.IsNullOrEmpty(item.User.Username))
                                                {
                                                    msgUsername.Add(item.User.Username);
                                                }
                                                if (!string.IsNullOrEmpty(item.Time))
                                                {
                                                    msgDateTime.Add(item.Time);
                                                }
                                            }
                                            bw.Write(JsonSerializer.Serialize(msgUsername));
                                            bw.Write(JsonSerializer.Serialize(msgText));
                                            bw.Write(JsonSerializer.Serialize(msgDateTime));
                                            bw.Flush();



                                        }
                                        catch (Exception ex)
                                        {
                                            Console.WriteLine(ex);
                                        }
                                        continue;
                                    }

                            }
                        }

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                    }
                    finally
                    {
                        clients.Remove(client);
                        client.Close();
                        usernames.Remove(username);
                        Console.WriteLine("Client has deleted from list");
                    }
                }

                bool LoginCheck(string username, string password)
                {
                    var users = db.Users;
                    foreach (var user in users)
                    {
                        if (user.Username == username && user.Password == password)
                        { return true; }
                    }
                    return false;
                }
            }
        }

        public class Command
        {
            public const string Login = "LOGIN";
            public const string SendImage = "SEND";
            public const string SendMessage = "MESSAGE";
            public const string RecieveFromServer = "RECIEVE";
            public const string LoadUserData = "USERDATA";
            public const string UpdateClientList = "CLIENTS";

            public string Text { get; set; }
            public string Username { get; set; }
            public string Pass { get; set; }
            public string Msg { get; set; }
            public string Time { get; set; }
            public string FilePath { get; set; }
            public string ByteImageBase64 { get; set; }
            public int ImgCount { get; set; }
            public int ByteImageLength { get; set; }
            public List<string> ConnectedClients { get; set; }
        }

    }
}