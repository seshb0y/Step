using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractFabric
{
    internal class SamsungFabric : IFabric
    {
        public IButton CreateButton() => new SamsungButton();

        public ICase CreateCase() => new SamsungCase();

        public IPhone CreatePhone() => new SamsungPhone();

        public IProcessor CreateProcessor() => new SamsungProcessor();

        public IScreen CreateScreen() => new SamsungScreen();
    }
}
