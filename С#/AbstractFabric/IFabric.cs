using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal interface IFabric
    {
        IButton CreateButton();
        ICase CreateCase();
        IScreen CreateScreen();
        IProcessor CreateProcessor();

        IPhone CreatePhone();
    }
}
