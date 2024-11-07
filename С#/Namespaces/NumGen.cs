using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework.Namespaces
{

    class NumGen
    {
        public static int getPrime()
        {
            Random rnd = new Random();
            while (true)
            {
                int num = rnd.Next(100);
                int count = 0;
                for (int i = 1; i < num; i++)
                {
                    if (num % i == 0)
                    {
                        count++;
                    }
                    if (count > 2)
                    {
                        break;
                    }
                }
                if (count > 2)
                {
                    count = 0;
                    continue;
                }
                return num;
            }
        }
        public static int getOdd()
        {
            Random rnd = new Random();
            while (true)
            {
                int num = rnd.Next(100);
                if (num % 2 == 0)
                {
                    return num + 1;
                }
                return num;
            }
        }
        public static int getEven()
        {
            Random rnd = new Random();
            while (true)
            {
                int num = rnd.Next(100);
                if (num % 2 == 0)
                {
                    return num;
                }
                return num + 1;
            }
        }
        public static int getFib()
        {
            Random rnd = new Random();
            int a = 0;
            int b = 1;
            while (true)
            {
                int num = rnd.Next(100);
                while (true)
                {
                    int c = a + b;
                    a = b;
                    b = c;
                    if (c == num)
                    {
                        return num;
                    }
                    if (c > num)
                    {
                        break;
                    }
                }
            }
        }
    }
}