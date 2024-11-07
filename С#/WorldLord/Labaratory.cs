using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Labaratory : IBase
    {
        public string Profit => "+5% to research per day";
        public static int ResearchProfit = 5;

        public static int NeedForBuild => 10;

        public static int TotalBuilt { get; set; } = 1;

        public void Create()
        {
            TotalBuilt++;
        }

        public void Destroy()
        {
            TotalBuilt--;
        }
        public override string ToString()
        {
            string str = "Workers need for build: " + NeedForBuild + "\n" + "Total built: " + TotalBuilt + "\n" + Profit;
            return str;
        }
    }
}
