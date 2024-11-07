using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal interface IPersonal
    {
        static int Available { get; set; } = (Barack.TotalBuilt * 20) - Workers.Amount - Scientist.Amount - Military.Amount;
        static int Amount { get; set; }
        static int Aliment { get; set; }
        static int Price { get; set; }
        static void Add(int value) => throw new ArgumentOutOfRangeException();
        static void Remove(int value) => throw new ArgumentOutOfRangeException();
    }
}
