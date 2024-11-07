using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class AppleScreen : IScreen
    {
        public void CreateScreen()
        {
            Console.WriteLine("Apple screen created");
        }
    }
}
