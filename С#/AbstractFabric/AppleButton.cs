using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class AppleButton : IButton
    {
        public void CreateButton()
        {
            Console.WriteLine("Apple button created");
        }
    }
}
