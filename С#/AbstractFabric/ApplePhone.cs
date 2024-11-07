using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class ApplePhone : IPhone
    {
        public void CreatePhone(IScreen screen, IButton button, ICase casee, IProcessor processor)
        {
            Console.WriteLine("Apple phone created");
            screen.CreateScreen();
            button.CreateButton();
            casee.CreateCase();
            processor.CreateProcessor();
        }
    }
}
