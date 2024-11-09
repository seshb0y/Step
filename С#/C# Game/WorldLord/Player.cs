using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal static class Player
    {
        public enum Attitude
        {
            SocialVeryLow,
            MinionsVeryLow,
            SocialLow,
            MinionsLow,
            SocialMedium,
            MinionsMedium,
            SocialHigh,
            MinionsHigh,
            SocialVeryHigh,
            MinionsVeryHight
        }
        
        public static Attitude MinionsLoyalty = Attitude.MinionsMedium;
        public static Attitude SocialLoyalty = Attitude.SocialVeryLow;

    }
}
