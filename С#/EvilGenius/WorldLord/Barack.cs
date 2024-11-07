using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Barack : IBase
    {
        public static string Profit  => "+20 places for military";
        public static int Places = 20;

        public static int NeedForBuild { get; } = 3;

        public static int TotalBuilt { get; set; } = 1;
        public static int Price { get; } = 40000;

        public static void Create()
        {
            TotalBuilt++;
            Money.Remove(Price);
            IPersonal.Available += Places;
        }

        public static void Destroy()
        {
            TotalBuilt--;
            IPersonal.Available -= Places;
        }
        public static string GetInfo()
        {
            string str = "Workers need for build: " + NeedForBuild + "\n" + "Total built: " + TotalBuilt + "\n" + Profit;
            return str;
        }
    }
}
