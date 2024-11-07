using System.Windows.Forms;

namespace Telegram
{
    partial class ChatForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.ClientsView = new System.Windows.Forms.ListView();
            this.UserInfoPanel = new System.Windows.Forms.Panel();
            this.ChangePctBtn = new System.Windows.Forms.Button();
            this.UsernameLabel = new System.Windows.Forms.Label();
            this.MsgBox = new System.Windows.Forms.TextBox();
            this.ChatView = new System.Windows.Forms.ListView();
            this.Username = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Message = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Time = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Pict = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.panel3 = new System.Windows.Forms.Panel();
            this.SendBtn = new System.Windows.Forms.Button();
            this.CloseBtn = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.pictureBox4 = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.SendImage = new System.Windows.Forms.PictureBox();
            this.UserAvatar = new System.Windows.Forms.PictureBox();
            this.panel1.SuspendLayout();
            this.UserInfoPanel.SuspendLayout();
            this.panel3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.SendImage)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.UserAvatar)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(16)))), ((int)(((byte)(69)))));
            this.panel1.Controls.Add(this.pictureBox4);
            this.panel1.Controls.Add(this.pictureBox2);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.button1);
            this.panel1.Controls.Add(this.SendImage);
            this.panel1.Controls.Add(this.ClientsView);
            this.panel1.Controls.Add(this.UserInfoPanel);
            this.panel1.Location = new System.Drawing.Point(-1, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(298, 675);
            this.panel1.TabIndex = 0;
            // 
            // ClientsView
            // 
            this.ClientsView.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.ClientsView.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.ClientsView.HideSelection = false;
            this.ClientsView.Location = new System.Drawing.Point(0, 135);
            this.ClientsView.Name = "ClientsView";
            this.ClientsView.Size = new System.Drawing.Size(247, 540);
            this.ClientsView.TabIndex = 1;
            this.ClientsView.UseCompatibleStateImageBehavior = false;
            this.ClientsView.View = System.Windows.Forms.View.Details;
            // 
            // UserInfoPanel
            // 
            this.UserInfoPanel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.UserInfoPanel.Controls.Add(this.ChangePctBtn);
            this.UserInfoPanel.Controls.Add(this.UserAvatar);
            this.UserInfoPanel.Controls.Add(this.UsernameLabel);
            this.UserInfoPanel.Location = new System.Drawing.Point(0, 0);
            this.UserInfoPanel.Name = "UserInfoPanel";
            this.UserInfoPanel.Size = new System.Drawing.Size(250, 129);
            this.UserInfoPanel.TabIndex = 0;
            this.UserInfoPanel.MouseDown += new System.Windows.Forms.MouseEventHandler(this.UserInfoPanel_MouseDown);
            this.UserInfoPanel.MouseMove += new System.Windows.Forms.MouseEventHandler(this.UserInfoPanel_MouseMove);
            // 
            // ChangePctBtn
            // 
            this.ChangePctBtn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(16)))), ((int)(((byte)(69)))));
            this.ChangePctBtn.FlatAppearance.BorderSize = 0;
            this.ChangePctBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ChangePctBtn.Font = new System.Drawing.Font("Yu Gothic UI", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.ChangePctBtn.ForeColor = System.Drawing.SystemColors.Control;
            this.ChangePctBtn.Location = new System.Drawing.Point(141, 49);
            this.ChangePctBtn.Name = "ChangePctBtn";
            this.ChangePctBtn.Size = new System.Drawing.Size(93, 23);
            this.ChangePctBtn.TabIndex = 2;
            this.ChangePctBtn.Text = "change photo";
            this.ChangePctBtn.UseVisualStyleBackColor = false;
            this.ChangePctBtn.Click += new System.EventHandler(this.ChangePctBtn_Click);
            // 
            // UsernameLabel
            // 
            this.UsernameLabel.AutoSize = true;
            this.UsernameLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.UsernameLabel.ForeColor = System.Drawing.Color.White;
            this.UsernameLabel.Location = new System.Drawing.Point(141, 9);
            this.UsernameLabel.Name = "UsernameLabel";
            this.UsernameLabel.Size = new System.Drawing.Size(100, 37);
            this.UsernameLabel.TabIndex = 0;
            this.UsernameLabel.Text = "label1";
            // 
            // MsgBox
            // 
            this.MsgBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.MsgBox.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.MsgBox.Font = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.MsgBox.ForeColor = System.Drawing.SystemColors.Window;
            this.MsgBox.Location = new System.Drawing.Point(295, 614);
            this.MsgBox.Multiline = true;
            this.MsgBox.Name = "MsgBox";
            this.MsgBox.ScrollBars = System.Windows.Forms.ScrollBars.Horizontal;
            this.MsgBox.Size = new System.Drawing.Size(473, 61);
            this.MsgBox.TabIndex = 1;
            // 
            // ChatView
            // 
            this.ChatView.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(16)))), ((int)(((byte)(69)))));
            this.ChatView.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.ChatView.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.Username,
            this.Message,
            this.Time,
            this.Pict});
            this.ChatView.FullRowSelect = true;
            this.ChatView.HideSelection = false;
            this.ChatView.Location = new System.Drawing.Point(246, 0);
            this.ChatView.Name = "ChatView";
            this.ChatView.Size = new System.Drawing.Size(624, 587);
            this.ChatView.TabIndex = 3;
            this.ChatView.UseCompatibleStateImageBehavior = false;
            this.ChatView.View = System.Windows.Forms.View.Details;
            // 
            // Username
            // 
            this.Username.Text = "Username";
            this.Username.Width = 100;
            // 
            // Message
            // 
            this.Message.Text = "Message";
            this.Message.Width = 185;
            // 
            // Time
            // 
            this.Time.Text = "Time";
            this.Time.Width = 130;
            // 
            // Pict
            // 
            this.Pict.Text = "Pitcure";
            this.Pict.Width = 200;
            // 
            // panel3
            // 
            this.panel3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.panel3.Controls.Add(this.SendBtn);
            this.panel3.Location = new System.Drawing.Point(762, 614);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(108, 61);
            this.panel3.TabIndex = 5;
            // 
            // SendBtn
            // 
            this.SendBtn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(16)))), ((int)(((byte)(69)))));
            this.SendBtn.FlatAppearance.BorderSize = 0;
            this.SendBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.SendBtn.Font = new System.Drawing.Font("Yu Gothic UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.SendBtn.ForeColor = System.Drawing.SystemColors.Control;
            this.SendBtn.Location = new System.Drawing.Point(13, 14);
            this.SendBtn.Name = "SendBtn";
            this.SendBtn.Size = new System.Drawing.Size(78, 36);
            this.SendBtn.TabIndex = 0;
            this.SendBtn.Text = "Send";
            this.SendBtn.UseVisualStyleBackColor = false;
            this.SendBtn.Click += new System.EventHandler(this.SendBtn_Click);
            // 
            // CloseBtn
            // 
            this.CloseBtn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.CloseBtn.FlatAppearance.BorderSize = 0;
            this.CloseBtn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.CloseBtn.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.CloseBtn.ForeColor = System.Drawing.Color.White;
            this.CloseBtn.Location = new System.Drawing.Point(841, 0);
            this.CloseBtn.Name = "CloseBtn";
            this.CloseBtn.Size = new System.Drawing.Size(29, 24);
            this.CloseBtn.TabIndex = 6;
            this.CloseBtn.Text = "X";
            this.CloseBtn.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.CloseBtn.UseVisualStyleBackColor = false;
            this.CloseBtn.Click += new System.EventHandler(this.CloseBtn_Click);
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.button1.FlatAppearance.BorderSize = 0;
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.button1.Location = new System.Drawing.Point(86, 579);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 10;
            this.button1.Text = "button1";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // pictureBox4
            // 
            this.pictureBox4.Image = global::Telegram.Properties.Resources.Screenshot_3;
            this.pictureBox4.Location = new System.Drawing.Point(6, 431);
            this.pictureBox4.Name = "pictureBox4";
            this.pictureBox4.Size = new System.Drawing.Size(244, 142);
            this.pictureBox4.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox4.TabIndex = 14;
            this.pictureBox4.TabStop = false;
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = global::Telegram.Properties.Resources.Screenshot_1;
            this.pictureBox2.Location = new System.Drawing.Point(3, 283);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(247, 142);
            this.pictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox2.TabIndex = 12;
            this.pictureBox2.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::Telegram.Properties.Resources.Screenshot_2;
            this.pictureBox1.Location = new System.Drawing.Point(3, 135);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(244, 142);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 11;
            this.pictureBox1.TabStop = false;
            // 
            // SendImage
            // 
            this.SendImage.Image = global::Telegram.Properties.Resources._514943_clip_event_plan_reminder_schedule_icon;
            this.SendImage.Location = new System.Drawing.Point(247, 614);
            this.SendImage.Name = "SendImage";
            this.SendImage.Size = new System.Drawing.Size(51, 61);
            this.SendImage.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.SendImage.TabIndex = 8;
            this.SendImage.TabStop = false;
            this.SendImage.Click += new System.EventHandler(this.SendImage_Click);
            // 
            // UserAvatar
            // 
            this.UserAvatar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(71)))), ((int)(((byte)(32)))), ((int)(((byte)(92)))));
            this.UserAvatar.Image = global::Telegram.Properties.Resources._4043237_avatar_avocado_food_scream_icon;
            this.UserAvatar.Location = new System.Drawing.Point(13, 12);
            this.UserAvatar.Name = "UserAvatar";
            this.UserAvatar.Size = new System.Drawing.Size(122, 99);
            this.UserAvatar.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.UserAvatar.TabIndex = 1;
            this.UserAvatar.TabStop = false;
            // 
            // ChatForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(16)))), ((int)(((byte)(69)))));
            this.ClientSize = new System.Drawing.Size(871, 676);
            this.Controls.Add(this.CloseBtn);
            this.Controls.Add(this.panel3);
            this.Controls.Add(this.ChatView);
            this.Controls.Add(this.MsgBox);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "ChatForm";
            this.Text = "ChatForm";
            this.TopMost = true;
            this.panel1.ResumeLayout(false);
            this.UserInfoPanel.ResumeLayout(false);
            this.UserInfoPanel.PerformLayout();
            this.panel3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.SendImage)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.UserAvatar)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TextBox MsgBox;
        private System.Windows.Forms.ListView ChatView;
        private System.Windows.Forms.Panel UserInfoPanel;
        private System.Windows.Forms.Label UsernameLabel;
        private System.Windows.Forms.PictureBox UserAvatar;
        private System.Windows.Forms.ListView ClientsView;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Button SendBtn;
        private ColumnHeader Username;
        private ColumnHeader Message;
        private ColumnHeader Time;
        private Button ChangePctBtn;
        private PictureBox SendImage;
        private Button CloseBtn;
        private ColumnHeader Pict;
        private Button button1;
        private PictureBox pictureBox4;
        private PictureBox pictureBox2;
        private PictureBox pictureBox1;
    }
}