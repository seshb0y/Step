using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal interface IPhone
    {
        void CreatePhone(IScreen screen, IButton button, ICase casee, IProcessor processor);
    }
}
