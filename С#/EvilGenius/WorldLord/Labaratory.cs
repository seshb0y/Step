using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Labaratory : IBase
    {
        public static string Profit => "+5% to research per day";
        public static int ResearchProfit = 3;

        public static int NeedForBuild => 5;

        public static int TotalBuilt { get; set; } = 1;

        public static int Price { get; } = 60000;

        public static void Create()
        {
            TotalBuilt++;
            Money.Remove(Price);
        }

        public static void Destroy()
        {
            TotalBuilt--;
        }
        public static string GetInfo()
        {
            string str = "Workers need for build: " + NeedForBuild + "\n" + "Total built: " + TotalBuilt + "\n" + Profit;
            return str;
        }
    }
}
