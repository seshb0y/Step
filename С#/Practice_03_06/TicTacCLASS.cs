using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework
{
    class TicTacToe
    {
        public string[,] str_arr;
        public TicTacToe()
        {
            this.str_arr = new string[3, 3] { { ".", ".", "." }, { ".", ".", "." }, { ".", ".", "." } };
        }

        public void Mark(int col, int row, bool x = true)
        {
            if (x)
            {
                if(str_arr[col,row] != "o")
                {
                    str_arr[col, row] = "x";
                }
            }
            else 
            {
                if (str_arr[col, row] != "x")
                {
                    str_arr[col, row] = "o";
                }
            }
        }

        public bool Check()
        {
            if (str_arr[0, 0] == str_arr[0, 1] && str_arr[0, 0] == str_arr[0, 2] && str_arr[0, 0] != ".")
            {
                return true;
            }
            else if (str_arr[1, 0] == str_arr[1, 1] && str_arr[1, 0] == str_arr[1, 2] && str_arr[1, 0] != ".")
            {
                return true;
            }
            else if (str_arr[2, 0] == str_arr[2, 1] && str_arr[2, 0] == str_arr[2, 2] && str_arr[2, 0] != ".")
            {
                return true;
            }


            else if (str_arr[0, 0] == str_arr[1, 0] && str_arr[0, 0] == str_arr[2, 0] && str_arr[0, 0] != ".")
            {
                return true;
            }
            else if (str_arr[0, 1] == str_arr[1, 1] && str_arr[0, 1] == str_arr[2, 1] && str_arr[0, 1] != ".")
            {
                return true;
            }
            else if (str_arr[0, 2] == str_arr[1, 2] && str_arr[0, 2] == str_arr[2, 2] && str_arr[0, 2] != ".")
            {
                return true;
            }

            else if (str_arr[0, 0] == str_arr[1, 1] && str_arr[0, 0] == str_arr[2, 2] && str_arr[0, 0] != ".")
            {
                return true;
            }
            else if (str_arr[0, 2] == str_arr[1, 1] && str_arr[0, 2] == str_arr[2, 0] && str_arr[0, 2] != ".")
            {
                return true;
            }

            return false;
        }
        public override string ToString()
        {
            string str = "";
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    str += str_arr[i, j] + " ";
                }
                str += "\n";
            }
            return str;
        }
    }
}
