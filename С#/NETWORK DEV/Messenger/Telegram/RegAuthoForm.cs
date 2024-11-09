using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Telegram
{
    public partial class RegAuthoForm : Form
    {
        TcpClient client;
        NetworkStream stream;
        BinaryReader br;
        BinaryWriter bw;
        static string username = string.Empty;
        public RegAuthoForm()
        {
            InitializeComponent();
            try
            {
                client = new TcpClient("127.0.0.1", 27001);
                stream = client.GetStream();
                br = new BinaryReader(stream);
                bw = new BinaryWriter(stream);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                this.Close();
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {

            this.Close();
        }

        Point lastPoint;
        private void RegisterPanel_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                this.Left += e.X - lastPoint.X;
                this.Top += e.Y - lastPoint.Y;
            }

        }

        private void RegisterPanel_MouseDown(object sender, MouseEventArgs e)
        {
            lastPoint = new Point(e.X, e.Y);
        }

        private async void RegAuthoButton_Click(object sender, EventArgs e)
        {
            try
            {
                var command = new Command { Text = Command.Login, Username = NicknameBox.Text, Pass = PasswordBox.Text };
                username = NicknameBox.Text;
                bw.Write(JsonSerializer.Serialize(command));
                bw.Flush();

                string response = await Task.Run(() => br.ReadString());
                MessageBox.Show(response);

                //this.Hide();
                ChatForm chatForm = new ChatForm(client, username, br, bw, stream);
                chatForm.Show();
                //this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void RegAuthoForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            br?.Close();
            bw?.Close();
            stream?.Close();
            client?.Close();
        }


        public class Command
        {
            public const string Login = "LOGIN";
            public const string SendImage = "SEND";
            public const string SendMessage = "MESSAGE";
            public const string RecieveFromServer = "RECIEVE";

            public string Text { get; set; }
            public string Username { get; set; }
            public string Pass { get; set; }
            public string Msg { get; set; }

        }

        private void PasswordBox_TextChanged(object sender, EventArgs e)
        {
            PasswordBox.UseSystemPasswordChar = true;
        }

    
    }
}
