using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class SamsungButton : IButton
    {
        public void CreateButton()
        {
            Console.WriteLine("Samsing button created");
        }
    }
}
