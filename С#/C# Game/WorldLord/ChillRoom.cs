using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class ChillRoom : IBase
    {

        public static int NeedForBuild => 5;

        public static int TotalBuilt { get; set; } = 1;

        public string Profit => "More loyalty from minions";

        public void Create()
        {
            TotalBuilt++;
            Player.MinionsLoyalty += 1;
        }

        public void Destroy()
        {
            TotalBuilt--;
            Player.MinionsLoyalty -= 1;
        }
        public override string ToString()
        {
            string str = "Workers need for build: " + NeedForBuild + "\n" + "Total built: " + TotalBuilt + "\n" + Profit;
            return str;
        }
    }
}
