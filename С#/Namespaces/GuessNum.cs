using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework.Namespaces
{
    internal class GuessNum
    {
        public static int randomNum(int a)
        {
            Random rnd = new Random();
            return rnd.Next(a); 
        }

            
    }
}
