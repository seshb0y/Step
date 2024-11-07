using System.Runtime.Intrinsics.X86;
using ConsoleTable;
using WorldLord;

var loyaltyStatus = new Dictionary<Player.Attitude, string>()
{
    {Player.Attitude.SocialVeryLow, "Вас игнорируют" },
    {Player.Attitude.MinionsVeryLow, "Миньоны ненавидят Вас"},
    {Player.Attitude.SocialLow, "Они начинают догадываться" },
    {Player.Attitude.MinionsLow, "Миньоны очень недовольны"},
    {Player.Attitude.SocialMedium, "Начинают вести расследование" },
    {Player.Attitude.MinionsMedium, "Миньоны относятся к Вам нормально"},
    {Player.Attitude.SocialHigh, "Вас ненавидят" },
    {Player.Attitude.MinionsHigh, "Миньоны рады служить Вам"},
    {Player.Attitude.SocialVeryHigh, "Они готовы уничтожить Вас" },
    {Player.Attitude.MinionsVeryHight, "Миньоны готовы умереть за Вас"}
};

Console.ForegroundColor = ConsoleColor.Magenta;

string socialLoyalty;
string minionsLoyalty;

int workersForTrading;

int user_ch;
int profit;

Random rnd = new Random();

bool command2Check = true;
bool command3Check = true;
bool command4Check = true;

bool minionsRevoltCheck = false;
bool socialAttackCheck = false;
bool winCheck = false;
bool moneyCheck = false;

//List<string> command = new List<string>()
//{
//    "1. Нанимать или увольнять миньонов.",
//    "2. Организовать ограбление.",
//    "3. Зарабатывать деньги другим путем.",
//    "4. Строить узлы базы.",
//    "5. Всё идет хорошо, можно лечь спать."

//};

List<int> usedCommand = new List<int>();

double minionsLoyaltyCounter = 0;
double socialLoyalCounter = 0;
socialLoyalty = loyaltyStatus[Player.SocialLoyalty];
minionsLoyalty = loyaltyStatus[Player.MinionsLoyalty];
string info = $"Миньоны-военные: {Military.Amount}\n" +
    $"Миньоны-ученые: {Scientist.Amount}\n" +
    $"Миньоны-рабочие: {Workers.Amount}\n" +
    $"Можно нанять: {IPersonal.Available}\n" +
    $"Свободных рабочих: {Workers.AvailableWorkers} \n" +
    $"Бараки - {Barack.TotalBuilt} \n" +
    $"Лабаратории - {Labaratory.TotalBuilt} \n" +
    $"Комнаты отдыха - {RestRoom.TotalBuilt} \n" +
    $"Осталось мест для стройки: {IBase.totalAvailable - Barack.TotalBuilt - Labaratory.TotalBuilt - RestRoom.TotalBuilt}/{IBase.totalAvailable}\n" +
    $"Бюджет организации - {Money.Amount} \n" +
    $"Общественность - {socialLoyalty}\n" +
    $"Миньоны - {minionsLoyalty} \n";

int availableWorkers = Workers.Amount;
int availablePers = IPersonal.Available;
void updateInfo()
{
    availablePers = (Barack.TotalBuilt * 20) - Workers.Amount - Scientist.Amount - Military.Amount;
    socialLoyalty = loyaltyStatus[Player.SocialLoyalty];
    minionsLoyalty = loyaltyStatus[Player.MinionsLoyalty];
    info = $"Миньоны-военные: {Military.Amount}\n" +
    $"Миньоны-ученые: {Scientist.Amount}\n" +
    $"Миньоны-рабочие: {Workers.Amount}\n" +
    $"Можно нанять: {availablePers}\n" +
    $"Свободных рабочих: {availableWorkers} \n" +
    $"Бараки - {Barack.TotalBuilt} \n" +
    $"Лабаратории - {Labaratory.TotalBuilt} \n" +
    $"Комнаты отдыха - {RestRoom.TotalBuilt} \n" +
    $"Осталось мест для стройки: {IBase.totalAvailable - Barack.TotalBuilt - Labaratory.TotalBuilt - RestRoom.TotalBuilt}/{IBase.totalAvailable}\n" +
    $"Бюджет организации - {Money.Amount} \n" +
    $"Общественность - {socialLoyalty}\n" +
    $"Миньоны - {minionsLoyalty} \n";
    if (HellMachine.ResearchProgress < 100)
    {
        info += $"\nИсследование Адской Машины - {HellMachine.ResearchProgress}%";
    }
}


//void showInterface()
//{
//    Console.Clear();
//    Console.WriteLine($"Миньоны-военные: {Military.Amount}");
//    Console.WriteLine($"Миньоны-ученые: {Scientist.Amount}");
//    Console.WriteLine($"Миньоны-рабочие: {Workers.Amount}");
//    Console.WriteLine($"Можно нанять: {IPersonal.Available}");
//    Console.WriteLine($"Свободных рабочих: {Workers.AvailableWorkers}");
//    Console.WriteLine($"Бараки - {Barack.TotalBuilt}");
//    Console.WriteLine($"Лабаратории - {Labaratory.TotalBuilt}");
//    Console.WriteLine($"Комнаты отдыха - {RestRoom.TotalBuilt}");
//    Console.WriteLine($"Осталось мест для стройки: {IBase.totalAvailable - Barack.TotalBuilt - Labaratory.TotalBuilt - RestRoom.TotalBuilt}/{IBase.totalAvailable}");
//    Console.WriteLine($"Бюджет организации - {Money.Amount}");
//    socialLoyalty = loyaltyStatus[Player.SocialLoyalty];
//    minionsLoyalty = loyaltyStatus[Player.MinionsLoyalty];
//    Console.WriteLine($"Общественность - {socialLoyalty}");
//    Console.WriteLine($"Миньоны - {minionsLoyalty}");
//    if(HellMachine.ResearchProgress < 100)
//    {
//        Console.WriteLine($"Исследование Адской Машины - {HellMachine.ResearchProgress}%");
//    }
//    Console.WriteLine("-----------------------------------------------------------");
    
//}

Console.WriteLine(Text.DrawInConsoleBox("Далее", "", Text.firstMessage));
Console.ReadLine();

Console.Clear();

Console.WriteLine(Text.DrawInConsoleBox("Далее", "", Text.secondMessage));

Console.ReadLine();
Console.Clear();

Console.WriteLine(Text.DrawInConsoleBox(Text.firstMenu, "", Text.thirdMessage));
user_ch = int.Parse(Console.ReadLine());

while(user_ch != 5)
{
    Console.Clear();
    Console.WriteLine(Text.DrawInConsoleBox(Text.firstMenu, "", Text.firstMenuCommand[user_ch-1]));
    user_ch = int.Parse(Console.ReadLine());
}

Console.Clear();
HellMachine.ResearchProgress = 100;
while (true)
{
    Money.Amount = 5000000;
    updateInfo();
    Console.Clear();
    if (HellMachine.ResearchProgress < 100)
    { Console.WriteLine(Text.DrawInConsoleBox(Text.mainMenu, info, Text.randomText[rnd.Next(Text.randomText.Count)])); }

    else if (HellMachine.redButtonCheck()) { Console.WriteLine(Text.DrawInConsoleBox(Text.redButton, info, Text.randomText[rnd.Next(Text.randomText.Count)])); }

    else if (HellMachine.ResearchProgress >= 100) { Console.WriteLine(Text.DrawInConsoleBox(Text.hellMAchineMenu, info, Text.randomText[rnd.Next(Text.randomText.Count)])); }
    user_ch = int.Parse(Console.ReadLine());
    if (user_ch == 2 && command2Check == false)
    {
        //info = info.Replace("2. Организовать ограбление.", "2. Организовать ограбление. (Недоступно)");
        continue;
    }
    else if (user_ch == 3 && command3Check == false)
    {
        //command[user_ch - 1] = $"{command[user_ch - 1]} (Недоступно)";
        continue;
    }
    else if (user_ch == 4 && command4Check == false)
    {
        //command[user_ch - 1] = $"{command[user_ch - 1]} (Недоступно)";
        continue;
    }

    switch (user_ch)
    {
        case 1:
            while(true)
            {
                Console.Clear();
                updateInfo();
                Console.WriteLine(Text.DrawInConsoleBox(Text.mainMenuFirstMenu, info, Text.mainMenuFirstMessage));
                user_ch = int.Parse(Console.ReadLine());
                switch(user_ch)
                {
                    case 1:
                        Console.Clear();
                        updateInfo();
                        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuFirstMessage));
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Workers.Price && user_ch <= IPersonal.Available)
                        {
                            Workers.Add(user_ch);
                        }
                        else 
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuError)); 
                            Console.ReadLine(); 
                        }
                        continue;
                    case 2:
                        Console.Clear();
                        updateInfo();
                        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuFirstMessage));
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Military.Price && user_ch <= IPersonal.Available)
                        {
                            Military.Add(user_ch);
                        }
                        else
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuError));
                            Console.ReadLine();
                        }
                        continue;
                    case 3:
                        Console.Clear();
                        updateInfo();
                        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuFirstMessage));
                        user_ch = int.Parse(Console.ReadLine());
                        if (Money.Amount >= user_ch * Scientist.Price && user_ch <= IPersonal.Available)
                        {
                            Scientist.Add(user_ch);
                        }
                        else
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, Text.mainMenuFirstMenuError));
                            Console.ReadLine();
                        }
                        continue;
                    case 4:
                        Console.Clear();
                        updateInfo();
                        Console.WriteLine(Text.DrawInConsoleBox(Text.mainMenuFirstMenuFourthMessageFourthMessage, info, Text.mainMenuFirstMenuFirstMessage));
                        user_ch = int.Parse(Console.ReadLine());
                        switch(user_ch)
                        {
                            case 1:
                                Console.Clear();
                                updateInfo();
                                Console.WriteLine(Text.DrawInConsoleBox("", info, "Сколько миньонов уволить?"));
                                user_ch = int.Parse(Console.ReadLine());
                                Workers.Amount -= user_ch;
                                continue;
                            case 2:
                                Console.Clear();
                                updateInfo();
                                Console.WriteLine(Text.DrawInConsoleBox("", info, "Сколько миньонов уволить?"));
                                user_ch = int.Parse(Console.ReadLine());
                                Military.Amount -= user_ch;
                                continue;
                            case 3:
                                Console.Clear();
                                updateInfo();
                                Console.WriteLine(Text.DrawInConsoleBox("", info, "Сколько миньонов уволить?"));
                                user_ch = int.Parse(Console.ReadLine());
                                Scientist.Amount -= user_ch;
                                continue;
                            case 4:
                                break;
                        }

                        continue;
                }
                break;
            }
            break;
        case 2:
            command2Check = false;
            command3Check = false;
            Console.Clear();
            Console.WriteLine(Text.DrawInConsoleBox(" ", info, Text.heist));
            Console.ReadLine();
            while(true)
            {
                Console.Clear();
                updateInfo();
                Console.WriteLine(Text.DrawInConsoleBox(" ", info, Text.mainMenuSecondMenuFirstMessage)); 
                user_ch = int.Parse(Console.ReadLine());
                if (user_ch <= Military.Amount)
                {
                    profit = rnd.Next(2000, 12000) * user_ch;
                    int victims = rnd.Next(0, Military.Amount + 1);
                    Military.Amount -= victims;
                    Money.Amount += profit;
                    if(Player.SocialLoyalty != Player.Attitude.SocialVeryHigh)
                    { 
                        Player.SocialLoyalty += 2;
                    }
                    Console.Clear();
                    updateInfo();
                    Console.WriteLine(Text.DrawInConsoleBox(" ", info, Text.heistResult + $"\nВы заработали {profit}cr с ограбления и потеряли {victims} миньонов-военных"));
                    Console.ReadLine();
                    break;
                }
                
                else { Console.Clear(); Console.WriteLine(Text.DrawInConsoleBox(" ", info, "Недостаточно военных")); Console.ReadLine(); continue; }

            }
            break;
        case 3:
            command2Check = false;
            command3Check = false;
            Console.Clear();
            updateInfo();
            Console.WriteLine(Text.DrawInConsoleBox("1. Отлично, давай приступим", info, Text.trading));
            Console.ReadLine();
            Console.Clear();
            Console.WriteLine(Text.DrawInConsoleBox(" ", info, Text.tradingNext + "\nСколько миньонов отправим на дело?"));
            while (true)
            {
                workersForTrading = int.Parse(Console.ReadLine());
                if (workersForTrading > Workers.AvailableWorkers)
                {
                    Console.WriteLine("Недостаточно рабочих");
                    continue;
                }
                else { availableWorkers -= workersForTrading; }
                break;
            }
            Console.Clear();
            updateInfo();
            Console.WriteLine(Text.DrawInConsoleBox("1. Штуковины\n2. Прибамбасы\n3. Железяки\n4. Палки\n5. Предметы\n6. Дрянь", info, Text.tradingGoods));
            Console.ReadLine();
            Console.Clear();
            Console.WriteLine(Text.DrawInConsoleBox("1. Лайт-Бринг Сити\n2. Дрейкбург\n3. Эйслэнд\n4. Леосания\n5. Гелитаун\n6. Пяткинск", info, Text.tradingTowns));
            int cityForTrading;
            cityForTrading = int.Parse(Console.ReadLine()) - 1;
            Console.Clear();
            List<int> product = new List<int>();
            int price = rnd.Next(500, 2000);
            for (int i = 0; i < 6; i++)
            {
                product.Add(rnd.Next(1, 5));
            }
            profit = price * product[cityForTrading] + 1000 * workersForTrading;
            Money.Add(profit);
            Console.WriteLine(Text.DrawInConsoleBox("", info, $"\nВы заработали {profit} с торговли"));
            Console.ReadLine();
            break;
        case 4:
            command4Check = false;
            while (true)
            {
                Console.Clear();
                updateInfo();
                Console.WriteLine(Text.DrawInConsoleBox("1. Строить бараки\n2. Строить лабаратории\n3. Строить комнаты отдыха\n4. " +
                    "Разрушить какой-нибудь узел\n5. Закончить строительство", info, Text.baseBuild));
                user_ch = int.Parse(Console.ReadLine());
                switch(user_ch)
                {
                    case 1:
                        if (Money.Amount >= Barack.Price && Workers.AvailableWorkers >=  Barack.NeedForBuild)
                        {
                            Barack.Create();
                            availableWorkers -= Barack.NeedForBuild;
                        }
                        else { Console.WriteLine("Недостаточно денег или свободных рабочих"); Console.ReadLine(); }
                        break;
                    case 2:
                        if(Money.Amount >= Labaratory.Price && Workers.AvailableWorkers >= Labaratory.NeedForBuild)
                        {
                            Labaratory.Create();
                            availableWorkers -= Labaratory.NeedForBuild;
                        }
                        else { Console.WriteLine("Недостаточно денег или свободных рабочих"); Console.ReadLine(); }
                        break;
                    case 3:
                        if (Money.Amount >= RestRoom.Price && Workers.AvailableWorkers >= RestRoom.NeedForBuild)
                        {
                            RestRoom.Create();
                            availableWorkers -= RestRoom.NeedForBuild;
                        }
                        else { Console.WriteLine("Недостаточно денег или свободных рабочих"); Console.ReadLine(); }
                        break;
                    case 4:
                        while (true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("1. Бараки\n2. Лабаратории\n3. Комнаты отдыха\n4. Закончить разрушение", info, Text.baseDemolish));
                            user_ch = user_ch = int.Parse(Console.ReadLine());
                            switch(user_ch)
                            {
                                case 1:
                                    if(IPersonal.Available <20)
                                    {
                                        Console.WriteLine("Нехватка места для персонала");
                                        Console.ReadLine();
                                        continue;
                                    }
                                    Barack.Destroy();
                                    continue;
                                case 2:
                                    if(Labaratory.TotalBuilt != 0)
                                    {
                                        Labaratory.Destroy();
                                    }
                                    continue;
                                case 3:
                                    if(RestRoom.TotalBuilt != 0)
                                    {
                                        RestRoom.Destroy();
                                    }
                                    continue;
                                case 4:
                                    break;
                            }
                            break;
                        }
                        break;
                    case 5:
                        break;
                }
                break;
            }
            break;
        case 5:
            if(socialLoyalCounter >= 1 && Player.SocialLoyalty != Player.Attitude.SocialVeryLow)
            {
                Player.SocialLoyalty -= 2;
                socialLoyalCounter = 0;
                if (Player.SocialLoyalty >= Player.Attitude.SocialMedium)
                {
                    for (int i = 0; i < (int)Player.SocialLoyalty; i++)
                    {
                        if(rnd.Next(2) == 0)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("1. Приказать военным защищать базу\n2. Начать немедленную консервацию базы", info, Text.socialAttack));
                            user_ch = int.Parse(Console.ReadLine());
                            switch (user_ch)
                            {
                                case 1:
                                    {
                                        int enemyForces = rnd.Next(5 * (int)Player.SocialLoyalty);
                                        Console.Clear();
                                        updateInfo();
                                        Console.WriteLine(Text.DrawInConsoleBox("", info, "- Внимание личной армии имени Меня! - грозно сказали вы в микрофон. - " +
                                            "Всем немедленно занять места за орудийными турелями! Активировать системы воздушной обороны! Экстренная блокировка " +
                                            "главного шлюза!\nВы еще долго выкрикивали бессвязные приказы, но солдаты, не дав сбить себя с толку, " +
                                            "вступили в полную боевую готовность под доблестным командованием генерала Побаш Ке. Скоро с вами связался сам генерал.\n" +
                                            $"- Мое почтение, Командир! Разрешите доложить результаты разведки! Точное количество атакующих базу врагов - {enemyForces}!" +
                                            "В среднем каждый наш солдат способен взять на себя около двух единиц живой силы врага! Служу Злому Гению!\n" +
                                            "С этими словами генерал прервал связь, а вы, нервно ерзая на своем внушительном кресле, стали ожидать исхода боя."));
                                        Console.ReadLine();
                                        if(Military.Amount < enemyForces / 2)
                                        {
                                            socialAttackCheck = true;
                                            break;
                                        }
                                        Military.Amount -= enemyForces / 2;
                                        Console.Clear();
                                        updateInfo();
                                        Console.WriteLine(Text.DrawInConsoleBox("", info, $"Атака была отбита, но вы потеряли {enemyForces / 2} солдат."));
                                        Console.ReadLine();
                                    }
                                    break;
                                case 2:
                                    string loses = "";
                                    if(HellMachine.Wires == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Wires = false;
                                        loses += "Провода\n";
                                    }
                                    if (HellMachine.Engine == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Engine = false;
                                        loses += "двигатели\n";
                                    }
                                    if (HellMachine.Lenses == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Lenses = false;
                                        loses += "Линзы\n";
                                    }
                                    if (HellMachine.Switches == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Switches = false;
                                        loses += "Переключатели\n";
                                    }
                                    if (HellMachine.Levers == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Levers = false;
                                        loses += "Рычаги\n";
                                    }
                                    if (HellMachine.Irradiators == true && rnd.Next(2) == 0)
                                    {
                                        HellMachine.Irradiators = false;
                                        loses += "Облучатели\n";
                                    }
                                    int workerLoses = rnd.Next(Workers.Amount / 2, Workers.Amount + 1);
                                    Workers.Amount -= workerLoses;
                                    string personalLoses = $"{workerLoses} рабочих\n";
                                    int militaryLoses = rnd.Next(Military.Amount / 2, Military.Amount + 1);
                                    Military.Amount -= militaryLoses;
                                    personalLoses += $"{militaryLoses} военных\n";
                                    int scienceLoses = rnd.Next(Scientist.Amount / 2, Scientist.Amount + 1);
                                    Scientist.Amount -= scienceLoses;
                                    personalLoses += $"{scienceLoses} ученых\n";
                                    Console.Clear();
                                    updateInfo();
                                    Console.WriteLine(Text.DrawInConsoleBox("", info, Text.conservation + $"Общие потери составили:\n" + loses + personalLoses));
                                    Console.ReadLine();
                                    break;
                            }
                            break;
                        }
                    }
                }
            }
            socialLoyalCounter += 0.25;
            if (minionsLoyaltyCounter >= 1)
            {
                if(Player.MinionsLoyalty == Player.Attitude.MinionsVeryLow)
                {
                    minionsRevoltCheck = true;
                    break;
                }
                Player.MinionsLoyalty -= 2;
                minionsLoyaltyCounter = 0;
            }
            minionsLoyaltyCounter += 0.25;
            HellMachine.IncreaseResearch();
            if(Money.Amount < 0)
            {
                moneyCheck = true;
                break;
            }
            Money.Remove((Scientist.Aliment * Scientist.Amount) + (Workers.Aliment * Workers.Amount) + (Military.Aliment * Military.Amount));
            Workers.AvailableWorkers = Workers.Amount;
            command2Check = true;
            command3Check = true;
            command4Check = true;
            availableWorkers = Workers.Amount;

            //command.Clear();
            //command.AddRange(new List<string>()
            //{
            //    "1. Нанимать или увольнять миньонов",
            //    "2. Организовать ограбление",
            //    "3. Зарабатывать деньги другим путем",
            //    "4. Строить узлы базы",
            //    "5. Всё идет хорошо, можно лечь спать"

            //});
            break;
        case 6:
            while(true)
            {
                Console.Clear();
                updateInfo();
                Console.WriteLine(Text.DrawInConsoleBox("1. Купить провода(100 000cr)\n2. Купить двигатель(210 000cr)\n" +
                    "\n3. Купить линзы(150 000cr)\n4. Купить облучатель(350 000cr)\n5. Купить рычаги(260 000cr)\n" +
                    "6. Купить переключатели(120 000cr)\n7. Закончить покупки\n", info, Text.hellMachine));
                //Console.ReadLine();
                user_ch = int.Parse(Console.ReadLine());
                switch(user_ch)
                {
                    case 1:
                        if(Money.Amount < 100000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if(HellMachine.Wires == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Wires = true;
                            Money.Remove(100000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 2:
                        if (Money.Amount < 210000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if (HellMachine.Engine == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Engine = true;
                            Money.Remove(210000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 3:
                        if (Money.Amount < 150000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if (HellMachine.Lenses == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Lenses = true;
                            Money.Remove(150000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 4:
                        if (Money.Amount < 350000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if (HellMachine.Irradiators == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Irradiators = true;
                            Money.Remove(350000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 5:
                        if (Money.Amount < 260000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if (HellMachine.Levers == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Levers = true;
                            Money.Remove(260000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 6:
                        if (Money.Amount < 120000)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Недостаточно денег"));
                            Console.ReadLine();
                        }
                        else if (HellMachine.Switches == true)
                        {
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Уже приобретено"));
                            Console.ReadLine();
                        }
                        else
                        {
                            HellMachine.Switches = true;
                            Money.Remove(120000);
                            Console.Clear();
                            updateInfo();
                            Console.WriteLine(Text.DrawInConsoleBox("", info, "Приобретено"));
                            Console.ReadLine();
                        }

                        continue;
                    case 7:
                        Console.Clear();
                        break;
                }

                break;

            }
            break;
        case 7:
            winCheck = true;
            break;
    }
    if(minionsRevoltCheck)
    {
        Console.Clear();
        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.minionsRage));
        break;
    }
    if(socialAttackCheck)
    {
        Console.Clear();
        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.socialAttackDef));
        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.socialAttackOver));
        break;
    }
    if(winCheck) 
    {
        Console.Clear();
        Console.WriteLine("Красная кнопка была нажата, Адская Машина заработала и через час правители всех городов на планете связались с Вами," +
        " чтобы присягнуть Вам на верность.\nПоздравляю, Вы выиграли!"); 
        break; 
    }
    if (moneyCheck)
    {
        Console.Clear();
        Console.WriteLine(Text.DrawInConsoleBox("", info, Text.minionsRage));
        break;
    }
}