using WorldLord;

var loyaltyStatus = new Dictionary<Player.Attitude, string>()
        {
            {Player.Attitude.SocialVeryLow, "they dont know about you" },
            {Player.Attitude.MinionsVeryLow, "minions hate you"},
            {Player.Attitude.SocialLow, "they begin to guess" },
            {Player.Attitude.MinionsLow, "minions are very unhappy"},
            {Player.Attitude.SocialMedium, "started an investigation" },
            {Player.Attitude.MinionsMedium, "minions treat you normally"},
            {Player.Attitude.SocialHigh, "they hate you" },
            {Player.Attitude.MinionsHigh, "minions are happy to serve you"},
            {Player.Attitude.SocialVeryHigh, "they are ready to destroy you" },
            {Player.Attitude.MinionsVeryHight, "minions are ready to die for you"}
        };
string socialLoyalty;
string minionsLoyalty;
int user_ch;
string next = "";

while(true)
{
    Console.Clear();
    Console.WriteLine($"Military minions: {Military.Amount}");
    Console.WriteLine($"Science minions: {Scientist.Amount}");
    Console.WriteLine($"Workers minions: {Workers.Amount}");
    Console.WriteLine($"Can be hired: {IPersonal.Available}");
    Console.WriteLine($"Baracks - {Barack.TotalBuilt}");
    Console.WriteLine($"Labaratory - {Labaratory.TotalBuilt}");
    Console.WriteLine($"Chill room - {ChillRoom.TotalBuilt}");
    Console.WriteLine($"Place for build left: {IBase.totalAvailable - Barack.TotalBuilt - Labaratory.TotalBuilt - ChillRoom.TotalBuilt}/{IBase.totalAvailable}");
    Console.WriteLine($"Organization budget - {Money.Amount}");
    socialLoyalty = loyaltyStatus[Player.SocialLoyalty];
    minionsLoyalty = loyaltyStatus[Player.MinionsLoyalty];
    Console.WriteLine($"Society - {socialLoyalty}");
    Console.WriteLine($"Minions - {minionsLoyalty}");
    Console.WriteLine($"Hell MAchine research - {HellMachine.ResearchProgress}%");
    Console.WriteLine("1. Hire or fire  minions\n2. Organize a heist");
    user_ch = int.Parse(Console.ReadLine());
    switch(user_ch)
    {
        case 1:
            while(true)
            {
                Console.WriteLine("1. Worker\n2. Military\n3. Scientist\n4. Fire minions\n5. I changed my mind and wont hire anyone");
                user_ch = int.Parse(Console.ReadLine());
                switch(user_ch)
                {
                    case 1:
                        Console.WriteLine("How many minions do you want to recruit?");
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Workers.Price && user_ch <= IPersonal.Available)
                        {
                            Workers.Add(user_ch);
                        }
                        else { Console.WriteLine("Not enough money or places for minions"); next = Console.ReadLine(); }
                        break;
                    case 2:
                        Console.WriteLine("How many minions do you want to recruit?");
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Military.Price && user_ch <= IPersonal.Available)
                        {
                            Military.Add(user_ch);
                        }
                        else { Console.WriteLine("Not enough money or places for minions"); next = Console.ReadLine(); }
                        break;
                    case 3:
                        Console.WriteLine("How many minions do you want to recruit?");
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Scientist.Price && user_ch <= IPersonal.Available)
                        {
                            Scientist.Add(user_ch);
                        }
                        else { Console.WriteLine("Not enough money or places for minions"); next = Console.ReadLine(); }
                        break;
                }
                break;
            }
            break;
        case 2:
            while(true)
            {
                Console.WriteLine("How many minions will we send to rob?");
                user_ch = int.Parse(Console.ReadLine());
                if (user_ch <= Military.Amount)
                {
                    Random rnd = new Random();
                    int profit = rnd.Next(2000, 12000) * user_ch;
                    int victims = rnd.Next(0, Military.Amount);
                    Military.Amount -= victims;
                    Console.WriteLine($"You earned {profit}cr from robbery and lost {victims} military");
                    Money.Amount += profit;
                    if(Player.SocialLoyalty != Player.Attitude.SocialVeryHigh)
                    { 
                        Player.SocialLoyalty += 2;
                    }
                    next = Console.ReadLine();
                    break;
                }
                else { Console.WriteLine("Need more military");}
                break;

            }
            break;
    }
}