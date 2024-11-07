namespace MailForm
{
    partial class Form1
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            this.Mail_textBox = new System.Windows.Forms.TextBox();
            this.Key_textBox = new System.Windows.Forms.TextBox();
            this.Message_textBox = new System.Windows.Forms.TextBox();
            this.Send_button = new System.Windows.Forms.Button();
            this.Tittle_textBox = new System.Windows.Forms.TextBox();
            this.Subject_textBox = new System.Windows.Forms.TextBox();
            this.BoxName_textBox = new System.Windows.Forms.TextBox();
            this.FindMsg_button = new System.Windows.Forms.Button();
            this.Adress_textBox = new System.Windows.Forms.TextBox();
            this.Next_button = new System.Windows.Forms.Button();
            this.Back_btn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // Mail_textBox
            // 
            this.Mail_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Mail_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Mail_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Mail_textBox.Location = new System.Drawing.Point(608, 12);
            this.Mail_textBox.Name = "Mail_textBox";
            this.Mail_textBox.Size = new System.Drawing.Size(180, 20);
            this.Mail_textBox.TabIndex = 0;
            this.Mail_textBox.Text = "E-mail";
            this.Mail_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Mail_textBox.TextChanged += new System.EventHandler(this.Mail_textBox_TextChanged);
            // 
            // Key_textBox
            // 
            this.Key_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Key_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Key_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Key_textBox.Location = new System.Drawing.Point(608, 38);
            this.Key_textBox.Name = "Key_textBox";
            this.Key_textBox.Size = new System.Drawing.Size(180, 20);
            this.Key_textBox.TabIndex = 1;
            this.Key_textBox.Text = "Key";
            this.Key_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Key_textBox.TextChanged += new System.EventHandler(this.Key_textBox_TextChanged);
            // 
            // Message_textBox
            // 
            this.Message_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Message_textBox.Font = new System.Drawing.Font("Arial Narrow", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.Message_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Message_textBox.Location = new System.Drawing.Point(12, 64);
            this.Message_textBox.Multiline = true;
            this.Message_textBox.Name = "Message_textBox";
            this.Message_textBox.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.Message_textBox.Size = new System.Drawing.Size(442, 340);
            this.Message_textBox.TabIndex = 2;
            this.Message_textBox.Text = "Text";
            this.Message_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Message_textBox.TextChanged += new System.EventHandler(this.Message_textBox_TextChanged);
            // 
            // Send_button
            // 
            this.Send_button.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Send_button.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Send_button.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Send_button.Location = new System.Drawing.Point(379, 410);
            this.Send_button.Name = "Send_button";
            this.Send_button.Size = new System.Drawing.Size(75, 23);
            this.Send_button.TabIndex = 3;
            this.Send_button.Text = "Send";
            this.Send_button.UseVisualStyleBackColor = false;
            this.Send_button.Click += new System.EventHandler(this.Send_button_Click);
            // 
            // Tittle_textBox
            // 
            this.Tittle_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Tittle_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Tittle_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Tittle_textBox.Location = new System.Drawing.Point(13, 12);
            this.Tittle_textBox.Name = "Tittle_textBox";
            this.Tittle_textBox.Size = new System.Drawing.Size(100, 20);
            this.Tittle_textBox.TabIndex = 8;
            this.Tittle_textBox.Text = "Tittle";
            this.Tittle_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Tittle_textBox.TextChanged += new System.EventHandler(this.textBox2_TextChanged);
            // 
            // Subject_textBox
            // 
            this.Subject_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Subject_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Subject_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Subject_textBox.Location = new System.Drawing.Point(13, 38);
            this.Subject_textBox.Name = "Subject_textBox";
            this.Subject_textBox.Size = new System.Drawing.Size(100, 20);
            this.Subject_textBox.TabIndex = 9;
            this.Subject_textBox.Text = "Subject";
            this.Subject_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Subject_textBox.TextChanged += new System.EventHandler(this.textBox3_TextChanged);
            // 
            // BoxName_textBox
            // 
            this.BoxName_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.BoxName_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.BoxName_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.BoxName_textBox.Location = new System.Drawing.Point(608, 87);
            this.BoxName_textBox.Name = "BoxName_textBox";
            this.BoxName_textBox.Size = new System.Drawing.Size(180, 20);
            this.BoxName_textBox.TabIndex = 10;
            this.BoxName_textBox.Text = "Box name";
            this.BoxName_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.BoxName_textBox.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // FindMsg_button
            // 
            this.FindMsg_button.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.FindMsg_button.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.FindMsg_button.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.FindMsg_button.Location = new System.Drawing.Point(608, 113);
            this.FindMsg_button.Name = "FindMsg_button";
            this.FindMsg_button.Size = new System.Drawing.Size(180, 23);
            this.FindMsg_button.TabIndex = 11;
            this.FindMsg_button.Text = "Find messages";
            this.FindMsg_button.UseVisualStyleBackColor = false;
            this.FindMsg_button.Click += new System.EventHandler(this.FindMsg_button_Click);
            // 
            // Adress_textBox
            // 
            this.Adress_textBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Adress_textBox.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Adress_textBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Adress_textBox.Location = new System.Drawing.Point(13, 411);
            this.Adress_textBox.Name = "Adress_textBox";
            this.Adress_textBox.Size = new System.Drawing.Size(100, 20);
            this.Adress_textBox.TabIndex = 12;
            this.Adress_textBox.Text = "Adress";
            this.Adress_textBox.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Adress_textBox.TextChanged += new System.EventHandler(this.Adress_textBox_TextChanged);
            // 
            // Next_button
            // 
            this.Next_button.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Next_button.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Next_button.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Next_button.Location = new System.Drawing.Point(258, 411);
            this.Next_button.Name = "Next_button";
            this.Next_button.Size = new System.Drawing.Size(75, 20);
            this.Next_button.TabIndex = 13;
            this.Next_button.Text = "Next";
            this.Next_button.UseVisualStyleBackColor = false;
            this.Next_button.Click += new System.EventHandler(this.Next_button_Click);
            // 
            // Back_btn
            // 
            this.Back_btn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(32)))), ((int)(((byte)(17)))), ((int)(((byte)(51)))));
            this.Back_btn.Font = new System.Drawing.Font("Arial Rounded MT Bold", 8.25F);
            this.Back_btn.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(135)))), ((int)(((byte)(43)))), ((int)(((byte)(147)))));
            this.Back_btn.Location = new System.Drawing.Point(148, 411);
            this.Back_btn.Name = "Back_btn";
            this.Back_btn.Size = new System.Drawing.Size(75, 20);
            this.Back_btn.TabIndex = 14;
            this.Back_btn.Text = "Back";
            this.Back_btn.UseVisualStyleBackColor = false;
            this.Back_btn.Click += new System.EventHandler(this.Back_btn_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(33)))), ((int)(((byte)(97)))));
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.Back_btn);
            this.Controls.Add(this.Next_button);
            this.Controls.Add(this.Adress_textBox);
            this.Controls.Add(this.FindMsg_button);
            this.Controls.Add(this.BoxName_textBox);
            this.Controls.Add(this.Subject_textBox);
            this.Controls.Add(this.Tittle_textBox);
            this.Controls.Add(this.Send_button);
            this.Controls.Add(this.Message_textBox);
            this.Controls.Add(this.Key_textBox);
            this.Controls.Add(this.Mail_textBox);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox Mail_textBox;
        private System.Windows.Forms.TextBox Key_textBox;
        private System.Windows.Forms.TextBox Message_textBox;
        private System.Windows.Forms.Button Send_button;
        private System.Windows.Forms.TextBox Tittle_textBox;
        private System.Windows.Forms.TextBox Subject_textBox;
        private System.Windows.Forms.TextBox BoxName_textBox;
        private System.Windows.Forms.Button FindMsg_button;
        private System.Windows.Forms.TextBox Adress_textBox;
        private System.Windows.Forms.Button Next_button;
        private System.Windows.Forms.Button Back_btn;
    }
}

