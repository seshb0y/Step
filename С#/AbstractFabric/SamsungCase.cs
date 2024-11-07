using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class SamsungCase : ICase
    {
        public void CreateCase()
        {
            Console.WriteLine("Samsung case created");
        }
    }
}
