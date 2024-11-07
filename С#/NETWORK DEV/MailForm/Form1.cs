using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MailForm
{
    public partial class Form1 : Form
    {
        private static List<string> messages = new List<string>();
        int msgCount = 0;
        private static void SMTP(string mail, string key, string text, string subject, string adress, string displayName)
        {
            var client = new SmtpClient("smtp.mail.ru", 587);
            client.EnableSsl = true;

            client.Credentials = new NetworkCredential(
                    mail,
                    key
                );

            var message = new MailMessage
            {
                Body = text,
                Subject = subject
            };

            message.From = new MailAddress(mail, displayName);
            message.To.Add(new MailAddress(adress));
            try
            {
                client.Send(message);
                Console.WriteLine("success!");
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
        private static void IMAP(string mail, string key, string fodlerName)
        {
            var imapClient = new ImapClient();
            imapClient.Connect("imap.mail.ru", 993, true);
            imapClient.Authenticate(mail, key);
            var inbox = imapClient.GetFolder(fodlerName);

            inbox.Open(FolderAccess.ReadOnly);
            var ids = inbox.Search(SearchQuery.All);
            foreach (var id in ids)
            {
                messages.Add(inbox.GetMessage(id).TextBody);
            }
        }
        public Form1()
        {
            InitializeComponent();
        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void Mail_textBox_TextChanged(object sender, EventArgs e)
        {

        }



        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void Key_textBox_TextChanged(object sender, EventArgs e)
        {

        }

        private void FindMsg_button_Click(object sender, EventArgs e)
        {
            try
            {
                IMAP(Mail_textBox.Text, Key_textBox.Text, BoxName_textBox.Text);
                Message_textBox.Text = messages[0];
            }
            catch (Exception ex)
            {
                Message_textBox.Text = ex.Message;
            }
        }

        private void Send_button_Click(object sender, EventArgs e)
        {
            SMTP(Mail_textBox.Text, Key_textBox.Text, Message_textBox.Text, Subject_textBox.Text, Adress_textBox.Text, Tittle_textBox.Text);
        }

        private void Adress_textBox_TextChanged(object sender, EventArgs e)
        {

        }

        private void Message_textBox_TextChanged(object sender, EventArgs e)
        {
            
        }

        private void Back_btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (msgCount != 0)
                {
                    msgCount--;
                    Message_textBox.Text = messages[msgCount];
                }
            }
            
            catch(Exception ex)
            {
                Message_textBox.Text = ex.Message;
            }
        }


        private void Next_button_Click(object sender, EventArgs e)
        {
            try
            {
                if (msgCount < messages.Count)
                {
                    msgCount++;
                    Message_textBox.Text = messages[msgCount];
                }
            }
            catch (Exception ex)
            {
                Message_textBox.Text = ex.Message;
            }


        }
    }
}
