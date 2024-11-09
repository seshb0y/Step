using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal static class Money
    {
        public static int Amount = 50000;
        public static void Add(int value)
        {
            Amount += value;
        }
        public static void Remove(int value)
        {
            Amount -= value;
        }

    }
}
