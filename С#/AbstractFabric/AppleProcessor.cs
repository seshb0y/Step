using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class AppleProcessor : IProcessor
    {
        public void CreateProcessor()
        {
            Console.WriteLine("Apple processor created");
        }
    }
}
