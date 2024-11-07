using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Scientist : IPersonal
    {
        public static int Amount { get; set; } = 3;
        public static int Aliment { get; set; } = 300;
        public static int Price { get; set; } = 10000;

        public static int ResearchProfit { get; set; } = 1;

        public static void Add(int value)
        {
            Money.Remove(value * Price);
            Amount += value;
            IPersonal.Available -= value;
        }

        public static void Remove(int value)
        {
            Amount -= value;
            IPersonal.Available += value;
        }
    }
}
