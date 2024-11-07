using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal class Barack : IBase
    {
        public string Profit  => "+20 places for military";
        public static int Places = 20;

        public static int NeedForBuild { get; } = 15;

        public static int TotalBuilt { get; set; } = 1;

        public void Create() => TotalBuilt++;

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
