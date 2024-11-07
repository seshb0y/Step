using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Workers : IPersonal
    {
        public static int Amount { get; set; } = 14;
        public static int AvailableWorkers { get; set; } = Amount;
        public static int Aliment { get; set; } = 100;
        public static int Price { get; set; } = 2500;

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
