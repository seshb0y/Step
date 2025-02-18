﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldLord
{
    internal interface IBase
    {
        public static string Profit { get; } = "";
        public static int totalAvailable { get; set; } = 15;
        public static int NeedForBuild { get; }
        public static int TotalBuilt { get; set; }
        public static int Price { get; }
        static void Create() => throw new ArgumentOutOfRangeException();
        static void Destroy() => throw new ArgumentOutOfRangeException();

    }
}
