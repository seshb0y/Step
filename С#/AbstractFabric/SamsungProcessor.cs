using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class SamsungProcessor : IProcessor
    {
        public void CreateProcessor()
        {
            Console.WriteLine("Samsung processor created");
        }
    }
}
