using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class SamsungScreen : IScreen
    {
        public void CreateScreen()
        {
            Console.WriteLine("Samsung screen created");
        }
    }
}
