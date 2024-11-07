using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class RestRoom : IBase
    {

        public static int NeedForBuild => 5;

        public static int TotalBuilt { get; set; } = 1;

        public static string Profit => "More loyalty from minions";

        public static int Price { get; } = 50000;

        public static void Create()
        {
            TotalBuilt++;
            Money.Remove(Price);
            Player.MinionsLoyalty += 2;
        }

        public static void Destroy()
        {
            TotalBuilt--;
            Player.MinionsLoyalty -= 2;
        }
        public static string GetInfo()
        {
            string str = "Workers need for build: " + NeedForBuild + "\n" + "Total built: " + TotalBuilt + "\n" + Profit;
            return str;
        }
    }
}
