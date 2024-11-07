using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal static class HellMachine
    {
        public static bool Switches {  get; set; } = false;
        public static bool Engine { get; set; } = false;
        public static bool Lenses { get; set; } = false;
        public static bool Wires { get; set; } = false;
        public static bool Levers { get; set; } = false;
        public static bool Irradiators { get; set; } = false;
        public static void StartMachine()
        {
            Console.WriteLine("Congratulations, you won");
        }
        public static int ResearchProgress = 0;
        public static void IncreaseResearch()
        {
            ResearchProgress += (Scientist.Amount * Scientist.ResearchProfit) + (Labaratory.TotalBuilt * Labaratory.ResearchProfit);
        }
        public static bool redButtonCheck()
        {
            if(Switches && Engine && Lenses && Wires && Levers && Irradiators)
            {
                return true;
            }
            return false;
        }
    }
}
