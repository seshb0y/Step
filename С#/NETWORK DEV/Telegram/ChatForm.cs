using System;
using System.Drawing;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ProgressBar;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Telegram
{

    public partial class ChatForm : Form
    {
        private string username;
        private TcpClient client;
        NetworkStream stream;
        BinaryReader br;
        BinaryWriter bw;

        public ChatForm(TcpClient existingClient, string username, BinaryReader br, BinaryWriter bw, NetworkStream stream)
        {
            InitializeComponent();
            pictureBox1.Hide();
            pictureBox2.Hide();
            pictureBox4.Hide();
            client = existingClient;
            this.stream = stream;
            this.br = br;
            this.bw = bw;
            this.username = username;
            UsernameLabel.Text = username;

            ChatView.OwnerDraw = true;
            ChatView.DrawColumnHeader += ChatView_DrawColumnHeader;
            ChatView.DrawSubItem += ChatView_DrawSubItem;



            var command = new Command { Text = Command.LoadUserData, Username = username };
            bw.Write(JsonSerializer.Serialize(command));
            var response = br.ReadString();
            var msgUsername = JsonSerializer.Deserialize<List<string>>(response);
            response = br.ReadString();
            var msgText = JsonSerializer.Deserialize<string[]>(response);
            response = br.ReadString();
            var msgDateTime = JsonSerializer.Deserialize<List<string>>(response);
            int count = 0;
            foreach (var msg in msgText)
            {
                ListViewItem item = new ListViewItem(msgUsername[count]);
                item.SubItems.Add(msg);
                item.SubItems.Add(msgDateTime[count]);
                item.ForeColor = Color.White;
                ChatView.Items.Add(item);
                count++;
            }
            Task.Run(() => RecieveMessagesAsync());




        }

        private void CloseBtn_Click(object sender, EventArgs e)
        {
            this.Close();
        }


        public void SendBtn_Click(object sender, EventArgs e)
        {
            try
            {
                ListViewItem item = new ListViewItem(username);
                item.SubItems.Add(MsgBox.Text);
                item.SubItems.Add(DateTime.Now.ToString());
                item.ForeColor = Color.White;
                ChatView.Items.Add(item);
                var command = new Command { Text = Command.SendMessage, Username = username, Msg = MsgBox.Text };
                bw.Write(JsonSerializer.Serialize(command));
                bw.Flush();
                MsgBox.Clear();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }



        public class Command
        {
            public const string Login = "LOGIN";
            public const string SendImage = "SEND";
            public const string SendMessage = "MESSAGE";
            public const string RecieveFromServer = "RECIEVE";
            public const string LoadUserData = "USERDATA";

            public string Text { get; set; }
            public string Username { get; set; }
            public string Pass { get; set; }
            public string Msg { get; set; }
            public string Time { get; set; }
            public string FilePath { get; set; }
            public string ByteImageBase64 { get; set; }
            public int ImgCount { get; set; }
            public int ByteImageLength { get; set; }

        }

        Point lastPoint;
        private void UserInfoPanel_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                this.Left += e.X - lastPoint.X;
                this.Top += e.Y - lastPoint.Y;
            }
        }

        private void UserInfoPanel_MouseDown(object sender, MouseEventArgs e)
        {
            lastPoint = new Point(e.X, e.Y);
        }

        private async Task RecieveMessagesAsync()
        {
            try
            {
                while (client.Connected)
                {

                    var response = await Task.Run(() => br.ReadString());
                    var message = JsonSerializer.Deserialize<Command>(response);

                    if (message != null && message.Text == Command.SendMessage)
                    {
                        AddMessageToChat(message.Username, message.Msg, message.Time);
                    }
                    else if (message != null && message.Text == Command.SendImage)
                    {
                        AddImageToChat(message.Username, message.Time, message.ByteImageBase64, message.ByteImageLength, message.ImgCount);

                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AddImageToChat(string username, string time, string base64String, int byteImageLength, int imgCount)
        {
            if (InvokeRequired)
            {
                Invoke(new Action(() => AddImageToChat(username, time, base64String, byteImageLength, imgCount)));
            }
            else
            {

                int length = byteImageLength;
                byte[] imgByte = Convert.FromBase64String(base64String);
                string imgPath = $"D:\\ClientImages\\receivedFromServerImg{imgCount}.png";
                File.WriteAllBytes(imgPath, imgByte);
                if (ChatView.SmallImageList == null)
                {
                    ChatView.SmallImageList = new ImageList();
                    ChatView.SmallImageList.ImageSize = new Size(150, 150);
                }

                //ImageList imageList = new ImageList();
                //imageList.Images.Add(Image.FromFile(imgPath));
                ChatView.SmallImageList.Images.Add(Image.FromFile(imgPath));
                ListViewItem item = new ListViewItem(username);
                item.SubItems.Add("Picture");
                item.SubItems.Add(time);
                item.SubItems.Add("");
                item.ImageIndex = ChatView.SmallImageList.Images.Count - 1;

                item.ForeColor = Color.White;
                ChatView.Items.Add(item);
                //ChatView.View = View.Details;
                //this.Controls.Add(ChatView);
            }
        }


        private void AddMessageToChat(string username, string message, string time)
        {
            if (InvokeRequired)
            {
                Invoke(new Action(() => AddMessageToChat(username, message, time)));
            }
            else
            {
                ListViewItem item = new ListViewItem(username);
                item.SubItems.Add(message);
                item.SubItems.Add(time);
                item.ForeColor = Color.White;
                ChatView.Items.Add(item);
            }
        }

        private void ChangePctBtn_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Title = "Выберите изображение";
                openFileDialog.Filter = "Image Files|*.png";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    string filePath = openFileDialog.FileName;
                    UserAvatar.Image = Image.FromFile(filePath);
                }

            }
        }

        private void SendImage_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Title = "Выберите изображение";
                openFileDialog.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.bmp;*.gif";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    string filePath = openFileDialog.FileName;
                    byte[] imgByte = File.ReadAllBytes(filePath);
                    string base64String = Convert.ToBase64String(imgByte);
                    var command = new Command
                    {
                        Text = Command.SendImage,
                        Username = username,
                        ByteImageBase64 = base64String,
                        ByteImageLength = imgByte.Length,
                        Time = DateTime.Now.ToString()
                    };
                    bw.Write(JsonSerializer.Serialize(command));
                    bw.Flush();
                }

            }
        }

        private void ChatView_DrawColumnHeader(object sender, DrawListViewColumnHeaderEventArgs e)
        {
            using (var headerFont = new Font("Yu Gothic UI", 10, FontStyle.Bold))
            {
                string hexColor = "#47205c";
                Color color = ColorTranslator.FromHtml(hexColor);
                Brush brush = new SolidBrush(color);
                e.Graphics.FillRectangle(brush, e.Bounds);
                e.Graphics.DrawString(e.Header.Text, headerFont, Brushes.White, e.Bounds);
            }

        }

        private void ChatView_DrawSubItem(object sender, DrawListViewSubItemEventArgs e)
        {
            if (e.ColumnIndex == 3)
            {
                if (e.Item.ImageIndex >= 0 && ChatView.SmallImageList != null)
                {
                    Image img = ChatView.SmallImageList.Images[e.Item.ImageIndex];
                    if (img != null)
                    {
                        e.Graphics.DrawImage(img, e.Bounds.Left + (e.Bounds.Width - img.Width) / 2, e.Bounds.Top + (e.Bounds.Height - img.Height) / 2, img.Width, img.Height);
                    }
                }
            }
            else
            {
                using (var textFont = new Font("Yu Gothic UI", 10))
                {
                    e.Graphics.DrawString(e.SubItem.Text, textFont, Brushes.White, e.Bounds);
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (pictureBox1.Visible && pictureBox2.Visible && pictureBox4.Visible)
            {
                pictureBox1.Hide();
                pictureBox2.Hide();
                pictureBox4.Hide();
            }
            else
            {
                pictureBox1.Show();
                pictureBox2.Show();
                pictureBox4.Show();
            }

        }
    }
}
